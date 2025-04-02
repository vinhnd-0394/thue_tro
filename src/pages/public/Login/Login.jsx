import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import InputHookForm from '../../../components/Input/InputHookForm';
import { apiLogin } from '../../../apis/auth/access.api';
import { loginSchema } from '../../../utils/validate';
import { useContext } from 'react';
import { AppContext } from '../../../contexts/app.context';

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmitHandler = async (values) => {
    if (!isValid) return;
    const payload = {
      email: values.email,
      password: values.password,
    };
    const response = await apiLogin(payload);
    if (response.status === 200) {
      const { profile, message } = response.data;
      setIsAuthenticated(true);
      setProfile(profile);
      toast.success(message);
      reset({
        email: '',
        password: '',
      });
      if (profile.role === 1) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="w-[960px] pt-10 mx-auto">
      <div className="w-[550px] mx-auto">
        <div className="relative py-[30px] px-[100px] login">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <h2 className="mb-5 text-3xl font-bold">Đăng nhập</h2>
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
                isSubmitting ? 'opacity-50' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 mx-auto border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <span>Đăng nhập</span>
              )}
            </button>
          </form>
          <p className="my-2 text-sm">
            <Link to="/" className="text-blue-500">
              Bạn quên mật khẩu?
            </Link>
          </p>
          <p className="text-sm">
            <span>Bạn chưa có tài khoản?</span>
            <Link to="/register" className="ml-2 font-bold text-blue-500">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
