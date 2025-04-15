import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { createIssue } from "@/redux/Issue/Issue.action";
import { useParams } from "react-router-dom";
import { DialogClose } from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Cross1Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";

const formSchema = z.object({
  issueName: z.string().min(2, {
    message: "Tên công việc phải có ít nhất 2 ký tự.",
  }),
  description: z.string().min(2, {
    message: "Mô tả phải có ít nhất 2 ký tự.",
  }),
  priority: z.string().optional(),
  dueDate: z.date().optional(),
  tags: z.array(z.string()).default([]),
});

const priorityOptions = [
  { value: "cao", label: "Cao" },
  { value: "trung_binh", label: "Trung bình" },
  { value: "thap", label: "Thấp" },
];

const issueTags = [
  "Thiết kế",
  "Triển khai",
  "Kiểm thử",
  "Báo cáo",
  "Khảo sát",
  "Tài liệu",
];

export function CreateIssueForm({ status }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issueName: "",
      description: "",
      priority: "",
      dueDate: undefined,
      tags: [],
    },
  });
  
  const handleTagChange = (tag) => {
    const currentTags = form.getValues("tags") || [];
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
      
    form.setValue("tags", updatedTags);
  };
  
  const onSubmit = (data) => {
    // Đảm bảo tags luôn là một mảng, ngay cả khi trống
    const tags = Array.isArray(data.tags) ? data.tags : [];
    
    const issueData = {
      title: data.issueName,
      projectId: id,
      status,
      description: data.description,
      priority: data.priority || "trung_binh", // Mặc định là trung bình nếu không chọn
      dueDate: data.dueDate ? data.dueDate.toISOString().split('T')[0] : null,
      tags: tags // Đảm bảo là mảng
    };
    
    console.log("Dữ liệu gửi đi:", issueData);
    
    dispatch(createIssue(issueData));
    
    // Thông báo thành công
    toast.success("Thêm công việc thành công!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="issueName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên công việc</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên công việc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Input placeholder="Mô tả công việc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mức độ ưu tiên</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn mức độ ưu tiên" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày hạn</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : undefined;
                    field.onChange(date);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhãn</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {issueTags.map((tag) => (
                  <div
                    key={tag}
                    onClick={() => handleTagChange(tag)}
                    className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                      field.value && field.value.includes(tag)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    {tag}
                  </div>
                ))}
              </div>
              
              {field.value && field.value.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  <p className="text-sm mb-1">Đã chọn:</p>
                  <div className="flex flex-wrap gap-1">
                    {field.value.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs"
                      >
                        {tag}
                        <Cross1Icon
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleTagChange(tag)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <DialogClose asChild>
          <Button type="submit">Thêm mới công việc</Button>
        </DialogClose>
      </form>
    </Form>
  );
}