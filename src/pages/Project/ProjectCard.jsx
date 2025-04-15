import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProject } from "@/redux/Project/Project.Action";

const categoryMap = {
  "nha_o": "Công trình nhà ở",
  "cong_nghiep": "Công trình công nghiệp",
  "thuong_mai": "Công trình thương mại"
};

// Danh sách các gradient nhạt đẹp mắt
const gradients = [
  "bg-gradient-to-r from-blue-100 to-indigo-100",
  "bg-gradient-to-r from-purple-100 to-pink-100",
  "bg-gradient-to-r from-green-100 to-emerald-100",
  "bg-gradient-to-r from-yellow-100 to-amber-100",
  "bg-gradient-to-r from-orange-100 to-red-100",
  "bg-gradient-to-r from-rose-100 to-pink-100",
  "bg-gradient-to-r from-cyan-100 to-blue-100",
  "bg-gradient-to-r from-sky-100 to-indigo-100"
];

// Hàm lấy gradient ngẫu nhiên
const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex] || gradients[0]; // Fallback là gradient đầu tiên
};

const ProjectCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // Sử dụng state để lưu giá trị gradient ngẫu nhiên
  const [cardGradient, setCardGradient] = useState(gradients[0]);
  
  // Tạo gradient ngẫu nhiên khi component mount
  useEffect(() => {
    setCardGradient(getRandomGradient());
  }, []);

  const handleDeleteConfirm = () => {
    if (item && item.id) {
      dispatch(deleteProject({ projectId: item.id }));
    }
    setShowDeleteConfirm(false);
  };

  // Nếu không có item, không render gì cả
  if (!item) return null;

  return (
    <>
      <Card className={`p-5 w-full lg:max-w-3xl transition-all duration-300 ${cardGradient} hover:shadow-md border`}>
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-5">
                <h1
                  onClick={() => navigate(`/project/${item.id}`)}
                  className="cursor-pointer font-bold text-lg hover:text-blue-700 transition-colors"
                >
                  {item.name || "Không có tên"}
                </h1>
                <DotFilledIcon />
                <p className="text-sm text-gray-600">
                  {item.category ? (categoryMap[item.category] || item.category) : "Chưa phân loại"}
                </p>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button className="rounded-full" variant="ghost" size="icon">
                      <DotsVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => navigate(`/project/update/${item.id}`)}
                    >
                      Cập nhật
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowDeleteConfirm(true)}>
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <p className="text-gray-700 text-sm">{item.description || "Không có mô tả"}</p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {Array.isArray(item.tags) && item.tags.map((tag, index) => (
              <Badge key={`${tag}-${index}`} variant="outline" className="bg-white bg-opacity-70">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa dự án</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa dự án "{item.name}"? Hành động này không thể hoàn tác.
          </DialogDescription>
          <DialogFooter className="flex justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
