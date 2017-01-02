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

    $('#clickthu').click(function(){
        $('<div></div>')
        .appendTo('body')
        .css({width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)',
              position:'fixed', top: '0px', left: '0px'})
    });
});
