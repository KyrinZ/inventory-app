const router = require("express").Router();
let Product = require("../product.model");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res) => {
  const { productId, productName, quantity } = req.body;

  const newProduct = new Product({ productId, productName, quantity });

  newProduct
    .save()
    .then(() => {
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
    .then(() => res.json("Product Updated"))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/delete/:id").post((req, res) => {
  Product.remove({ _id: req.params.id })
    .then(() => res.json("Product Deleted"))
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
