const router = require("express").Router();

let Product = require("../models/product.model");
let History = require("../models/history.model");

router.route("/").get((req, res) => {
  if (req.query.search === "") {
    Product.find()
      .then((products) => {
        res.json(products);
      })
      .catch((err) => res.status(400).json("Error " + err));
  } else {
    let search = new RegExp(req.query.search, "g");
    Product.find({ productName: search }, "productName productId")
      .then((products) => {
        res.json(products);
      })
      .catch((err) => res.status(400).json("Error " + err));
  }
});

router.route("/add").post((req, res) => {
  const { productId, productName, quantity } = req.body;

  const newProduct = new Product({ productId, productName, quantity });
  newProduct
    .save()
    .then(() => {
      const newHistory = new History({ productName, updateType: "added" });
      newHistory.save();
      res.json("Product Added");
    })
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/update/:id").put((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      const { productId, productName, quantity } = req.body;

      product.productId = productId;
      product.productName = productName;
      product.quantity = quantity;

      return product.save();
    })
    .then(() => {
      const { productName } = req.body;
      const newHistory = new History({ productName, updateType: "updated" });
      newHistory.save();
      res.json("Product Updated");
    })
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/delete/:id").delete((req, res) => {
  let productName = null;
  Product.findById(req.params.id)
    .then((product) => {
      productName = product.productName;
      return Product.deleteOne({ _id: req.params.id });
    })
    .then(() => {
      if (productName) {
        const newHistory = new History({ productName, updateType: "deleted" });
        newHistory.save();
      }

      res.json("Product Deleted");
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
