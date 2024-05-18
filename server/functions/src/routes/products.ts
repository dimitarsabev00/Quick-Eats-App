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

export default router;
