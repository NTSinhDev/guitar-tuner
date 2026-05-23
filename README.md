# 🎸 Antigravity Guitar Tuner

Một ứng dụng chỉnh dây đàn guitar và các nhạc cụ dây trực quan, hiện đại, chính xác cao và mượt mà, hoạt động trực tiếp trên trình duyệt của bạn dưới dạng **Progressive Web App (PWA)**.

👉 **Trải nghiệm trực tuyến tại**: [**https://nts-tunner.surge.sh/**](https://nts-tunner.surge.sh/)
*(Lưu ý: Bạn nên sử dụng giao thức HTTPS để trình duyệt cấp quyền truy cập Microphone).*

---

## ✨ Tính năng nổi bật

- **Chính xác & Nhạy bén**: Sử dụng thuật toán **Autocorrelation (Tự tương quan)** tiên tiến để phân tích tần số âm thanh từ microphone trong thời gian thực.
- **Trực quan & Mượt mà**: Kim chỉ tone (needle dial) và vòng chỉ số được làm mượt bằng thuật toán **Exponential Moving Average (EMA)** giúp giảm nhiễu nhiễu động (jitter), mang lại chuyển động mượt mà và trực quan nhất.
- **Hỗ trợ nhiều Nhạc cụ**:
  - **Guitar** (Standard, Drop D, DADGAD, Half-step Down, Open G...)
  - **Ukulele** (Standard)
  - **Bass** (Standard 4 dây, 5 dây)
  - **Violin** (Standard)
- **Tự phát âm thanh tham chiếu**: Click vào từng khóa đàn (peg) ảo để nghe âm thanh mẫu được tổng hợp trực tiếp từ **Web Audio API** (OscillatorNode).
- **Giao diện Cao cấp**: Phong cách **Dark Mode** hiện đại kết hợp hiệu ứng **Glassmorphism (Kính mờ)** và các dải sáng Neon cyan/blue sang trọng.
- **Hỗ trợ PWA**: Có thể cài đặt trực tiếp lên điện thoại hoặc máy tính như một ứng dụng độc lập với bộ icon được tùy biến chuyên nghiệp, hỗ trợ offline.

---

## 🛠️ Công nghệ sử dụng

- **Frontend Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
- **Audio Processing**: [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) (AnalyserNode, Microphone Stream, OscillatorNode)
- **Styling**: Vanilla CSS (tối ưu hóa tùy biến và hiệu năng render)
- **PWA**: `vite-plugin-pwa` với cấu hình service worker và bộ asset tùy biến đầy đủ (`favicon.svg`, `mask-icon.svg`, `pwa-192x192.png`, `pwa-512x512.png`).
- **Icons**: `lucide-react`

---

## 🚀 Hướng dẫn chạy dự án dưới Local

### 1. Yêu cầu hệ thống
Đảm bảo máy tính của bạn đã cài đặt [Node.js](https://nodejs.org/) (khuyến nghị phiên bản LTS).

### 2. Cài đặt các thư viện phụ thuộc
Mở terminal tại thư mục dự án và chạy lệnh:
```bash
npm install
```

### 3. Khởi chạy môi trường phát triển (Development)
Chạy lệnh sau để khởi động local dev server:
```bash
npm run dev
```
Trình duyệt sẽ tự động mở trang web tại địa chỉ `http://localhost:5173`.

### 4. Build sản phẩm (Production)
Để tối ưu hóa mã nguồn và đóng gói dự án trước khi triển khai:
```bash
npm run build
```
Thư mục chứa sản phẩm hoàn chỉnh sau khi build sẽ là `/dist`.

---

## 🌐 Triển khai (Deployment) lên Surge.sh

Dự án hiện tại được triển khai bằng Surge thông qua các bước sau:

1. Đảm bảo đã chạy build dự án thành công:
   ```bash
   npm run build
   ```
2. Deploy thư mục `dist` lên tên miền tùy chỉnh:
   ```bash
   npx surge dist nts-tuner.surge.sh
   ```

---

## 📝 Giấy phép
Dự án được phân phối dưới giấy phép **MIT**. Bạn hoàn toàn có thể tự do sao chép, chỉnh sửa và đóng góp cho dự án này.

---

*Phát triển bởi **NTSinhDev** với sự hỗ trợ từ trợ lý AI **Antigravity** (Google DeepMind).* 🎸✨
