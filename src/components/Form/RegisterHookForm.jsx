import { useForm } from "react-hook-form";
import InputHookForm from "../Input/InputHookForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RadioHookForm from "../Radio/RadioHookForm";
import CheckboxHookForm from "../Checkbox/CheckboxHookForm";
import DropdownHookForm from "../Dropdown/DropdownHookForm";

const dataDropdowns = [
  {
    id: 1,
    value: "Giáo viên",
  },
  {
    id: 2,
    value: "Sinh viên",
  },
  {
    id: 3,
    value: "Bác sĩ",
  },
  {
    id: 4,
    value: "Giáo sư",
  },
  {
    id: 5,
    value: "Thợ xây",
  },
];

const validationSchema = yup.object({
  username: yup.string().required("Bắt buộc").min(8, "Tối thiểu 8 ký tự"),
  password: yup.string().required("Bắt buộc").min(8, "Tối thiểu 8 ký tự"),
  email: yup.string().required("Bắt buộc").email("Không đúng định dạng"),
  gender: yup
    .string()
    .required("Bắt buộc")
    .oneOf(["Nam", "Nữ"], "Giá trị không phù hợp"),
  job: yup.string().required("Bắt buộc"),
  term: yup.boolean("Giá trị không phù hợp").oneOf([true], "Vui lòng xác nhận"),
});
const RegisterHookForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      gender: "Nam",
    },
  });

  const onSubmitHandler = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("values", values);
        resolve();
        reset({
          username: "",
          email: "",
          job: "",
          gender: "Nam",
          term: false,
        });
      }, 4000);
    });
  };
  return (
    <div className="max-w-[500px] h-[800px] w-full mx-auto m-10 p-5 bg-gray-100">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h2 className="font-bold text-center text-3xl">Đăng ký</h2>
        <InputHookForm
          labelFor="Username"
          name="username"
          id="username"
          placeholder="Nhập username"
          control={control}
          required
          showError
        />
        <InputHookForm
          labelFor="Mật khẩu"
          name="password"
          id="password"
          type="password"
          placeholder="Nhập mật khẩu"
          control={control}
          required
          showError
        />
        <InputHookForm
          labelFor="Email"
          name="email"
          id="email"
          type="email"
          placeholder="Nhập email"
          control={control}
          required
          showError
        />
        <div className="flex flex-col my-4">
          <label htmlFor="gender" className="cursor-pointer font-medium">
            <span className="mr-1">Giới tính</span>
            <small className="text-red-500">*</small>
          </label>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-x-3">
              <RadioHookForm control={control} name="gender" value="Nam" />
              <span>Nam</span>
            </div>
            <div className="flex items-center gap-x-3">
              <RadioHookForm control={control} name="gender" value="Nữ" />
              <span>Nữ</span>
            </div>
          </div>
          {errors.gender && (
            <small className="text-red-500">{errors.gender.message}</small>
          )}
        </div>
        <DropdownHookForm
          control={control}
          setValue={setValue}
          name="job"
          text="---Lựa chọn công việc---"
          label="Công việc"
          required
          data={dataDropdowns}
        ></DropdownHookForm>
        <div>
          <CheckboxHookForm
            control={control}
            text="Tôi đồng ý"
            name="term"
            id="term"
            showError
          ></CheckboxHookForm>
        </div>
        <button
          type="submit"
          className={`bg-blue-500 w-full p-4 text-white font-semibold mt-5 ${
            isSubmitting ? "opacity-50" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto"></div>
          ) : (
            <span>Đăng ký</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterHookForm;
