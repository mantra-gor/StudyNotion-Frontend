import ContactUsForm from "../../common/ContactUsForm";

function ContactFormSection() {
  return (
    <div className="md:w-5/12 w-full mx-auto">
      <h3 className="text-richblack-5 text-4xl font-semibold text-center">
        Get in Touch
      </h3>
      <h4 className="text-richblack-300 text-center">
        We’d love to here for you, Please fill out this form.
      </h4>
      <ContactUsForm />
    </div>
  );
}

export default ContactFormSection;
