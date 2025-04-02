import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputFormikV4 from "../Input/InputFormikV4";
import TextareaFormikV4 from "../Textarea/TextareaFormikV4";
import SelectFormikV4 from "../SelectBox/SelectFormikV4";
import CheckboxFormikV4 from "../Checkbox/CheckboxFormikV4";

const FormFormikComponentV4 = () => {
  return (
    <Formik
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.resetForm();
          actions.setSubmitting(false);
        }, 3000);
        console.log("values", values);
        console.log("actions", actions);
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
        term: Yup.boolean().oneOf([true], "Vui lòng xác nhận"),
      })}
    >
      {(formik) => {
        console.log("formik", formik);

        return (
          <Form className="max-w-[500px] mx-auto p-10 w-full">
            <InputFormikV4
              htmlFor="firstName"
              labelFor="Họ"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Nhập họ và tên đệm"
            ></InputFormikV4>
            <InputFormikV4
              htmlFor="lastName"
              labelFor="Tên"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Nhập tên"
            ></InputFormikV4>
            <InputFormikV4
              htmlFor="email"
              labelFor="Email"
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email"
            ></InputFormikV4>
            <TextareaFormikV4
              htmlFor="intro"
              labelFor="Giới thiệu"
              id="intro"
              placeholder="Nhập giới thiệu"
              name="intro"
            ></TextareaFormikV4>
            <SelectFormikV4
              htmlFor="job"
              labelFor="Công việc"
              id="job"
              className="p-3 outline-none border border-gray-300"
              name="job"
            >
              <option value="">---Lựa chọn công việc---</option>
              <option value="IT">IT</option>
              <option value="Giáo viên">Giáo viên</option>
              <option value="Công an">Công an</option>
            </SelectFormikV4>
            <CheckboxFormikV4 id="term" name="term">
              <p>Tôi đồng ý</p>
            </CheckboxFormikV4>
            <button
              type="submit"
              className="p-3 bg-blue-500 border w-full text-white outline-none font-semibold"
              disabled={formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormFormikComponentV4;
