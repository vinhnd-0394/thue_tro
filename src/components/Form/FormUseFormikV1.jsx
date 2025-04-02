import { useFormik } from "formik";
import * as Yup from "yup";

// const validate = (values) => {
//   const errors = {};
//   if (!values.firstName) {
//     errors.firstName = "Bắt buộc";
//   } else if (values.firstName.length > 20) {
//     errors.firstName = "Phải nhỏ hơn 20 ký tự";
//   }

//   if (!values.lastName) {
//     errors.lastName = "Bắt buộc";
//   } else if (values.lastName.length > 20) {
//     errors.lastName = "Phải nhỏ hơn 20 ký tự";
//   }

//   return errors;
// };

const FormUseFormikV1 = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    // validate,
    validationSchema: Yup.object({
      firstName: Yup.string().max(20, "Tối đa 20 ký tự").required("Bắt buộc"),
      lastName: Yup.string().max(20, "Tối đa 20 ký tự").required("Bắt buộc"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  console.log(formik);
  return (
    <form
      className="max-w-[500px] mx-auto p-10 w-full"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col mb-4">
        <label htmlFor="firstName">Họ</label>
        <input
          type="text"
          id="firstName"
          placeholder="Nhập họ và tên đệm"
          className="p-3 outline-none border border-gray-300"
          // name="firstName"
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.firstName}
          {...formik.getFieldProps("firstName")}
        />
        {formik.errors.firstName && formik.touched.firstName && (
          <small className="text-red-500">{formik.errors.firstName}</small>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="lastName">Tên</label>
        <input
          type="text"
          id="lastName"
          placeholder="Nhập tên"
          className="p-3 outline-none border border-gray-300"
          // name="lastName"
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.lastName}
          {...formik.getFieldProps("lastName")}
        />
        {formik.errors.lastName && formik.touched.lastName && (
          <small className="text-red-500">{formik.errors.lastName}</small>
        )}
      </div>
      <button
        type="submit"
        className="p-3 bg-blue-500 border w-full text-white outline-none font-semibold"
      >
        Submit
      </button>
    </form>
  );
};

export default FormUseFormikV1;
