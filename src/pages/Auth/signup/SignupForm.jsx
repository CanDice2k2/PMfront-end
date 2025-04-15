import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { register } from "@/redux/Auth/Action";

const formSchema = z.object({
  fullName: z.string().nonempty("Vui lòng nhập họ và tên"),
  email: z.string().email("Email không hợp lệ"),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

const SignupForm = () => {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });
  
  const onSubmit = (data) => {
    // Loại bỏ confirmPassword trước khi gửi đến API
    const { confirmPassword, ...registerData } = data;
    dispatch(register(registerData));
  };
  
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold mb-2 text-gray-800">Tạo tài khoản mới</h1>
      <p className="text-center text-gray-700 mb-6">Nhanh chóng và dễ dàng</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="input-container">
                <div className="input-icon-container text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                  </svg>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border border-[#dddfe2] rounded-lg py-3 px-3 pl-10 has-icon focus:border-[#1877F2] focus:ring-[#1877F2] transition-all text-gray-800"
                    placeholder="Họ và tên"
                    style={{ color: '#333', '::placeholder': { color: '#666' } }}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-xs mt-1 font-medium" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="input-container">
                <div className="input-icon-container text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                  </svg>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    className="border border-[#dddfe2] rounded-lg py-3 px-3 pl-10 has-icon focus:border-[#1877F2] focus:ring-[#1877F2] transition-all text-gray-800"
                    placeholder="Email"
                    style={{ color: '#333', '::placeholder': { color: '#666' } }}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-xs mt-1 font-medium" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="input-container">
                <div className="input-icon-container text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                  </svg>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border border-[#dddfe2] rounded-lg py-3 px-3 pl-10 has-icon focus:border-[#1877F2] focus:ring-[#1877F2] transition-all text-gray-800"
                    placeholder="Mật khẩu mới"
                    style={{ color: '#333', '::placeholder': { color: '#666' } }}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-xs mt-1 font-medium" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="input-container">
                <div className="input-icon-container text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V10h.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V11h-2.5a.5.5 0 0 1 0-1H13V1.78a.5.5 0 0 0-.5-.5h-2.98a5.454 5.454 0 0 0-1.19.093l-.46.66a1.003 1.003 0 0 1-1.37.282l-1.96-1.26A1 1 0 0 1 6.78.326H12.136z M6.622.326A1.5 1.5 0 0 0 5 1.78V10H.5a.5.5 0 0 0 0 1H5v1.5a.5.5 0 0 0 1 0V11h2.5a.5.5 0 0 0 0-1H6V1.78a.5.5 0 0 1 .5-.5h2.98a5.454 5.454 0 0 1 1.19.093l.46.66a1.003 1.003 0 0 0 1.37.282l1.96-1.26a1 1 0 0 0-.363-1.737H6.622z"/>
                  </svg>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="border border-[#dddfe2] rounded-lg py-3 px-3 pl-10 has-icon focus:border-[#1877F2] focus:ring-[#1877F2] transition-all text-gray-800"
                    placeholder="Xác nhận mật khẩu"
                    style={{ color: '#333', '::placeholder': { color: '#666' } }}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-xs mt-1 font-medium" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-gradient-to-r from-[#42b72a] to-[#36a420] text-white py-3 font-semibold text-md rounded-lg hover:from-[#36a420] hover:to-[#2b9217] transition-all">
            Đăng ký
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
