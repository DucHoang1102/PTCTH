/*
Tổng hợp chức năng:
    +, Tham chiếu và tag tham chiếu
    +, Đặt nhãn
    +, Đặt ghi chú
    +, Quản lý thời gian
    +, Chèn vào trước, chèn vào sau
    +, Ẩn hiện (+, -)
    +, Delete
    +, Hiện tên thư mục khi bấm 
    chuột phải
    +, Drad and Drop (Làm sau)
    +, Thùng rác, phục hồi (Làm sau)
    +, Thông báo(Làm sau)
    +, Tìm kiếm (Làm sau)

    Click CT Time tổng, Time đang dùng để cộng time  
    Click CT Liên quan, Ghi chú để thêm tag, note => Thêm kiểu input rồi ấn ok
    Click CT để xóa tag, note => Lập trình 1 nút xóa
    Click CT  View/Hident Folder  
    Click CT nút add folder
    Click CT bật link file

    Hộp thoại cài đặt Time: gồm tất cả
    Hộp thoại tạo tag Liên Quan tham chiếu, danh sách để time chiếu
    Hộp thoại tạo folder
    Hộp thoại tạo file
    Hộp thoại đổi tên folder
    Hộp thoại đổi tên file, link file

    Chức năng chuột phải tất cả đều có:
    Lưu ý hiện tên vùng trên cùng khi bấm chuột phải (this)
        - Delete
        - Rename
        - Thêm folder (thêm vào vùng click)
        - Thêm file (thêm vào vùng click)
        - Tham chiếu tới

*/
$(document).ready(function(){
    var time = {
        timeView: function(total_times, times_spent){
            // Vẽ đường biểu diễn time bằng canvas
            // Đơn vị thời gian sử dụng theo giờ
            // total_times: Tổng số giờ
            // times_spent: Giờ đã dùng
            var $timeView = $('.time-view'); 
            var canvas = $timeView[0];

            // convert giờ sang px: 1h = 1/3px <=> 3h = 1px
            var total_times_px = total_times*(1/3);
            var times_spent_px = times_spent*(1/3);

            // Thuộc tính width of canvas dài thêm 10px để hiển thị đầy đủ
            var width = total_times_px + 10 + 'px';
            $timeView.attr('width',width);

            // Đường bao biểu diễn time - dài thêm 6px
            var frame_wrap = total_times_px + 6;

            // Thay đổi giao diện number time 
            $('span.time .times-total').text(total_times);
            $('span.time .times-spent').text(times_spent);
            $('span.time .times-rest').text(total_times - times_spent);

            // Vẽ khung bao time
            ctx = canvas.getContext('2d');
            ctx.strokeStyle = "#1c75bb";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(frame_wrap,0);
            ctx.lineTo(frame_wrap,16);
            ctx.lineTo(0,16);
            ctx.lineTo(0,0);
            ctx.stroke();
            // Vẽ hình chữ nhật biểu diễn thời gian đã sử dụng
            ctx.fillStyle = "#1c75bb";
            ctx.fillRect(3,3,times_spent_px,10);
        }
    }
    time.timeView(100, 50);

    $('ul li').mousedown(function(event){
        if(event.which == 3){
            var left = event.pageX + 'px';
            var top = event.pageY + 'px';
            $('#mouse-right')
            .css({left: left, top: top})
            .show(200);
        }
        return false;
    })
});
