import Razorpay from 'razorpay';
import crypto from 'crypto';
import { sendEmail } from '../utils/sendEmail.js';

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
export const createPaymentOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // amount in smallest currency unit
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong with Razorpay' });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Private
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      
      // Dispatch mock email
      const userEmail = req.user ? req.user.email : 'customer@example.com'; 
      await sendEmail({
        email: userEmail,
        subject: `Order Confirmation - ${razorpay_order_id}`,
        html: `
          <h1>Thanks for choosing Iffu!</h1>
          <p>Your payment (ID: ${razorpay_payment_id}) has been recorded securely via Razorpay.</p>
          <p>We're actively preparing your streetwear drop.</p>
        `
      });

      return res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid signature sent!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};
