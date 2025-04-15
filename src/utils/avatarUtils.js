/**
 * Tạo màu background và màu chữ cho avatar dựa trên tên người dùng
 * @param {string} name - Tên người dùng
 * @returns {object} - Object chứa các class cho background và text
 */
export const getAvatarColors = (name) => {
  if (!name) return { bg: "bg-gray-200 !bg-gray-200", text: "text-gray-600" };
  
  // Các cặp màu background-text tương phản tốt và phù hợp với giao diện sáng
  const colorPairs = [
    { bg: "bg-blue-500 !bg-blue-500", text: "text-white" },
    { bg: "bg-green-500 !bg-green-500", text: "text-white" },
    { bg: "bg-purple-500 !bg-purple-500", text: "text-white" },
    { bg: "bg-amber-500 !bg-amber-500", text: "text-white" },
    { bg: "bg-rose-500 !bg-rose-500", text: "text-white" },
    { bg: "bg-cyan-500 !bg-cyan-500", text: "text-white" },
    { bg: "bg-emerald-500 !bg-emerald-500", text: "text-white" },
    { bg: "bg-violet-500 !bg-violet-500", text: "text-white" },
    { bg: "bg-pink-500 !bg-pink-500", text: "text-white" },
    { bg: "bg-indigo-500 !bg-indigo-500", text: "text-white" },
  ];
  
  // Sử dụng mã ASCII của ký tự đầu để chọn màu
  const index = name.charCodeAt(0) % colorPairs.length;
  return colorPairs[index];
};