import { Router, Request, Response } from "express";
import * as admin from "firebase-admin";
import serviceAccountKey from "../serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

const router = Router();

router.post("/create", async (req: Request, res: Response) => {
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

router.get("/all", async (req, res) => {
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

router.delete("/delete/:productId", async (req, res) => {
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
router.post("/addToShoppingCart/", async (req, res) => {
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

export default router;
