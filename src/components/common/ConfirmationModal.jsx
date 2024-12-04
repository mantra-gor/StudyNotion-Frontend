import Button from "../ui/Button";
import FocusLock from "react-focus-lock";

function ConfirmationModal({
  modalTitle,
  modalText,
  highlightedBtnText,
  highlightedBtnOnClick,
  btnText,
  btnOnclick,
  blur = true,
}) {
  return (
    <FocusLock>
      <div
        className={`bg-black/30 fixed flex justify-center items-center top-0 bottom-0 right-0 left-0 transition-all duration-200 z-50 ${
          blur && " backdrop-blur-md"
        }`}
      >
        <div className="w-10/12 mx-auto md:w-[400px] flex flex-col gap-4 px-16 py-8 rounded-xl text-center bg-richblack-700/80 border border-richblack-200">
          <h2 className="text-2xl text-richblack-5 font-semibold">
            {modalTitle}
          </h2>
          <p className="text-richblack-100">{modalText}</p>
          <div className="flex justify-between items-center gap-6">
            <Button active onClick={highlightedBtnOnClick}>
              {highlightedBtnText}
            </Button>
            <Button className="text-richblack-25" onClick={btnOnclick}>
              {btnText}
            </Button>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}

export default ConfirmationModal;
