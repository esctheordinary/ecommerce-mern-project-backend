const Cart = require("../model/cart");

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      //if cart is already exists then update the card item 
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);
      let condition, update;

      if (item) {
         //if product is already exists in cart then update the quantity of product
        condition = { user: req.user._id, "cartItems.product": product };
        update = {
         "$set": {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        };
      } 
      else {
        condtion = { user: req.user._id };
        update = {
         "$push": {
            cartItems: req.body.cartItems,
          },
        };
      }

      Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
        if (error) return res.status(400).json({ error });
        if (_cart) {
          return res.status(201).json({ _cart });
        }
      });
    } 

    else {
      // if cart is not exists then create the new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};
