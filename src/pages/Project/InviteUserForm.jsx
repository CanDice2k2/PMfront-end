import { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { inviteToProject } from "@/redux/Project/Project.Action";
import { CheckCircle, AlertCircle, X } from "lucide-react";

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const InviteUserForm = ({projectId}) => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setNotification(null);
    
    try {
      data.projectId = projectId;
      await dispatch(inviteToProject(data));
      
      // Hiển thị thông báo thành công
      setNotification({
        type: "success",
        message: "Đã gửi lời mời thành công!"
      });
      
      // Reset form sau khi gửi thành công
      form.reset();
    } catch (error) {
      // Hiển thị thông báo lỗi
      setNotification({
        type: "error",
        message: error.message || "Không thể gửi lời mời. Vui lòng thử lại sau."
      });
    } finally {
      setIsSubmitting(false);
      
      // Tự động ẩn thông báo sau 5 giây
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };
  
  return (
    <div className="relative">
      {/* Hiển thị thông báo */}
      {notification && (
        <div 
          className={`mb-4 p-3 rounded-md flex items-center justify-between ${
            notification.type === "success" 
              ? "bg-green-50 text-green-700 border border-green-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            <p>{notification.message}</p>
          </div>
          <button 
            onClick={() => setNotification(null)} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Nhập email"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className={`w-full py-5 ${isSubmitting ? 'opacity-70' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi lời mời"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InviteUserForm;
