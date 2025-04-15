/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import { getAvatarColors } from "@/utils/avatarUtils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserList from "./UserList";
import { useDispatch } from "react-redux";
import { deleteIssue } from "@/redux/Issue/Issue.action";
import { useNavigate, useParams } from "react-router-dom";

const IssueCard = ({ item }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleDelete = () => {
    dispatch(deleteIssue(item.id));
  };
  
  // Lấy chữ cái đầu và màu tương ứng
  const firstLetter = item.assignee?.fullName ? item.assignee.fullName[0].toUpperCase() : "";
  const { bg, text } = getAvatarColors(firstLetter);

  return (
    <Card className="rounded-md py-1 pb-2">
      <CardHeader className="py-0 pb-1">
        <div className="flex justify-between items-center">
          <CardTitle
            className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => navigate(`/project/${id}/issue/${item.id}`)}
          >
            {item.title}
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="rounded-full focus:outline-none"
                variant="ghost"
                size="icon"
              >
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => navigate(`/project/${id}/issue/${item.id}`)}
              >
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">
                <Avatar className="h-8 w-8 transition-all duration-300 hover:ring-2 hover:ring-offset-2 hover:ring-blue-400">
                  <AvatarFallback className={`font-semibold ${bg} ${text}`}>
                    {firstLetter || <PersonIcon className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <UserList issueDetails={item} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
