import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const FormFormikComponentV2 = () => {
  return (
    <Formik
      onSubmit={(values) => {
        console.log("values", values);
      }}
      initialValues={{
        firstName: "",
        lastName: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().max(20, "Tối đa 20 ký tự").required("Bắt buộc"),
        lastName: Yup.string().max(20, "Tối đa 20 ký tự").required("Bắt buộc"),
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

export default FormFormikComponentV2;
