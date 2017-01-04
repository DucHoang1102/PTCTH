$(document).ready(function(){
    var box = {
        // Quản lý ẩn hiện box
        // Validate dữ liệu nhập vào box
        // Trả về dữ liệu đã được validate
        view: function(box_id, box_label, button1_value, 
                        button2_value, class_input_text_disabled){
            // Hiện thị box
            // Sửa box theo tham số truyền vào
            // box_id => Id hộp thoại cần hiển thị,
            // box_label => Nhãn của hộp thoại
            // button1_value, button2_value => Tên nút bấm tươn ứng
            // class_input_text_disabled => input cần disabled
            $('#black-background').show();
            $(box_id).find('.label').text(box_label);
            $(box_id).find('.button-style-1').attr({value:button1_value});
            $(box_id).find('.button-style-2').attr({value:button2_value});
            $(box_id).find(class_input_text_disabled).attr({disabled:'disabled'});
            $(box_id).show(100);
        }
    }

    $('#mouse-right .new-folder').click(function(){
        box.view('#b-new-rename-folder', 'Đổi tên', 'Hủy', 'OK', '.time')
    });

    $('#mouse-right .new-file').click(function(){
        box.view('#b-new-rename-file')
    });








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
        },//timeView
    }//Time
    time.timeView(100, 50);

    var mouseRight = {
        mousePosition: function(pageX, pageY, box_mouse_right){
            // Xác định vị trí hộp thoại khi click chuột phải
            // Fix vị trí chuột
            // Nhận vào 3 tham số: pageX - top, pageY - left,
            //box_mouse_right: hộp thoại chuột phải đã xây dựng
            //từ trước
            // Trả về 2 giá trị top, left chuẩn đã được fix
            // 18px cộng thêm là chiều rộng thanh cuộn scroll
            var left = pageX;
            var top = pageY;
            var $box_mouse_right = box_mouse_right;
            var width_box = parseInt($box_mouse_right.css('width').replace('px',''))+18;
            var height_box = $box_mouse_right.css('height').replace('px','');
            var width_browser = window.innerWidth;
            var height_browser = (window.innerHeight);

            //Khi click sát bên phải
            if((width_browser - left) <= width_box){
                left = width_browser - width_box;
            }
            // Khi click sát xuống dưới
            if((height_browser - top) <= height_box){
                top = top - height_box;
            }
            return {left: left, top: top};
        },//mousePosition

        mouseOff: function(box_mouse_right){
            // Tắt chuột phải khi:
            // 1, click chuột trái ra ngoài
            // 2, Khi click chuột phải
            // 3, Khi scroll thanh cuộn
            var $box_mouse_right = box_mouse_right;
            $('html').click(function(){
                $box_mouse_right.hide();
                return false;
            });
            $('html').mousedown(function(event){
                if (event.which == 3){
                    $box_mouse_right.hide();
                    return false;
                }
            });
            $(window).scroll(function(){
                $box_mouse_right.hide();
                return false;
            });
        },

        mouseDisabled: function(list_disabled){
            /*this.mouseDisabled() hàm tạo vô hiệu hóa cho các thành phần
              menu chuột phải (Không thể click)*/
            /* 
            list_disabled = {box_mouse_right:'#abc',element_disabled: [], 
            region_disabled:[], style_disabled:[]};
            1, box_mouse_right => Id hộp thoại chuột phải
            1, element_disabled => Thành phần bị disabled trong menu phải. Giá tri
            Array các thành phần.VD: ['.new-folder', '.new-file']
            2, region_disabled => Vùng khi click chuột phải vào đó thành phần bị
            disabled. Giá trị Array các vùng.
            style_disabled => Style css của thành phần bị disabled. Giá trị 1 class
            css.
            */
            this.flagDisabled = true; // Kích hoạt disabled
            var $box_mouse_right = list_disabled.box_mouse_right;
            var element_disabled = list_disabled.element_disabled;
            var region_disabled = list_disabled.region_disabled;
            var style_disabled = list_disabled.style_disabled;

            for (region of region_disabled){
                this.click($box_mouse_right,region, true, element_disabled,
                           style_disabled);
            }; 
        },

        click: function(box_mouse_right, region_click, flag_disabled, 
                        element_disabled,style_disabled){
            // Kích hoạt khi bấm chuột phải
            // id_box_mouse_right => Id hộp thoại chuột phải
            // region_click => Vùng click chuột phải: thẻ, #id, .class, window,
            //...
            // style_disabled => Chỉ dùng cho trường hợp disabled thành phần
            var $box_mouse_right = box_mouse_right;
            var $this = this;
            
            function mouseRightClick(event){
                // Hàm này được kích hoạt khi bấm chuột phải
                var position = $this.mousePosition(event.pageX, event.pageY, 
                                                   $box_mouse_right);

                // Hiện hộp thoại khi click chuột phải
                box_mouse_right
                .css({left: position.left, top: position.top})
                .show(100);

                //Tắt chuột phải
                $this.mouseOff(box_mouse_right);
                return false;
            }

            $(region_click).contextmenu(function(event){
                if(flag_disabled == true){
                    for(var element of element_disabled){
                        $(element).addClass(style_disabled);
                    };
                }
                // Bắt sự kiện chuột phải
                return mouseRightClick(event);
            });
            return $this; // CHÚ Ý CÁI NÀY
        },//view
    };//demoMouseRight

    mouseRight
    .click($('#mouse-right'), 'html')
    .mouseDisabled({
        box_mouse_right: ['#mouse-right'],
        element_disabled: ['#mouse-right .new-file', '#mouse-right .new-folder'],
        region_disabled: ['li .file'],
        style_disabled: 'style-disabled'
    });
});
