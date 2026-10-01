// src/common/mockData.js

// Danh sách thể loại mẫu
export const mockCategories = [
  { id: 1, name: "Technology", description: "Tin tức công nghệ, AI, lập trình và chuyển đổi số", status: 1 },
  { id: 2, name: "Business", description: "Kinh tế, khởi nghiệp, tài chính và thị trường", status: 1 },
  { id: 3, name: "Education", description: "Tin tức giáo dục, học bổng, sự kiện học thuật", status: 1 },
  { id: 4, name: "Sports", description: "Thể thao sinh viên và các giải đấu lớn", status: 1 },
  { id: 5, name: "Campus Life", description: "Đời sống sinh viên, câu lạc bộ và hoạt động ngoại khóa", status: 0 }
];

// Danh sách tài khoản mẫu (Role 1: Admin, Role 2: Staff)
export const mockAccounts = [
  {
    id: 1,
    username: "Admin",
    password: "Admin",
    name: "Quản trị viên",
    role: 1
  },
  {
    id: 2,
    username: "Staff",
    password: "Staff",
    name: "Nguyễn Đình Phú",
    role: 2
  }
];

// Danh sách bài viết mẫu (Status 1: Active, Status 0: Inactive)
export const mockNews = [
  {
    id: 1,
    title: "FPT University tổ chức ngày hội Công Nghệ TechDay 2026",
    headline: "Hơn 500 sinh viên tham gia trải nghiệm các công nghệ AI và Robotics mới nhất.",
    content: "Ngày hội TechDay 2026 đã diễn ra vô cùng sôi nổi với sự tham gia của nhiều doanh nghiệp công nghệ hàng đầu và hàng trăm sinh viên tài năng. Các dự án nghiên cứu về AI, IoT và Blockchain đã nhận được đánh giá rất cao từ hội đồng chuyên môn.",
    categoryId: 1,
    categoryName: "Technology",
    authorId: 2,
    authorName: "Nguyễn Đình Phú",
    createdDate: "2026-09-25",
    status: 1,
    image: "https://picsum.photos/seed/techday/600/350"
  },
  {
    id: 2,
    title: "Chung kết Giải Bóng Đá Sinh Viên FPT Cup quy tụ 16 đội bóng",
    headline: "Trận chung kết kịch tính giữa khoa CNTT và Kinh Tế đã cống hiến những bàn thắng đẹp mắt.",
    content: "Trận đấu chung kết FPT Cup đã khép lại với chiến thắng 3-2 nghiêng về đội bóng khoa CNTT. Không khí cổ vũ nồng nhiệt của các bạn sinh viên đã tạo nên một ngày hội thể thao thực sự ý nghĩa và gắn kết tinh thần đoàn kết.",
    categoryId: 4,
    categoryName: "Sports",
    authorId: 2,
    authorName: "Nguyễn Đình Phú",
    createdDate: "2026-09-26",
    status: 1,
    image: "https://picsum.photos/seed/football/600/350"
  },
  {
    id: 3,
    title: "Xu hướng phát triển Web hiện đại với React 19 và Vite",
    headline: "Lập trình viên tối ưu hóa tốc độ tải trang và trải nghiệm người dùng với các Hook mới.",
    content: "React 19 mang đến nhiều cải tiến vượt trội về Server Components và tối ưu hóa xử lý state. Kết hợp cùng Vite, quy trình phát triển ứng dụng Frontend trở nên nhanh chóng và mượt mà hơn bao giờ hết.",
    categoryId: 1,
    categoryName: "Technology",
    authorId: 2,
    authorName: "Nguyễn Đình Phú",
    createdDate: "2026-09-27",
    status: 1,
    image: "https://picsum.photos/seed/reactvite/600/350"
  },
  {
    id: 4,
    title: "Câu lạc bộ Âm Nhạc mở đợt tuyển thành viên mới cho học kỳ Fall",
    headline: "Cơ hội tỏa sáng tài năng nghệ thuật và giao lưu cùng bạn bè tại FPT Campus.",
    content: "CLB Âm Nhạc chính thức khởi động chiến dịch tuyển quân đợt mới. Sinh viên có niềm đam mê với nhạc cụ, ca hát hoặc sản xuất âm nhạc đều có thể đăng ký thử giọng trong tuần này.",
    categoryId: 5,
    categoryName: "Campus Life",
    authorId: 2,
    authorName: "Nguyễn Đình Phú",
    createdDate: "2026-09-28",
    status: 1,
    image: "https://picsum.photos/seed/musicclub/600/350"
  },
  {
    id: 5,
    title: "Bản tin nội bộ: Lên kế hoạch nâng cấp hạ tầng mạng phòng Lab",
    headline: "Dự kiến triển khai nâng cấp trong tháng tới nhằm phục vụ đồ án tốt nghiệp.",
    content: "Phòng CNTT thông báo kế hoạch bảo trì và lắp đặt thiết bị mạng mới tại khu vực phòng thực hành chuyên dụng. Bản tin này đang ở trạng thái xét duyệt lưu nháp.",
    categoryId: 3,
    categoryName: "Education",
    authorId: 2,
    authorName: "Nguyễn Đình Phú",
    createdDate: "2026-09-29",
    status: 0,
    image: "https://picsum.photos/seed/labserver/600/350"
  }
];
