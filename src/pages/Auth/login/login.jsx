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
import { login } from "@/redux/Auth/Action";

const formSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onSubmit = (data) => {
    dispatch(login(data));
  };
  
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold mb-2 text-gray-800">Xin chào!</h1>
      <p className="text-center text-gray-700 mb-6">Đăng nhập vào tài khoản của bạn</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                    placeholder="Mật khẩu"
                    style={{ color: '#333', '::placeholder': { color: '#666' } }}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-xs mt-1 font-medium" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-gradient-to-r from-[#1877F2] to-[#166FE5] text-white py-3 font-semibold text-md rounded-lg hover:from-[#166FE5] hover:to-[#0d5ac8] transition-all">
            Đăng nhập
          </Button>
          
          {/* <div className="text-center">
            <Button variant="link" className="text-[#1877F2] font-medium text-sm hover:text-[#0d5ac8] transition-colors">
              Quên mật khẩu?
            </Button>
          </div> */}
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;