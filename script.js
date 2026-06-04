document.addEventListener("DOMContentLoaded", () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Đóng tất cả các accordion khác (Tùy chọn, nếu muốn chỉ mở 1 cái 1 lúc)
            /*
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });
            */

            // Bật/tắt trạng thái active của header hiện tại
            header.classList.toggle('active');

            // Lấy phần tử nội dung ngay bên dưới
            const content = header.nextElementSibling;

            if (header.classList.contains('active')) {
                // Thêm một giá trị tĩnh lớn (ví dụ 1500px) vì nội dung bên trong chứa thẻ <embed> height 600px
                // scrollHeight có thể không tính toán chính xác ngay lập tức với embed/iframe
                // Tuy nhiên ta tính tổng chiều cao dự kiến: text (~200px) + embed (600px) + padding = ~1000px
                // Đặt max-height 2000px để đảm bảo mở rộng mượt mà và đủ chỗ cho mọi nội dung.
                content.style.maxHeight = "2000px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });
});
