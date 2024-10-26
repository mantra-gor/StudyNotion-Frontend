import Spinner from "./Spinner";

function FallbackLoading() {
  return (
    <div className="w-screen h-screen bg-richblack-900 flex justify-center items-center">
      <Spinner />
    </div>
  );
}

export default FallbackLoading;
