import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { MdOutlineAdd, MdOutlineDelete } from "react-icons/md";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { FaCaretDown } from "react-icons/fa";
import LectureModal from "./LectureModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsApi";
import { setCourse } from "../../../../../redux/slices/courseSlice";

function NestedView({ handleChangeEditScetionName }) {
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [deleteSectionData, setDeleteSectionData] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(null);

  const deleteSectionHandler = async () => {
    const result = await deleteSection({
      sectionID: deleteSectionData._id,
      courseID: course._id,
    });
    if (result.success) {
      dispatch(setCourse(result.data));
    }
    setShowConfirmationModal(false);
  };

  const deleteSubSectionHandler = async () => {
    console.log(viewSubSection);

    const result = await deleteSubSection({
      subSectionID: viewSubSection._id,
      courseID: course._id,
    });

    if (result) {
      dispatch(setCourse(result.data));
    }

    setShowConfirmationModal(false);
  };

  return (
    <div>
      <div>
        {course?.courseContent?.map((section, index) => (
          <details key={section._id} className="text-richblack-50" open>
            <summary className="flex items-center justify-between gap-x-3 border-b p-3">
              <div className="flex items-center gap-3">
                <BsFillMenuButtonWideFill />
                <h5 className="font-medium">{section.sectionName}</h5>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleChangeEditScetionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <TbEdit size={21} />
                </button>
                <button
                  onClick={() => {
                    setShowConfirmationModal(true);
                    setDeleteSectionData(section);
                  }}
                >
                  <MdOutlineDelete size={21} />
                </button>
                <span>|</span>
                <FaCaretDown size={21} />
              </div>
            </summary>
            <div className="flex flex-col items-end">
              {section.subSection?.map((data, index) => (
                <div
                  key={data._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex items-center w-[98%] justify-between gap-x-3 border-b border-richblack-300 border-dashed p-3"
                >
                  <div className="flex items-center gap-3 ">
                    <BsFillMenuButtonWideFill />
                    <h5 className="">{data.title}</h5>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <button
                      onClick={() =>
                        setEditSubSection({
                          ...data,
                          sectionId: section._id,
                          courseContentIndex: index,
                        })
                      }
                    >
                      <TbEdit />
                    </button>
                    <button
                      onClick={() => {
                        setShowConfirmationModal(true);
                      }}
                    >
                      <MdOutlineDelete size={21} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  setAddSubSection({
                    sectionID: section._id,
                    courseContentIndex: index,
                  })
                }
                className="mt-3 mb-4 flex items-center gap-x-3 text-yellow-50"
              >
                <MdOutlineAdd size={24} />
                Add Lecture
              </button>
            </div>
          </details>
        ))}
        <div>
          {addSubSection ? (
            <LectureModal
              modalData={addSubSection}
              setModalData={setAddSubSection}
              add={true}
            />
          ) : viewSubSection ? (
            <LectureModal
              modalData={viewSubSection}
              setModalData={setViewSubSection}
              view={true}
            />
          ) : editSubSection ? (
            <LectureModal
              modalData={editSubSection}
              setModalData={setEditSubSection}
              edit={true}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          modalTitle="Are you sure ?"
          // ${deleteSectionData.sectionName}
          modalText={`This will be deleted!`}
          highlightedBtnText="Delete"
          btnText="Cancel"
          highlightedBtnOnClick={
            viewSubSection ? deleteSubSectionHandler : deleteSectionHandler
          }
          btnOnclick={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
}

export default NestedView;
