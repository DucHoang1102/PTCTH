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
        timeView: function(total_hours, hours_spent){
            // Vẽ đường biểu diễn time bằng canvas
            // Đơn vị thời gian sử dụng theo giờ
            // total_hours: Tổng số giờ
            // hours_spent: Giờ đã dùng
            var $timeView = $('#time-view'); 
            var canvas = $timeView[0];

            // convert giờ sang px: 1h = 1/3px <=> 3h = 1px
            var total_hours_px = total_hours*(1/3);
            var hours_spent_px = hours_spent*(1/3);

            // Thuộc tính width of canvas dài thêm 10px để hiển thị đầy đủ
            var width = total_hours_px + 10 + 'px';
            $timeView.attr('width',width)

            // Đường bao biểu diễn time - dài thêm 6px
            var frame_wrap = total_hours_px + 6;

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
            ctx.fillRect(3,3,hours_spent_px,10);
        }
    }
    time.timeView(500, 500);
});
