const router = require("express").Router();
var jwt = require("jsonwebtoken");

let Product = require("../models/product.model");
let History = require("../models/history.model");
const verify = require("../verifyToken");

router.get("/", verify, (req, res) => {
  const user = jwt.verify(req.header("auth-token"), process.env.TOKEN_SECRET);

  if (req.query.search === "") {
    Product.find({ userId: user.userId })
      .then((products) => {
        res.json(products);
      })
      .catch((err) => res.status(400).json("Error " + err));
  } else {
    let search = new RegExp(req.query.search, "g");
    Product.find({ userId: user.userId, productName: search })
      .then((products) => {
        res.json(products);
      })
      .catch((err) => res.status(400).json("Error " + err));
  }
});

router.post("/add", verify, (req, res) => {
  const { productId, productName, quantity } = req.body;
  const user = jwt.verify(req.header("auth-token"), process.env.TOKEN_SECRET);

  const newProduct = new Product({
    userId: user.userId,
    productId,
    productName,
    quantity,
  });
  newProduct
    .save()
    .then(() => {
      const newHistory = new History({
        userId: user.userId,
        productName,
        updateType: "added",
      });
      newHistory.save();
      res.json("Product Added");
    })
    .catch((err) => res.status(400).json("Error " + err));
});

router.put("/update/:id", verify, (req, res) => {
  const user = jwt.verify(req.header("auth-token"), process.env.TOKEN_SECRET);

  Product.findOne({ _id: req.params.id, userId: user.userId })
    .then((product) => {
      const { productId, productName, quantity } = req.body;

      product.productId = productId;
      product.productName = productName;
      product.quantity = quantity;

      return product.save();
    })
    .then(() => {
      const { productName } = req.body;
      const newHistory = new History({
        userId: user.userId,
        productName,
        updateType: "updated",
      });
      newHistory.save();
      res.json("Product Updated");
    })
    .catch((err) => res.status(400).json("Error " + err));
});

router.delete("/delete/:id", verify, (req, res) => {
  const user = jwt.verify(req.header("auth-token"), process.env.TOKEN_SECRET);
  let productName = null;

  Product.findById(req.params.id)
    .then((product) => {
      productName = product.productName;
      return Product.deleteOne({ _id: req.params.id, userId: user.userId });
    })
    .then(() => {
      if (productName) {
        const newHistory = new History({
          userId: user.userId,
          productName,
          updateType: "deleted",
        });
        newHistory.save();
      }

      res.json("Product Deleted");
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
