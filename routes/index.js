const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_URL = "https://pantry-hub-server.onrender.com/api/products";


// Homepage route
router.get("/", async (req, res) => {
  // Dummy category array
  const categories = [
    { id: 1, name: 'Dairy', image: '/images/dairy.jpg' },
    { id: 2, name: 'Meat', image: '/images/Meat.jpeg' },
    { id: 3, name: 'Vegetables', image: '/img/catgories/vegetables.jpg' },
    { id: 4, name: 'Oil Products', image: '/img/Oil.jpeg' },
    { id: 5, name: 'Flour & Meal', image: '/img/categories/flour.jpg' },
    { id: 6, name: 'Condiments', image: '/img/categories/condiments.jpg' },
    { id: 7, name: 'Ingredients', image: '/img/categories/ingredients.jpg' },
    { id: 8, name: 'Provisions', image: '/img/categories/provisions.jpg' },
    { id: 9, name: 'Drinks', image: '/img/categories/drinks.jpg' },
    { id: 10, name: 'Farm Fresh', image: '/img/categories/farm-fresh.jpg' }
  ];
  
  const user = req.session.user || null;
  const itemCount = req.session.cart ? req.session.cart.totalItems : null; 
  try {
    const { data: products } = await axios.get(API_URL);
    res.render("home", {title: "Homepage", categories,  products, user, itemCount });
  } catch (err) {
    res.status(500).send("Error loading products");
  }
});

// Product detail route
router.get("/product/:id", async (req, res) => {
  try {
     // Dummy category array
  const categories = [
    { id: 1, name: 'Dairy', image: '/img/categories/dairy.jpg' },
    { id: 2, name: 'Meat', image: '/img/categories/meat.jpg' },
    { id: 3, name: 'Vegetables', image: '/img/categories/vegetables.jpg' },
    { id: 4, name: 'Oil Products', image: '/img/categories/oil.jpg' },
    { id: 5, name: 'Flour & Meal', image: '/img/categories/flour.jpg' },
    { id: 6, name: 'Condiments', image: '/img/categories/condiments.jpg' },
    { id: 7, name: 'Ingredients', image: '/img/categories/ingredients.jpg' },
    { id: 8, name: 'Provisions', image: '/img/categories/provisions.jpg' },
    { id: 9, name: 'Drinks', image: '/img/categories/drinks.jpg' },
    { id: 10, name: 'Farm Fresh', image: '/img/categories/farm-fresh.jpg' }
  ];
  
    const { data: product } = await axios.get(`${API_URL}/${req.params.id}`);
    const { data: allProducts } = await axios.get(API_URL);
    const suggestedProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 8);
    res.render("show", { product, suggestedProducts });
  } catch (err) {
    res.status(500).send("Error loading product details");
  }
});

// Cart page route
router.get("/cart", (req, res) => {
  res.render("cart", { cart: req.session.cart || [] });
});

// Payment page route
router.get("/payment", (req, res) => {
  res.render("payment");
});

// Add to Cart
router.post("/cart/add/:id", (req, res) => {
  const product = req.session.cart.find(item => item.id === req.params.id);
  if (product) {
    product.quantity++;
  } else {
    req.session.cart.push({ id: req.params.id, quantity: 1 });
  }
  req.flash("success", "Product added to cart");
  res.redirect("/cart");
});

module.exports = router;


