import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { MdOutlineAutoDelete } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { removeFromCart } from "../../../../redux/slices/cartSlice";

function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div>
      {cart.map((course, index) => (
        <div key={index}>
          <img src={course?.thumbnail} alt="thumbnail" />
          <div>
            <p>{course?.courseName}</p>
            <p>{course?.category.name}</p>
            <div>
              {/* Add API connection here for average rating */}
              <span>4.6</span>
              <ReactStars
                count={5}
                size={20}
                edit={false}
                activeColor={"#ffd700"}
                emptyIcon={<AiOutlineStar />}
                fullIcon={<AiFillStar />}
              />
              <span>{course?.ratingsAndReviews?.length}</span>
            </div>
          </div>

          <div>
            <button onClick={() => dispatch(removeFromCart(course._id))}>
              <MdOutlineAutoDelete />
              Remove
            </button>
            <p>Rs. {course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RenderCartCourses;
