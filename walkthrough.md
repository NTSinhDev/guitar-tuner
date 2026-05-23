# Walkthrough: PWA Guitar & Ukulele Tuner

Dự án đã hoàn thành với đầy đủ các tính năng cốt lõi, giao diện hiện đại và khả năng hoạt động như một PWA.

## Các thay đổi chính

### 1. Thuật toán Pitch Detection
- **[pitchDetection.ts](file:///c:/Users/SinhDo/.gemini/antigravity/scratch/guitar-tuner/src/utils/pitchDetection.ts)**: Triển khai thuật toán **Auto-correlation** (tự tương quan) để xác định tần số âm thanh từ dữ liệu Microphone một cách chính xác.
- Hỗ trợ tính toán sai số (Cents) để kim chỉ tone hoạt động mượt mà.

### 2. Xử lý âm thanh với React Hook
- **[useAudioPitch.ts](file:///c:/Users/SinhDo/.gemini/antigravity/scratch/guitar-tuner/src/hooks/useAudioPitch.ts)**: Quản lý `AudioContext` và vòng lặp phân tích âm thanh. Xử lý quyền truy cập microphone và cập nhật trạng thái UI.

### 3. Giao diện người dùng (UI)
- **[index.css](file:///c:/Users/SinhDo/.gemini/antigravity/scratch/guitar-tuner/src/index.css)**: Hệ thống design system phong cách Dark Mode, Glassmorphism sang trọng.
- **[TunerDisplay.tsx](file:///c:/Users/SinhDo/.gemini/antigravity/scratch/guitar-tuner/src/components/TunerDisplay.tsx)**: Giao diện kim chỉ tone với hiệu ứng animation mượt mà. Kim sẽ chuyển sang màu xanh lá khi nốt nhạc chuẩn tone.
- **[InstrumentSelector.tsx](file:///c:/Users/SinhDo/.gemini/antigravity/scratch/guitar-tuner/src/components/InstrumentSelector.tsx)**: Cho phép chuyển đổi linh hoạt giữa Guitar và Ukulele.

### 4. Cấu hình PWA
- **[vite.config.ts](file:///c:/Users/SinhDo/.gemini/antigravity/scratch/guitar-tuner/vite.config.ts)**: Tích hợp `vite-plugin-pwa` để ứng dụng có thể cài đặt trên điện thoại và hoạt động offline.

## Kết quả kiểm tra

Ứng dụng đã được kiểm tra trên trình duyệt và hoạt động tốt:
- Giao diện hiển thị đúng thiết kế.
- Nút "Bắt đầu" kích hoạt thành công Microphone và bắt đầu lắng nghe âm thanh.
- Kim chỉ tone phản hồi mượt mà theo trạng thái âm thanh.

![Guitar Tuner Demo](file:///C:/Users/SinhDo/.gemini/antigravity/brain/33579d1c-87ad-46d4-acd7-b255b881daae/guitar_tuner_v2_1778410375382.webp)
*Video ghi lại quá trình kiểm tra ứng dụng trên trình duyệt.*

## Hướng dẫn sử dụng
1. Nhấn nút **Bắt đầu**.
2. Cấp quyền Microphone khi trình duyệt yêu cầu.
3. Chọn nhạc cụ (Guitar/Ukulele).
4. Gảy dây đàn và quan sát kim chỉ trên màn hình.
5. Khi nốt nhạc hiển thị màu xanh và kim chỉ ở giữa, dây đàn đã chuẩn tone.
