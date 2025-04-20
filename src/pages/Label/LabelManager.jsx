import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Import API client thay vì trực tiếp sử dụng axios
import api from "@/Api/api";

// Import icons
import {
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Check,
  X,
  Search,
} from "lucide-react";

const LabelManager = () => {
  const [labels, setLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [error, setError] = useState(null);
  
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Lấy token từ cả Redux và localStorage như trong các action khác
  const token = auth?.jwt || localStorage.getItem("jwt");

  const form = useForm({
    defaultValues: {
      name: "",
      color: "#3b82f6",
      description: "",
      isVisible: true,
    },
  });

  const filteredLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Kiểm tra auth trước khi fetch dữ liệu
    if (token) {
      fetchLabels();
    } else {
      setError("Không thể xác thực. Vui lòng đăng nhập lại.");
    }
  }, [token]); // Phụ thuộc vào token thay vì []

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (title, message, type = "success") => {
    setToastMessage({ title, message, type });
  };

  const fetchLabels = async () => {
    if (!token) {
      setError("Không có token xác thực. Vui lòng đăng nhập lại.");
      return;
    }

    setIsLoading(true);
    try {
      // Sử dụng api client từ redux actions
      const response = await api.get("/api/labels");
      setLabels(response.data);
    } catch (error) {
      console.error("Error fetching labels:", error);
      
      // Xử lý lỗi 401/403 - Unauthorized/Forbidden
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("jwt"); // Xóa token không hợp lệ
      } else {
        setError(`Không thể tải nhãn: ${error.message || "Lỗi không xác định"}`);
      }
      
      showToast("Lỗi", "Không thể tải danh sách nhãn", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const openAddDialog = () => {
    if (!token) {
      showToast("Lỗi", "Bạn cần đăng nhập để thực hiện thao tác này", "error");
      return;
    }
    
    form.reset({
      name: "",
      color: "#3b82f6",
      description: "",
      isVisible: true,
    });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (label) => {
    if (!token) {
      showToast("Lỗi", "Bạn cần đăng nhập để thực hiện thao tác này", "error");
      return;
    }
    
    setSelectedLabel(label);
    form.reset({
      name: label.name,
      color: label.color || "#3b82f6",
      description: label.description || "",
      isVisible: label.isVisible,
    });
    setIsEditDialogOpen(true);
  };

  const onSubmitAdd = async (data) => {
    if (!token || !auth.user) {
      showToast("Lỗi", "Bạn cần đăng nhập để thực hiện thao tác này", "error");
      return;
    }
    
    try {
      // Sử dụng api client từ redux actions
      const response = await api.post(`/api/labels?userId=${auth.user.id}`, data);
      setLabels([...labels, response.data]);
      setIsAddDialogOpen(false);
      showToast("Thành công", "Thêm nhãn mới thành công");
    } catch (error) {
      // Xử lý lỗi 401/403
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("jwt");
      } else {
        showToast("Lỗi", `Không thể thêm nhãn mới: ${error.message || "Lỗi không xác định"}`, "error");
      }
      console.error("Error adding label:", error);
    }
  };

  const onSubmitEdit = async (data) => {
    if (!token) {
      showToast("Lỗi", "Bạn cần đăng nhập để thực hiện thao tác này", "error");
      return;
    }
    
    try {
      const response = await api.put(`/api/labels/${selectedLabel.id}`, data);
      
      setLabels(
        labels.map((label) =>
          label.id === selectedLabel.id ? response.data : label
        )
      );
      setIsEditDialogOpen(false);
      showToast("Thành công", "Cập nhật nhãn thành công");
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("jwt");
      } else {
        showToast("Lỗi", "Không thể cập nhật nhãn", "error");
      }
      console.error("Error updating label:", error);
    }
  };

  const handleDeleteLabel = async (id) => {
    if (!token) {
      showToast("Lỗi", "Bạn cần đăng nhập để thực hiện thao tác này", "error");
      return;
    }
    
    try {
      await api.delete(`/api/labels/${id}`);
      
      setLabels(labels.filter((label) => label.id !== id));
      setShowDeleteConfirm(null);
      showToast("Thành công", "Xóa nhãn thành công");
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("jwt");
      } else {
        showToast("Lỗi", "Không thể xóa nhãn", "error");
      }
      console.error("Error deleting label:", error);
    }
  };

  // Hiển thị lỗi với tùy chọn đăng nhập lại
  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Đã xảy ra lỗi</p>
          <p>{error}</p>
          <div className="mt-3 flex gap-3">
            <button 
              onClick={() => navigate("/")}
              className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
            >
              Quay lại trang chủ
            </button>
            <button 
              onClick={() => {
                // Xóa token và chuyển hướng về trang đăng nhập
                localStorage.removeItem("jwt");
                window.location.href = "/";
              }}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded"
            >
              Đăng nhập lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Toast message */}
      {toastMessage && (
        <div 
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${
            toastMessage.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}
        >
          <h4 className="font-bold">{toastMessage.title}</h4>
          <p>{toastMessage.message}</p>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Quản lý nhãn</h2>
          <div className="flex gap-2">
            <button 
              onClick={fetchLabels} 
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button 
              onClick={openAddDialog}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm nhãn
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Search */}
          <div className="mb-4 relative">
            <div className="absolute left-3 top-3 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm nhãn..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="rounded-md border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Màu</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên nhãn</th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt sử dụng</th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLabels.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="h-24 px-6 py-4 whitespace-nowrap text-center text-gray-500"
                      >
                        Không có nhãn nào được tìm thấy
                      </td>
                    </tr>
                  ) : (
                    filteredLabels.map((label) => (
                      <tr key={label.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: label.color || "#3b82f6" }}
                          ></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{label.name}</td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-gray-500 max-w-[300px] truncate">
                          {label.description || "Không có mô tả"}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-gray-500">
                          {label.usageCount || 0}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                          {label.isVisible ? (
                            <div className="flex items-center text-green-600">
                              <Check className="h-4 w-4 mr-1" /> Hiển thị
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600">
                              <X className="h-4 w-4 mr-1" /> Ẩn
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              className="text-gray-500 hover:text-blue-600"
                              onClick={() => openEditDialog(label)}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="text-gray-500 hover:text-red-600"
                              onClick={() => setShowDeleteConfirm(label)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      {(isAddDialogOpen || isEditDialogOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Dialog Header */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {isAddDialogOpen ? "Thêm nhãn mới" : "Chỉnh sửa nhãn"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Điền thông tin để {isAddDialogOpen ? "thêm" : "cập nhật"} nhãn.
              </p>
            </div>
            
            {/* Dialog Content */}
            <form onSubmit={form.handleSubmit(isAddDialogOpen ? onSubmitAdd : onSubmitEdit)}>
              <div className="p-6 space-y-4">
                {/* Name Field */}
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Tên nhãn
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Nhập tên nhãn"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    {...form.register("name", { required: "Tên nhãn là bắt buộc" })}
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-600 text-sm">{form.formState.errors.name.message}</p>
                  )}
                </div>

                {/* Color Field */}
                <div className="space-y-1">
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                    Màu sắc
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="color-picker"
                      type="color"
                      className="w-12 h-10"
                      {...form.register("color")}
                    />
                    <input
                      id="color"
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      {...form.register("color")}
                    />
                  </div>
                  <p className="text-sm text-gray-500">Chọn màu sắc cho nhãn này</p>
                </div>

                {/* Description Field */}
                <div className="space-y-1">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Mô tả
                  </label>
                  <textarea
                    id="description"
                    placeholder="Mô tả về nhãn này"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    {...form.register("description")}
                  />
                </div>

                {/* Visibility Field */}
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <label htmlFor="isVisible" className="block text-sm font-medium text-gray-700">
                      Hiển thị
                    </label>
                    <p className="text-sm text-gray-500">
                      Nhãn này có hiển thị trong danh sách lọc không
                    </p>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="isVisible"
                      className="sr-only"
                      {...form.register("isVisible")}
                      checked={form.watch("isVisible")}
                      onChange={() => form.setValue("isVisible", !form.watch("isVisible"))}
                    />
                    <label
                      htmlFor="isVisible"
                      className={`block h-6 rounded-full w-12 ${
                        form.watch("isVisible") ? "bg-blue-600" : "bg-gray-300"
                      } cursor-pointer`}
                    >
                      <span
                        className={`block h-5 w-5 mt-0.5 ml-0.5 rounded-full bg-white shadow transform transition-transform ${
                          form.watch("isVisible") ? "translate-x-6" : ""
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Dialog Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => {
                    isAddDialogOpen ? setIsAddDialogOpen(false) : setIsEditDialogOpen(false);
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  {isAddDialogOpen ? "Thêm nhãn" : "Cập nhật"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Xác nhận xóa nhãn
              </h3>
              <p className="text-sm text-gray-500">
                Bạn có chắc chắn muốn xóa nhãn "{showDeleteConfirm.name}"? 
                Hành động này không thể hoàn tác.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Hủy
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                onClick={() => handleDeleteLabel(showDeleteConfirm.id)}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabelManager;