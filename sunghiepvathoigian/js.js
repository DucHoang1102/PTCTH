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
    $('ul, li, div, a, img').addClass('xoaborder')
});
