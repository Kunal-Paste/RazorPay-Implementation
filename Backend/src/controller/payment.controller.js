const productModel = require('../model/product.model');
const RazorPay = require('razorpay');
const paymentModel = require('../model/payment.model')

const razorpay = new RazorPay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


async function createOrder(req,res){
    const product = await productModel.findOne();

    const options = {
        amount:product.price.amount,
        currency:product.price.currency,
    }

    try {
        const order = await razorpay.orders.create(options);

        const newPayment = await paymentModel.create({
            orderId:order.id,
            price:{
                amount:order.amount,
                currency:order.currency,
            },
            status:"PENDING",
        });

        res.status(201).json({order});

    } catch (err) {
        res.status(500).json({
            message:'error while making payment',
            error:err.message
        })
    }
}

async function verifyPayment(req, res) {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;

  try {

    const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');

    const result = validatePaymentVerification(
      { "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, 
      signature, 
      secret
    );

    if (result) {
      const payment = await paymentModel.findOne({ orderId: razorpayOrderId });
      if (payment) {
        payment.paymentId = razorpayPaymentId;
        payment.signature = signature;
        payment.status = 'COMPLETED';
        await payment.save();
      }
      res.json({ status: 'success' });
    } else {
      res.status(400).send('Invalid signature');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying payment');
  }
}


module.exports = {
    createOrder,
    verifyPayment
}