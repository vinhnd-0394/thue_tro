import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const FormFormikComponentV3 = () => {
  return (
    <Formik
      onSubmit={(values) => {
        console.log("values", values);
      }}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        intro: "",
        job: "",
        term: false,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().max(20, "Tối đa 20 ký tự").required("Bắt buộc"),
        lastName: Yup.string().max(20, "Tối đa 20 ký tự").required("Bắt buộc"),
        email: Yup.string()
          .email("Không đúng định dạng email")
          .required("Bắt buộc"),
        intro: Yup.string().required("Bắt buộc"),
        job: Yup.string().required("Bắt buộc"),
        term: Yup.boolean(),
      })}
    >
      <Form className="max-w-[500px] mx-auto p-10 w-full">
        <div className="flex flex-col mb-4">
          <label htmlFor="firstName">Họ</label>
          <Field
            type="text"
            id="firstName"
            placeholder="Nhập họ và tên đệm"
            className="p-3 outline-none border border-gray-300"
            name="firstName"
          ></Field>
          <small className="text-red-500">
            <ErrorMessage name="firstName"></ErrorMessage>
          </small>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="lastName">Tên</label>
          <Field
            type="text"
            id="lastName"
            placeholder="Nhập tên"
            className="p-3 outline-none border border-gray-300"
            name="lastName"
          ></Field>
          <small className="text-red-500">
            <ErrorMessage name="lastName"></ErrorMessage>
          </small>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email">Email</label>
          <Field
            type="email"
            id="email"
            placeholder="Nhập email"
            className="p-3 outline-none border border-gray-300"
            name="email"
          ></Field>
          <small className="text-red-email00">
            <ErrorMessage name="email"></ErrorMessage>
          </small>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="intro">Giới thiệu</label>
          <Field
            id="intro"
            placeholder="Nhập giới thiệu"
            className="p-3 outline-none border border-gray-300 h-[150px] resize-none"
            name="intro"
            as="textarea"
          ></Field>
          <small className="text-red-500">
            <ErrorMessage name="intro"></ErrorMessage>
          </small>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="job">Công việc</label>
          <Field
            id="job"
            className="p-3 outline-none border border-gray-300"
            name="job"
            as="select"
          >
            <option value="">---Lựa chọn công việc---</option>
            <option value="IT">IT</option>
            <option value="Giáo viên">Giáo viên</option>
            <option value="Công an">Công an</option>
          </Field>
          <small className="text-red-500">
            <ErrorMessage name="job"></ErrorMessage>
          </small>
        </div>
        <div className="flex flex-col mb-4">
          <div>
            <Field
              id="term"
              className="p-3 outline-none border border-gray-300 mr-4"
              name="term"
              type="checkbox"
            ></Field>
            <label htmlFor="term">Tôi đồng ý</label>
          </div>
          <small className="text-red-500">
            <ErrorMessage name="term"></ErrorMessage>
          </small>
        </div>
        <button
          type="submit"
          className="p-3 bg-blue-500 border w-full text-white outline-none font-semibold"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default FormFormikComponentV3;
