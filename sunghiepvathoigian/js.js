/*$(document).ready(function(){
	var canvas = $('#hoang')[0];
	ctx = canvas.getContext('2d');
	ctx.strokeStyle = "#1c75bb";
	ctx.lineWidth = 2;
	ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(300,0);
    ctx.lineTo(300,25);
    ctx.lineTo(0,25);
    ctx.lineTo(0,0);
    ctx.stroke();

    ctx.fillStyle = "#1c75bb";
    ctx.fillRect(5,5,200,15);
});

Time{};
Item{};
Tổng hợp chức năng:
    +, Tham chiếu và tag tham chiếu
    +, Đặt nhãn
    +, Đặt ghi chú
    +, Quản lý thời gian
    +, Chèn vào trước, chèn vào sau
    +, Ẩn hiện (+, -)
    +, Coppy/ Paste
    +, Delete
    +, Thùng rác, phục hồi
    +, Hiện tên thư mục khi bấm 
    chuột phải
    +, Drad and Drop
*/
$(document).ready(function(){
    var time = {
        timeView: function(total_times, times_spent){
            // Vẽ đường biểu diễn time bằng canvas
            // Đơn vị thời gian sử dụng theo giờ
            // total_times: Tổng số giờ
            // times_spent: Giờ đã dùng
            var $timeView = $('#time-view'); 
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
            $('span.time .times-rest').text(total_times - times_spent)

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
            // Vẽ hình chữ nhật biểu diễn thời gian đã dùng
            ctx.fillStyle = "#1c75bb";
            ctx.fillRect(3,3,times_spent_px,10);
        }
    }
    time.timeView(3300, 10);
});
