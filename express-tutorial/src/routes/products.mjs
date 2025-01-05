import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  console.log(request.signedCookies);
  if (request.signedCookies.hello && request.signedCookies.hello === "world")
    return response
      .status(201)
      .send({ products: [{ id: 1, product: "Lamp", price: 12.99 }] });

  return response
    .status(403)
    .send({ msg: "Sorry. You need the correct cookie." });
});

export default router;
