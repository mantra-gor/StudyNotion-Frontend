import { useSelector } from "react-redux";

function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const handleBuyCourse = () => {
    cart.map((course) => {
      console.log(course._id);
    });
  };

  return (
    <div>
      <p>Total: </p>
      <p>Rs {total}</p>

      <button onClick={handleBuyCourse}>Buy Now</button>
    </div>
  );
}

export default RenderTotalAmount;
