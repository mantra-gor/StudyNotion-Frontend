import { paymentEndpoints } from "../apiEndpoints";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { setPaymentLoading } from "../../redux/slices/courseSlice";
import { resetCart } from "../../redux/slices/cartSlice";

const { CAPTURE_PAYMENT, VERIFY_PAYMENT, SEND_SUCCESS_MAIL } = paymentEndpoints;

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

export async function buyCourse({ courses, userDetails, navigate, dispatch }) {
  try {
    // load the Razorpay script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      return toast.error("Razorpay SDK failed to load. Are you online?");
    }

    // initiate the payment
    const orderResponse = await apiConnector("POST", CAPTURE_PAYMENT, {
      courses,
    });

    if (!orderResponse.success) {
      throw new Error(orderResponse.message || "Failed to create order");
    }

    const options = {
      key: razorpayKey,
      amount: orderResponse.paymentResponse.amount,
      currency: orderResponse.paymentResponse.currency,
      name: "StudyNotion",
      description: "Thank you for enrolling in our course",
      image:
        "https://studynotion-assets.s3.ap-south-1.amazonaws.com/Logo/Logo-Small-Dark.png",
      order_id: orderResponse.paymentResponse.id,
      handler: function (response) {
        // send mail for successful payment
        sendPaymentSuccessMail(response, orderResponse.paymentResponse.amount);

        // verify the payment
        verifyPayment({ ...response, courses }, navigate, dispatch);
      },
      prefill: {
        name: userDetails.firstName,
        email: userDetails.email,
        contact: userDetails.phoneNo,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.error("Payment failed:", response);
      toast.error("Payment failed. Please try again.");
    });
  } catch (error) {
    console.error("Error capturing payment:", error);
    toast.error("Failed to make payment");
  }
}

async function sendPaymentSuccessMail(response, amount) {
  try {
    await apiConnector("POST", SEND_SUCCESS_MAIL, {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      amount,
    });
  } catch (error) {
    console.error("Error sending payment success mail:", error);
    toast.error("Failed to send payment success mail");
  }
}

async function verifyPayment(response, navigate, dispatch) {
  dispatch(setPaymentLoading(true));
  try {
    const res = await apiConnector("POST", VERIFY_PAYMENT, {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      courses: response.courses,
    });

    if (!res) {
      throw new Error("Payment verification failed");
    }

    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.error("Error verifying payment:", error);
    toast.error("Payment verification failed");
    navigate("/dashboard/enrolled-courses");
  }
  dispatch(setPaymentLoading(false));
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}
