import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { MdArrowDropDown } from "react-icons/md";

function NestedView({ handleChangeEditScetionName }) {
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(null);

  return (
    <div>
      <div>
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary>
              <div>
                <MdArrowDropDown />
                <p>{section.sectionName}</p>
              </div>
            </summary>
          </details>
        ))}
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          modalTitle="Are you sure ?"
          modalText="You will be logged out of your account."
          highlightedBtnText="Logout"
          btnText="Cancel"
          highlightedBtnOnClick={"Yes, Sure!"}
          //   btnOnclick={}
        />
      )}
    </div>
  );
}

export default NestedView;
