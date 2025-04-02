import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputHookFormV2 from "../Input/InputHookFormV2";
import InputHookFormV3 from "../Input/InputHookFormV3";

const validationSchema = yup.object({
  firstName: yup.string().max(20, "Tối đa 20 ký tự").required("Bắt buộc"),
  lastName: yup.string().max(20, "Tối đa 20 ký tự").required("Bắt buộc"),
  email: yup.string().email("Định dạng không đúng email").required("Bắt buộc"),
});

const HookFormV2 = () => {
  const forms = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const { handleSubmit, register, formState, watch, reset, control } = forms;
  const { errors, isSubmitting, isValid } = formState;

  const watchShowAge = watch("showAge", false);

  console.log("errors", errors);
  console.log("isSubmitting", isSubmitting);

  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log(isValid);
        if (isValid) {
          console.log(values);
          reset({
            firstName: "Vinh",
            lastName: "",
          });
        } else {
          console.log("errors");
        }
      }, 5000);
    });
  };
  return (
    <form
      className="max-w-[500px] mx-auto p-10 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col mb-4">
        <label htmlFor="firstName">Họ</label>
        <input
          type="text"
          id="firstName"
          placeholder="Nhập họ và tên đệm"
          className="p-3 outline-none border border-gray-300"
          // {...register("firstName", {
          //   required: true,
          //   maxLength: 20,
          // })}
          {...register("firstName")}
        />
        {errors?.firstName && (
          <small className="text-red-500">{errors.firstName.message}</small>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="lastName">Tên</label>
        <InputHookFormV2
          id="lastName"
          name="lastName"
          placeholder="Nhập tên"
          control={control}
        ></InputHookFormV2>
        {errors?.lastName && (
          <small className="text-red-500">{errors.lastName.message}</small>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="email">Email</label>
        <InputHookFormV3
          type="email"
          id="email"
          name="email"
          placeholder="Nhập email"
          control={control}
        ></InputHookFormV3>
        {errors?.email && (
          <small className="text-red-500">{errors.email.message}</small>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <input type="checkbox" {...register("showAge")} />
        {watchShowAge && <span>Vinh 22 tuổi</span>}
      </div>
      <button
        type="submit"
        className="p-3 bg-blue-500 border w-full text-white outline-none font-semibold"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default HookFormV2;
