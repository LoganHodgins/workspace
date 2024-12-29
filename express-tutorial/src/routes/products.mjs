import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
    response
      .status(201)
      .send({ products: [{ id: 1, product: "Lamp", price: 12.99 }] });
  });

export default router;