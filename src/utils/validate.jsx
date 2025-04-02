import * as yup from 'yup';
export const registrationSchema = yup.object({
  name: yup.string().required('Bắt buộc'),
  password: yup.string().required('Bắt buộc').min(8, 'Tối thiểu 8 ký tự'),
  email: yup.string().required('Bắt buộc').email('Không đúng định dạng'),
  phoneNumber: yup
    .string()
    .required('Bắt buộc')
    .matches(
      /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
      'Số điện thoại không hợp lệ'
    ),
});

export const loginSchema = yup.object({
  password: yup.string().required('Bắt buộc').min(8, 'Tối thiểu 8 ký tự'),
  email: yup.string().required('Bắt buộc').email('Không đúng định dạng'),
});

export const realEstateSchema = yup.object({
  title: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .min(30, 'Tối thiểu 30 ký tự')
    .max(100, 'Tối đa 100 ký tự'),
  description: yup
    .string()
    .required('Vui lòng nhập thông tin')
    .min(100, 'Tối thiểu 100 ký tự')
    .max(1000, 'Tối đa 1000 ký tự'),
  province: yup.string().required('Vui lòng chọn địa điểm trên bản đồ'),
  district: yup.string().required('Vui lòng chọn địa điểm trên bản đồ'),
  wards: yup.string().required('Vui lòng chọn địa điểm trên bản đồ'),
  area: yup
    .number()
    .typeError('Giá trị nhập vào không phù hợp')
    .required('Vui lòng nhập thông tin')
    .min(1, 'Diện tích không phù hợp'),
  rentPrice: yup
    .number()
    .typeError('Giá trị nhập vào không phù hợp')
    .required('Vui lòng nhập thông tin')
    .min(0, 'Giá thuê không phù hợp'),
  postType: yup.string().required('Vui lòng loại bài đăng'),
});
