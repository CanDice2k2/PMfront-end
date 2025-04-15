import { ScrollArea } from "@/components/ui/scroll-area";
import { IssueList } from "../Issue/IssueList";
import ChatBox from "./ChatBox";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchProjectById,
  inviteToProject,
} from "@/redux/Project/Project.Action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Loader from "../Loader/Loader";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import InviteUserForm from "./InviteUserForm";
import { getAvatarColors } from "@/utils/avatarUtils";

const categoryMap = {
  "nha_o": "Công trình nhà ở",
  "cong_nghiep": "Công trình công nghiệp",
  "thuong_mai": "Công trình thương mại"
};

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { project, auth } = useSelector((store) => store);
  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);

  const handleProjectInvitation = () => {
    dispatch(inviteToProject({ email: "", projectId: id }));
  };
  
  return (
    <>
      {!project.loading ? (
        <div className="mt-5 lg:px-10">
          <div className="lg:flex gap-5 justify-between pb-4">
            <ScrollArea className="h-screen lg:w-[69%] pr-2">
              <div className="text-gray-800 pb-10 w-full">
                <h1 className="text-lg font-semibold pb-5 text-gray-800">
                  {project.projectDetails?.name}
                </h1>

                <div className="space-y-5 pb-10">
                  <p className="w-full md:max-w-lg lg:max-w-xl text-gray-700">
                    {project.projectDetails?.description}
                  </p>
                  <div className="flex">
                    <p className="w-36 text-gray-700">Trưởng dự án : </p>
                    <p className="text-gray-800">{project.projectDetails?.owner?.fullName}</p>
                  </div>
                  <div className="flex">
                    <p className="w-36 text-gray-700">Thành viên : </p>
                    <div className="flex items-center gap-2">
                      {project.projectDetails?.team.map((item) => {
                        const firstLetter = item.fullName[0]?.toUpperCase() || "";
                        const { bg, text } = getAvatarColors(firstLetter);
                        
                        return (
                          <Avatar className={`cursor-pointer h-8 w-8 transition-all duration-300 hover:ring-2 hover:ring-offset-2 hover:ring-blue-400`} key={item.id || item.email}>
                            <AvatarFallback className={`font-semibold ${bg} ${text}`}>
                              {firstLetter}
                            </AvatarFallback>
                          </Avatar>
                        );
                      })}
                    </div>

                   {auth.user?.id===project.projectDetails?.owner.id && <Dialog>
                      <DialogTrigger>
                      <DialogClose>
                        <Button
                          size="sm"
                          variant="outline"
                          className="ml-2"
                          onClick={handleProjectInvitation}
                        >
                          {" "}
                          <span className="pr-1">Mời</span>
                          <PlusIcon className="w-3 h-3" />
                        </Button>
                      </DialogClose>
                        
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Mời thành viên vào dự án</DialogTitle>
                         
                        </DialogHeader>
                        <InviteUserForm projectId={id}/>
                      </DialogContent>
                    </Dialog>}
                  </div>
                  <div className="flex">
                    <p className="w-36 text-gray-700">Danh mục : </p>
                    <p className="text-gray-800">{categoryMap[project.projectDetails?.category] || project.projectDetails?.category}</p>
                  </div>
                  <div className="flex">
                    <p className="w-36 text-gray-700">Trạng thái : </p>
                    <Badge className={`bg-orange-300`}>Đang hoạt động</Badge>
                  </div>
                </div>

                <section>
                  <p className="py-5 border-b text-lg tracking-wider text-gray-800">Công việc</p>
                  <div className="lg:flex md:flex gap-3 justify-between py-5">
                    {/* Thêm màu đỏ nhạt cho pending */}
                    <IssueList 
                      status="pending" 
                      title="Việc cần làm" 
                      headerClassName="bg-red-50 border-red-200 text-red-700"
                      containerClassName="border border-red-100 rounded-lg"
                    />

                    {/* Thêm màu xanh dương nhạt cho in_progress */}
                    <IssueList 
                      status="in_progress" 
                      title="Đang thực hiện" 
                      headerClassName="bg-blue-50 border-blue-200 text-blue-700"
                      containerClassName="border border-blue-100 rounded-lg"
                    />

                    {/* Thêm màu xanh lục nhạt cho done */}
                    <IssueList 
                      status="done" 
                      title="Đã xong" 
                      headerClassName="bg-green-50 border-green-200 text-green-700"
                      containerClassName="border border-green-100 rounded-lg"
                    />
                  </div>
                </section>
              </div>
            </ScrollArea>

            <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
              <ChatBox />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default ProjectDetails;
