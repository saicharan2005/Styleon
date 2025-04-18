
// const paypal = require("../../helpers/paypal");
const Order = require("../../models/Orders");
const Cart = require("../../models/Cart");

const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


const createOrder = async (req, res) => {
    try {
      const {
        userId,
        cartId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        stripeSessionId,
        paymentId,
        customerId,
      } = req.body;
      

      // console.log(
      //   userId,
      //   cartId,
      //   cartItems,
      //   addressInfo,
      //   orderStatus,
      //   paymentMethod,
      //   paymentStatus,
      //   totalAmount,
      //   orderDate,
      //   orderUpdateDate,
      //   stripeSessionId,
      //   paymentId,
      //   customerId
      // );
      
      //         const create_payment_json = {
      //           intent: "sale",
      //           payer: {
      //             payment_method: "paypal",
      //           },
      //           redirect_urls: {
      //             return_url: "http://localhost:5173/shop/paypal-return",
      //             cancel_url: "http://localhost:5173/shop/paypal-cancel",
      //           },
      //           transactions: [
      //             {
      //               item_list: {
      //                 items: cartItems.map((item) => ({
      //                   name: item.title,
      //                   sku: item.productId,
      //                   price: item.price.toFixed(2),
      //                   currency: "USD",
      //                   quantity: item.quantity,
      //                 })),
      //               },
      //               amount: {
      //                 currency: "USD",
      //                 total: totalAmount.toFixed(2),
      //               },
      //               description: "description",
      //             },
      //           ],
      //         };
      // //payment instance
      //         paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      //           if (error) {
      //             console.log(error);
      //             res.status(500).json({
      //               success: false,
      //               message: " some Error occured while creating paypal payment",
      //             });
      //           } else {
      //             const newOrder = new Order({
      //               userId,
      //               cartItems,
      //               addressInfo,
      //               orderStatus,
      //               paymentMethod,
      //               paymentStatus,
      //               totalAmount,
      //               orderDate,
      //               orderUpdateDate,
      //               paymentId,
      //               payerId
      //             });
      //               await newOrder.save();
      //               const approvedUrl = paymentInfo.links.find(
      //                 (link) => link.rel === "approval_url"
      //               ).href;
      //             res.status(200).json({
      //               success: true,
      //                 approvedUrl,
      //                orderId: newOrder._id,
      //             });
      //           }
      //         })


      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cartItems.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `http://localhost:5173/shop/stripe-return?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5173/shop/stripe-cancel`,
      });

       const newOrder = new Order({
         userId,
         cartId,
         cartItems,
         addressInfo,
         orderStatus,
         paymentMethod,
         paymentStatus,
         totalAmount,
         orderDate,
         orderUpdateDate,
         stripeSessionId: session.id,
         paymentId,
         customerId,
       });

      await newOrder.save();
      
      res.status(200).json({
        success: true,
        approvedUrl: session.url, // just like PayPal’s approval_url
        orderId: newOrder._id,
      });

    } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: " some Error occured",
    });
  }
};



const capturePayment = async (req, res) => {
  try {
    const { orderId, stripeSessionId} = req.body;

       const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
  //  console.log("paymentIntent", paymentIntent);
   
    order.paymentId = paymentIntent.id;
    order.customerId = paymentIntent.customer; // Stripe's customer ID
    order.paymentStatus = paymentIntent.status; // should be "succeeded"
    order.orderStatus = "confirmed";


    const getCartId = order.cartId
    console.log("cartId", getCartId);
    
    
    await Cart.findByIdAndDelete(getCartId);

    await order.save();
    
    // Update order status to completed
    res.status(200).json({
      success: true,
      message: "order console",
      data:order
    });
  }
    
  catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: " some Error occured",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment
};