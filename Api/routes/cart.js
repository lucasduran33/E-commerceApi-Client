
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require('express').Router();


//CREAR CART
router.post('/' , verifyToken, async (req,res) => {
  const newCart = new Cart(req.body)  
  try{
const savedCart = await newCart.save();
res.status(200).json(savedCart)
  }catch(err){
      res.status(500).json(err)
  }
})

//TRAER CART DE USUARIO
router.get('/find/:userId', async (req,res) => {
    try{
const cart = await Cart.findOne({userId: req.params.userId})
res.status(200).json(cart)
    }catch(err){
 res.status(500).json(err)
    } 
});
//TRAER TODOS LOS PRODUCTOS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//ACTUALIZAR CART

router.put('/:id',verifyTokenAndAuthorization , async (req,res)=>{

    try{
    const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new:true}
    );
    res.status(200).json(updateCart)
    }catch(err){
        req.statusCode(500).json(err)
    }
    });
    


//ELIMINAR PRODUCTO 
router.delete('/id', verifyTokenAndAuthorization , async (req,res) => {
    try{
await Cart.findByIdAndDelete(req.params.id)
res.status(200).json('Cart has been deleted...')
    }catch(err){
 res.status(500).json(err)
    }
});

module.exports = router;