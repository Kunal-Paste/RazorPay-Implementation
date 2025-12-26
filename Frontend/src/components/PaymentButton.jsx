import React from "react";
import axios from "axios";

function PaymentButton() {

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/payments/create-order"
      );
      const orderData = response.data.order;

      const options = {
        key: "rzp_test_Rw9aDC460ADfK7",
        amount: orderData.amount, 
        currency: orderData.currency,
        name: "My Company",
        description: "Test Transaction",
        order_id: orderData.id, 
        handler: async function (response) {
          try {
            await axios.post("http://localhost:3000/api/payments/verify", {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            alert("Payment successful!");
          } catch (err) {
            console.error("Verification error", err);
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Order creation failed", err);
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: "10px 20px",
        background: "#3399cc",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Pay Now
    </button>
  );
}

export default PaymentButton;
