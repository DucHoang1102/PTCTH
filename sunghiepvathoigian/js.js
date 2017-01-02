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

    var mouseRight = {
        click: function(){
            //Click chuột phải hiện ra box menu
            //Hiện ngay tại vị trí bấm
            $('html').contextmenu(function(event){
                var $mouse_right = $('#mouse-right');
                var width_box = $mouse_right.css('width');
                var height_box = $mouse_right.css('height');
                // Cộng thêm 18px padding bao (width:90%)
                width_box = parseInt(width_box.replace('px',''))+18;
                height_box = parseInt(height_box.replace('px',''));

                var width_browser = window.innerWidth;
                var height_browser = window.innerHeight;
                var left = event.pageX;
                var top = event.pageY;

                //Fix chuột phải khi click sát bên phải và dưới
                if((width_browser - left) <= width_box){
                    left = width_browser - width_box;
                }
                if((height_browser - top) <= height_box){
                    top = top - height_box;
                }

                // Hiện hộp thoại khi click chuột phải
                $mouse_right
                .css({left: left, top: top})
                .show(100);

                //Bấm chuột trái ra ngoài,
                //bấm chuột giữa,
                //bấm chuột phải 
                //sẽ tắt menu box
                $('html').mousedown(function(event){
                    if(event.which == 1){
                        $mouse_right.hide();
                    }else if(event.which == 2){
                        $mouse_right.hide();
                    }else if(event.which == 3){
                        $mouse_right.hide();
                    }
                });
                // Cuộn chuột tắt menu box
                $(window).scroll(function(){
                    $mouse_right.hide();
                })
                return false;
            });
        },//click
    }
    mouseRight.click()
});
