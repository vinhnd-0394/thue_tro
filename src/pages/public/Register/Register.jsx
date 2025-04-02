import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import InputHookForm from "../../../components/Input/InputHookForm";
import { apiRegister } from "../../../apis/auth/access.api";
import { registrationSchema } from "../../../utils/validate";

const Register = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: "onChange",
  });

  const onSubmitHandler = async (values) => {
    if (!isValid) return;
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
    };
    const response = await apiRegister(payload);
    if (response.status === 201) {
      toast.success(response.message);
      reset({
        name: "",
        password: "",
        email: "",
        phoneNumber: "",
      });
      navigate("/login");
    }
  };

  return (
    <div className="mx-auto w-[960px] pt-10">
      <div className="float-right w-[600px]">
        <div className="w-full">
          <div className="relative p-10 register">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <h2 className="mb-2 text-3xl font-bold">Tạo tài khoản mới</h2>
              <InputHookForm
                labelFor="Họ tên của bạn"
                name="name"
                id="name"
                placeholder="Nhập họ tên của bạn"
                control={control}
                required
                showError
              />
              <InputHookForm
                labelFor="Địa chỉ Email"
                name="email"
                id="email"
                type="email"
                placeholder="Nhập địa chỉ email"
                control={control}
                required
                showError
              />
              <InputHookForm
                labelFor="Số điện thoại"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Nhập số điện thoại"
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

              <button
                type="submit"
                className={`bg-blue-500 w-full p-3 text-white font-semibold my-4 rounded-md${
                  isSubmitting ? "opacity-50" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 mx-auto border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  <span>Đăng ký</span>
                )}
              </button>
            </form>
            <p className="text-sm">
              <span>Bạn đã có tài khoản?</span>
              <Link to="/login" className="ml-2 font-bold text-blue-500">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
