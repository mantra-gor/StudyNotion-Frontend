import {
  BsFillChatRightTextFill,
  BsFillTelephoneFill,
  BsGlobeCentralSouthAsia,
} from "react-icons/bs";
import ContactUsForm from "../components/common/ContactUsForm";
import Footer from "../components/common/Footer";

function ContactUs() {
  return (
    <>
      <div className="w-11/12 relative mx-auto flex flex-col items-center justify-between">
        <div className="flex flex-col md:flex-row justify-between gap-24 my-8 md:my-24">
          <div className="text-richblack-5 bg-richblack-800 md:w-5/12 h-fit p-8 rounded-xl flex flex-col gap-8">
            <div className="flex items-baseline gap-4">
              <div>
                <BsFillChatRightTextFill
                  size={18}
                  className=" text-richblack-100"
                />
              </div>
              <div>
                <div>
                  <h5 className="text-lg font-semibold">Chat on us</h5>
                  <p className="text-richblack-200 font-medium">
                    Our friendly team is here to help.
                  </p>
                  <a
                    href="mailto:help.studynotion.edu@gmail.com"
                    className="text-richblack-400 italic"
                  >
                    help.studynotion.edu@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <div>
                <BsGlobeCentralSouthAsia
                  size={18}
                  className=" text-richblack-100"
                />
              </div>
              <div>
                <div>
                  <h5 className="text-lg font-semibold">Visit us</h5>
                  <p className="text-richblack-200 font-medium">
                    Come and meet us at our office HQ.
                  </p>
                  <p className="text-richblack-400 italic">
                    <address>
                      Manyata Embassy Business Park Block N1, Ground Floor
                      Rachenahalli, Nagavara Bangalore, Karnataka 560045 India
                    </address>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <div>
                <BsFillTelephoneFill
                  size={18}
                  className=" text-richblack-100"
                />
              </div>
              <div>
                <div>
                  <h5 className="text-lg font-semibold">Call us</h5>
                  <p className="text-richblack-200 font-medium">
                    Mon - Fri From 9am to 5pm
                  </p>
                  <a
                    href="tel:+919999988888"
                    className="text-richblack-400 italic"
                  >
                    +91 9999988888
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-richblack-600 p-8 rounded-xl">
            <h1 className="text-4xl font-semibold text-richblack-5 ">
              Got a Idea? We’ve got the skills. Let’s team up
            </h1>
            <p className="font-medium text-richblack-300 mt-2">
              Tell us more about yourself and what you’re got in mind.
            </p>
            <ContactUsForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
