# Progressive Web App (PWA) Guitar & Ukulele Tuner

Dự án này nhằm xây dựng một ứng dụng chỉnh âm (Tuner) hỗ trợ Guitar và Ukulele, sử dụng công nghệ Web để có thể cài đặt như một PWA (Progressive Web App). 
Ứng dụng sẽ hoạt động offline, hỗ trợ đa nền tảng và có độ trễ âm thanh thấp nhờ Web Audio API.

## User Review Required
> [!IMPORTANT]
> - Đây là kế hoạch triển khai chi tiết. Bạn vui lòng xem qua các bước thực hiện.
> - Source code gốc của React+Vite đã được tôi khởi tạo thành công tại `C:\Users\SinhDo\.gemini\antigravity\scratch\guitar-tuner`.

## Open Questions
> [!NOTE]
> 1. Hiện tại tôi sẽ tự viết thuật toán **Auto-correlation** (tự tương quan) bằng TypeScript để xác định tần số âm thanh (pitch detection) vì nó hoạt động rất tốt và mượt mà cho các loại đàn dây. Bạn có đồng ý với phương án này không?
> 2. Chúng ta sẽ bắt đầu với **Standard Tuning** (E A D G B E cho Guitar và G C E A cho Ukulele). Bạn có muốn mở rộng hỗ trợ các loại tuning khác sau này không?

## Proposed Changes

### 1. Cài đặt các thư viện cần thiết
- Sử dụng `vite-plugin-pwa` để cấu hình PWA (Service Worker, Manifest) giúp ứng dụng hoạt động offline và cài đặt được vào Home Screen của điện thoại.
- Cài đặt `lucide-react` để sử dụng các icon giao diện hiện đại.

### 2. Xử lý âm thanh (Audio Processing)
#### [NEW] `src/utils/pitchDetection.ts`
- Viết thuật toán Auto-correlation chuyên xử lý mảng Float32Array từ luồng âm thanh để tìm ra tần số (Hz) chính xác.

#### [NEW] `src/hooks/useAudioPitch.ts`
- Một Custom React Hook sử dụng **Web Audio API** (`AudioContext`, `AnalyserNode`) để lấy luồng dữ liệu từ Microphone của thiết bị.
- Tích hợp với `pitchDetection.ts` để chuyển đổi tần số Hz thành các nốt nhạc chuẩn và tính toán sai số (Cents).

### 3. Giao diện người dùng (UI Components)
- Xây dựng giao diện với CSS cơ bản (Vanilla CSS) mang phong cách thiết kế hiện đại, tối màu (Dark mode) sang trọng, kết hợp Glassmorphism.

#### [NEW] `src/components/TunerDisplay.tsx`
- Giao diện chính hiển thị nốt nhạc hiện tại.
- Đồng hồ/Kim chỉ tần số (Dial/Needle) với hiệu ứng animation mượt mà khi kim tiến dần đến vị trí chuẩn (chuyển sang màu xanh khi chuẩn tone).

#### [NEW] `src/components/InstrumentSelector.tsx`
- Nút chuyển đổi mượt mà giữa "Guitar" và "Ukulele". 
- Khi chuyển đổi, ứng dụng sẽ tự động gợi ý các nốt mục tiêu (Target Notes) khác nhau.

#### [MODIFY] `src/App.tsx`
- Lắp ráp các component lại với nhau.
- Quản lý các trạng thái: quyền truy cập micro, trạng thái bật/tắt tuner.

#### [MODIFY] `src/index.css`
- Định nghĩa các biến CSS cho màu sắc (Dark mode UI).
- Cài đặt phông chữ Google Fonts (như Inter hoặc Outfit).
- Thêm các class hiệu ứng cho UI.

### 4. Cấu hình PWA
#### [MODIFY] `vite.config.ts`
- Cấu hình plugin PWA.
- Khai báo file `manifest.webmanifest` để hiển thị Tên ứng dụng, icon ứng dụng trên điện thoại.

### 5. Triển khai (Deployment)
- Sử dụng **Surge** để triển khai nhanh một bản demo trực tuyến (hỗ trợ HTTPS để dùng được Micro và PWA).
- Hướng dẫn cấu hình **Netlify** hoặc **Vercel** để có môi trường production ổn định lâu dài.

## Verification Plan

### Automated Tests
- Chạy ứng dụng trên môi trường phát triển (`npm install` & `npm run dev`).

### Manual Verification
- Cấp quyền truy cập Microphone trên trình duyệt.
- Thử gảy đàn (nếu có sẵn) hoặc phát video đánh đàn để kiểm tra xem kim chỉ có bắt chuẩn xác và mượt mà hay không.
- Thử mô phỏng chế độ cài đặt PWA và chế độ Offline qua Chrome DevTools để xác minh ứng dụng hoạt động không cần mạng.
