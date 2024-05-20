import * as functions from "firebase-functions";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import Stripe from "stripe";
import * as admin from "firebase-admin";
import serviceAccountKey from "./serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
const stripe = new Stripe(
  "sk_test_51PI90bAQ99piVuGpDsWnYjiLVI3Uf16YqIJQW4wZpwBOxDQvq4oYQQ3wOU5BFQtlWGWLq4mnGxawNiLmgqLh6fZD00bm3ej5NL"
);

dotenv.config();

const app = express();

// Body parser for our JSON data
app.use(express.json());

// Cross origin
app.use(cors({ origin: "*" }));
app.use((req: Request, res: Response, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// default API endpoints
app.get("/", (req: Request, res: Response) => {
  return res.send("The Server Is Running!");
});

// jwtVerfication for user
app.get("/api/users/jwtVerfication", async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "Token Not Found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res
        .status(500)
        .json({ success: false, msg: "Unauthorized access" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in extracting the token : ${err}`,
    });
  }
});

// create product
app.post("/api/products/create", async (req, res) => {
  try {
    const productId = Date.now();
    const data = {
      productId,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_price: req.body.product_price,
      imageURL: req.body.imageURL,
      createdAt: Date.now(),
    };

    const response = await db
      .collection("products")
      .doc(`/${productId}/`)
      .set(data);

    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
});

// get all products
app.get("/api/products/all", async (req, res) => {
  try {
    let query = db.collection("products");
    let response: any = [];
    let querysnap = await query.get();
    let docs = querysnap.docs;

    docs.forEach((doc) => {
      response.push({ ...doc.data() });
    });

    res.status(200).send({ success: true, data: response });
  } catch (err) {
    res.send({ success: false, msg: `Error: ${err}` });
  }
});

// delete product
app.delete("/api/products/delete/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const result = await db
      .collection("products")
      .doc(`/${productId}/`)
      .delete();
    return res.status(200).send({ success: true, data: result });
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// add product to shoppingCart
app.post("/api/products/addToShoppingCart/", async (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;

  try {
    const doc: any = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    if (doc.data()) {
      const quantity = doc.data().quantity + 1;
      const updatedItem = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .update({ quantity });
      return res.status(200).send({ success: true, data: updatedItem });
    } else {
      const data = {
        productId: productId,
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        imageURL: req.body.imageURL,
        quantity: 1,
      };
      const addItems = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .set(data);
      return res.status(200).send({ success: true, data: addItems });
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// get shoppingCart for that user
app.get("/api/products/getShoppingCart/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  try {
    const query = db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items");

    const response: any = [];
    const querysnap = await query.get();
    const docs = querysnap.docs;

    docs.forEach((doc) => {
      response.push({ ...doc.data() });
    });

    res.status(200).send({ success: true, data: response });
  } catch (er) {
    res.send({ success: false, msg: `Error: ${er}` });
  }
});

app.post("/api/products/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.data.user.uid,
      // fix bug with shoppingCart
      // shoppingCart: JSON.stringify(req.body.data.shoppingCart).substring(
      //   0,
      //   500
      // ), // Ensure it's within the character limit
      // fix bug with shoppingCart
      shoppingCartLength: req.body.data.shoppingCart.length,
      total: req.body.data.total.toString(),
    },
  });

  const line_items = req.body.data.shoppingCart.map((item: any) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product_name,
          images: [item.imageURL],
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.product_price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "hour", value: 2 },
            maximum: { unit: "hour", value: 4 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },

    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `http://localhost:5173/checkout-success`,
    cancel_url: `http://localhost:5173/`,
  });

  res.send({ url: session.url });
});

let endpointSecret: string;
// endpointSecret = process.env.WEBHOOK_SECRET;

app.post(
  "/api/products/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"] as string | undefined;

    let eventType;
    let data: any;

    if (endpointSecret && sig) {
      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err: any) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers.retrieve(data.customer).then((customer) => {
        createOrder(customer, data, res);
      });
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

// createOrder Functionality
const createOrder = async (customer: any, intent: any, res: Response) => {
  try {
    const orderId = Date.now();
    const data = {
      intentId: intent.id,
      orderId: orderId,
      amount: intent.amount_total,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_id,
      // fix bug with shoppingCart
      // items: JSON.parse(customer.metadata.shoppingCart),
      // fix bug with shoppingCart
      itemsCount: customer.metadata.shoppingCartLength,
      total: customer.metadata.total,
      sts: "preparing",
    };

    await db.collection("orders").doc(`/${orderId}/`).set(data);

    // fix bug with shoppingCart and deleteCart

    await deleteCart(customer.metadata.user_id);

    return res.status(200).send({ success: true });
  } catch (err) {
    return res.status(500).send({ success: false, msg: `Error: ${err}` });
  }
};
const deleteCart = async (userId: string) => {
  try {
    const cartItemsRef = db
      .collection("cartItems")
      .doc(userId)
      .collection("items");
    const cartItemsSnapshot = await cartItemsRef.get();

    if (cartItemsSnapshot.empty) {
      return;
    }

    const batch = db.batch();
    cartItemsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  } catch (err) {
    console.error(`Error deleting cart for user ${userId}: ${err}`);
  }
};

// Export your Express app as a Firebase Function
exports.app = functions.https.onRequest(app);
