/* eslint-disable no-unused-vars */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CreateCommentForm } from "./CreateCommentForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CommentCard from "./CommentCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, updateIssueStatus } from "@/redux/Issue/Issue.action";
import { useParams } from "react-router-dom";
import { fetchComments } from "@/redux/Comment/comment.action";
import { Badge } from "@/components/ui/badge";
import { getAvatarColors } from "@/utils/avatarUtils";
import { CalendarIcon, CheckIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

const priorityLabels = {
  cao: "Cao",
  trung_binh: "Trung bình",
  thap: "Thấp"
};

const priorityColors = {
  cao: "bg-red-100 text-red-700 border-red-200",
  trung_binh: "bg-amber-100 text-amber-700 border-amber-200",
  thap: "bg-blue-100 text-blue-700 border-blue-200"
};

const statusLabels = {
  pending: "Việc cần làm",
  in_progress: "Đang thực hiện",
  done: "Đã xong"
};

const statusColors = {
  pending: "bg-red-100 text-red-700",
  in_progress: "bg-amber-100 text-amber-700",
  done: "bg-green-100 text-green-700"
};

const IssueDetails = () => {
  const { issueId } = useParams();
  const dispatch = useDispatch();
  const { issue, comment } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
  }, []);
  
  const handleUpdateIssueStatus = (value) => {
    dispatch(updateIssueStatus({ id: issueId, status: value }));
  };

  // Lấy thông tin người giao việc nếu có
  const assigneeFirstLetter = issue.issueDetails?.assignee?.fullName?.[0]?.toUpperCase();
  const avatarColors = assigneeFirstLetter ? getAvatarColors(assigneeFirstLetter) : { bg: "", text: "" };

  // Format dueDate để hiển thị
  const formattedDueDate = issue.issueDetails?.dueDate ? 
    format(new Date(issue.issueDetails.dueDate), 'dd/MM/yyyy') : null;

  return (
    <div className="px-20 py-8 text-gray-700">
      <div className="flex justify-between border p-10 rounded-lg">
        <ScrollArea className="h-[80vh] w-[60%] ">
          <div className="">
            <h1 className="text-lg font-bold text-gray-800">
              {issue.issueDetails?.title}
            </h1>

            <div className="py-5">
              <h2 className="font-semibold text-gray-800">Mô tả</h2>
              <p className="text-gray-700 text-sm mt-3">
                {issue.issueDetails?.description}
              </p>
            </div>
            <div className="mt-5">
              <h1 className="pb-3 text-gray-800 font-semibold">Hoạt động</h1>
              <Tabs defaultValue="comments" className="w-[400px]">
                <TabsList className="mb-5">
                  <TabsTrigger value="comments">Bình Luận</TabsTrigger>
                </TabsList>
                <TabsContent value="comments">
                  <CreateCommentForm issueId={issueId} />
                  <div className="mt-8 space-y-6">
                    {comment.comments.map((item, index) => (
                      <CommentCard item={item} key={index} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full lg:w-[30%] space-y-2">
          <Select 
            onValueChange={handleUpdateIssueStatus}
            defaultValue={issue.issueDetails?.status}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={"Trạng thái công việc"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Việc cần làm</SelectItem>
              <SelectItem value="in_progress">Đang thực hiện</SelectItem>
              <SelectItem value="done">Đã xong</SelectItem>
            </SelectContent>
          </Select>

          <div className="border rounded-lg">
            <p className="border-b py-3 px-5 font-medium text-gray-800">Chi tiết</p>

            <div className="p-5">
              <div className="space-y-7">
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem] text-gray-700">Người giao</p>
                  {issue.issueDetails?.assignee ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 text-xs">
                        <AvatarFallback className={`${avatarColors.bg} ${avatarColors.text}`}>
                          {assigneeFirstLetter}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-gray-800">{issue.issueDetails?.assignee?.fullName}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Chưa phân công</p>
                  )}
                </div>

                {/* Mức độ ưu tiên */}
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem] text-gray-700">Ưu tiên</p>
                  {issue.issueDetails?.priority ? (
                    <Badge className={`px-2 py-0.5 ${priorityColors[issue.issueDetails.priority]}`}>
                      {priorityLabels[issue.issueDetails.priority]}
                    </Badge>
                  ) : (
                    <p className="text-gray-500">-</p>
                  )}
                </div>

                {/* Nhãn */}
                <div className="flex gap-10 items-start">
                  <p className="w-[7rem] text-gray-700 mt-1">Nhãn</p>
                  <div className="flex flex-wrap gap-2">
                    {issue.issueDetails?.tags && issue.issueDetails.tags.length > 0 ? (
                      issue.issueDetails.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 border"
                        >
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">Không có nhãn</p>
                    )}
                  </div>
                </div>

                {/* Trạng thái */}
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem] text-gray-700">Trạng thái</p>
                  {issue.issueDetails?.status ? (
                    <Badge
                      className={`px-2 py-0.5 ${statusColors[issue.issueDetails.status]}`}
                    >
                      {statusLabels[issue.issueDetails.status]}
                    </Badge>
                  ) : (
                    <p className="text-gray-500">-</p>
                  )}
                </div>

                {/* Ngày hạn */}
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem] text-gray-700">Hạn chót</p>
                  {formattedDueDate ? (
                    <div className="flex items-center gap-2 text-gray-800">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <span>{formattedDueDate}</span>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Chưa đặt hạn</p>
                  )}
                </div>

                {/* Dự án */}
                {/* <div className="flex gap-10 items-center">
                  <p className="w-[7rem] text-gray-700">Dự án</p>
                  {issue.issueDetails?.project ? (
                    <div 
                      className="text-blue-600 hover:underline cursor-pointer font-medium"
                      onClick={() => navigate(`/project/${issue.issueDetails.project.id}`)}
                    >
                      {issue.issueDetails.project.name}
                    </div>
                  ) : (
                    <p className="text-gray-500">-</p>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
