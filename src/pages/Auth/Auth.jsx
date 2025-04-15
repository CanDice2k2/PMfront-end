import "./Auth.css";
import { Button } from "@/components/ui/button";
import SignupForm from "./signup/SignupForm";
import LoginForm from "./login/login";
import { useState } from "react";

const Auth = () => {
  const [active, setActive] = useState(false); // Mặc định hiển thị form đăng nhập
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F2F5] via-[#E4E8ED] to-[#D8E1F0] flex flex-col lg:flex-row items-center justify-center py-12 px-4 sm:px-6 lg:px-8 auth-container">
      {/* Các hình decorative */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-float"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-float-delay"></div>
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-10 animate-float-slow"></div>
      
      <div className="lg:flex-1 lg:max-w-md mb-10 lg:mb-0 lg:mr-10">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1877F2] mb-4 logo-text">BuildFlow</h1>
          <p className="text-gray-700 text-xl lg:text-2xl mb-6 max-w-md fade-in">Quản lý dự án xây dựng công ty Thiên Hà 360</p>
          <p className="hidden lg:block text-gray-600 slide-in">BuildFlow giúp bạn quản lý các dự án xây dựng một cách chuyên nghiệp, theo dõi tiến độ và hợp tác hiệu quả với đội nhóm.</p>
          
          {/* Feature bullets chỉ hiển thị trên desktop */}
          <div className="hidden lg:block mt-8">
            <div className="flex items-center mb-3 fade-in-delay">
              <div className="bg-[#1877F2] p-2 rounded-full text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>
              </div>
              <p className="text-gray-700">Quản lý tiến độ dự án trực quan</p>
            </div>
            <div className="flex items-center mb-3 fade-in-delay-2">
              <div className="bg-[#1877F2] p-2 rounded-full text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>
              </div>
              <p className="text-gray-700">Quản lý tài liệu và bản vẽ dễ dàng</p>
            </div>
            <div className="flex items-center fade-in-delay-3">
              <div className="bg-[#1877F2] p-2 rounded-full text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>
              </div>
              <p className="text-gray-700">Giao tiếp và phối hợp hiệu quả</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:flex-1 lg:max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 form-container">
          {active ? <SignupForm /> : <LoginForm />}
          
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex items-center justify-center">
              <span className="text-gray-600">{active ? "Đã có tài khoản?" : "Chưa có tài khoản?"}</span>
              <Button
                onClick={() => setActive(!active)}
                variant="link"
                className="text-[#1877F2] font-semibold hover:text-[#0a59c1] transition-colors"
              >
                {active ? "Đăng nhập" : "Đăng ký"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
