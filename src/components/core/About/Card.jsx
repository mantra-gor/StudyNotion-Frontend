function Card({ title, text, light = true }) {
  return (
    <div
      className={`md:w-[275px] md:h-[275px] aspect-square p-6 ${
        light ? "bg-richblack-700" : "bg-richblack-800"
      }`}
    >
      <h4 className="text-richblack-5 text-lg font-semibold">{title}</h4>
      <p className="text-richblack-100 text-sm mt-6">{text}</p>
    </div>
  );
}

export default Card;
