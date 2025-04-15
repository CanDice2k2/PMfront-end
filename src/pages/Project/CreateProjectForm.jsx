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
import { array, object, string } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "@/redux/Project/Project.Action";
import { DialogClose } from "@/components/ui/dialog";
import { tags } from "./filterData";

const formSchema = object({
  name: string().min(1),
  description: string().min(1),
  category: string().min(1),
  tags: array(string()),
});
const CreateProjectForm = () => {
  const dispatch = useDispatch();
  const { auth,subscription } = useSelector((store) => store);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });
  const handleTagsChange = (newValue) => {
    const currentTags = form.getValues("tags");

    const updatedTags = currentTags.includes(newValue)
      ? currentTags.filter((tag) => tag !== newValue)
      : [...currentTags, newValue];

    console.log("updated Tags ", updatedTags);

    form.setValue("tags", updatedTags);
  };

  const onSubmit = (data) => {
    dispatch(createProject(data));
    console.log("Create project", data);
  };

  console.log((subscription.userSubscription?.planType === "Free"))
  console.log(auth.user?.projectSize >= 3)
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Tên dự án"
                  />
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
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Mô tả dự án"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                      // defaultValue="fullstack"
                    // defaultValue="nha_o"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nha_o">Công trình nhà ở</SelectItem>
                      <SelectItem value="cong_nghiep">Công trình công nghiệp</SelectItem>
                      <SelectItem value="thuong_mai">Công trình thương mại</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
            name={"tags"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      handleTagsChange(value);
                      console.log("value", field);
                    }}
                    multiple
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Nhãn" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="flex gap-1 flex-wrap">
                  {field.value.map((item) => (
                    <div
                      onClick={() => handleTagsChange(item)}
                      key={item}
                      className="cursor-pointer flex rounded-full items-center border gap-2 px-4 py-1"
                    >
                      <span className="text-sm">{item}</span>
                      <Cross1Icon className="h-3 w-3" />
                    </div>
                  ))}
                </div>

                <FormMessage />
              </FormItem>        
            )}
          />
          <DialogClose>
            {/* {(subscription.userSubscription?.planType === "FREE" &&
            auth.projectSize >= 3) ? (
              <div className="py-3">
                <p className="text-red-500">you can create only 3 project with free plan, please upgrade your plan</p>
              </div>
              
            ) : ( */}
              <Button type="submit" className="w-full  py-5">
                Tạo dự án
              </Button>
            {/* )} */}
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
