require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const cors =  require('cors');
const app = express();

const stripe = new Stripe(process.env.SECRET_KEY_STRIPE);
app.use(cors());
app.use(express.json()); // Es para q express pueda mostrar los json que llegan
app.post('/api/checkout', async(req,res)=>{
   try {
    const {id, amount} = req.body;
    const payment = await stripe.paymentIntents.create({
        amount,
        currency:'USD',
        description:"Gaming keyboard",
        payment_method:id,
        confirm:true
    })
    console.log(payment);
    res.json({
        ok:true,
        msg:'Successfully payment'
    })
   } catch (error) {
      console.log(error);
      res.json({error:error.raw.message});
   }
})
app.listen(5000,()=>console.log('Servidor en puerto 5000'));