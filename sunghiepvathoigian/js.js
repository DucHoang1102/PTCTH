$(document).ready(function(){
    var box = {
        // Quản lý ẩn hiện box
        // Validate dữ liệu nhập vào box
        // Trả về dữ liệu đã được validate
        // Các nút trong box
        create: function(element_list_box){
            // 1, Hiện thị box
            // 2, Sửa box theo tham số truyền vào
            // 3, Tham số element_list_box => Đối tượng chứa các tham số
            // 4, element_list_box = {box_id:'', box_label: '', button1_value: '',
            // button2_value: '', class_input_text_disabled: ''}
            // 5, box_id => Id hộp thoại cần hiển thị,
            // 6, box_label => Nhãn của hộp thoại
            // 7, button1_value, button2_value => Tên nút bấm tươn ứng
            // 8, input_disabled => input cần disabled
            var box_id = element_list_box.box_id;
            var box_label = element_list_box.box_label;
            var button1_value = element_list_box.button1_value;
            var button2_value = element_list_box.button2_value;
            var input_disabled = element_list_box.input_disabled;
            $('#black-background').show();
            $(box_id).find('.label').text(box_label);
            $(box_id).find('.button-style-1').attr({value:button1_value});
            $(box_id).find('.button-style-2').attr({value:button2_value});
            $(box_id).find(input_disabled).attr({disabled:'disabled'});
            $(box_id).show(100);
        },//create

        offBox: function(this_button){
            // Hàm tắt hộp thoại
            // Tham số this là nút click;
            var box = $(this_button).parent();
            $(box).hide(100);
            $('#black-background').hide();
        },//offBox

        clickOff: function(){
            // Nút Hủy tắt hộp thoại chung cho các box
            // Chú ý 2 this khác nhau, this click và this object
            var $this = this;
            $('input.button-style-1').click(function(){
                $this.offBox(this);
            });
        },//clickOff

        clickOkBox: function(){
            var $this = this;
            $('input.button-style-2').click(function(){
                var input_name = $('#b-new-rename-folder .input-text').val();
                var input_time = $('#b-new-rename-folder .time').val();
                folder.folderCreate(input_name);

                //Tắt hộp thoại mỗi lần set xong một item
                $this.offBox(this);
            });
        },//clickOkBox

        view: function(){
            var $this_mouse_right = mouseRight.$this_mouse_right;
            // Click tạo folder
            $('#mouse-right .new-folder').click(function(){
                box.create({box_id: '#b-new-rename-folder', 
                          box_label: 'Tạo thư mục', 
                          button1_value:'Hủy', 
                          button2_value: 'Tạo mới'});
            });

            // Click tạo file
            $('#mouse-right .new-file').click(function(){
                box.create({box_id: '#b-new-rename-file'});
            });

            // Click đổi tên folder
            $('#mouse-right .rename').click(function(){
                alert($this_mouse_right)
                box.create({box_id: '#b-new-rename-folder', 
                          box_label: 'Đổi tên', 
                          button1_value: 'Hủy', 
                          button2_value: 'OK', 
                          input_disabled: '.time'});
            });

            // Click đổi tên file
            $('').click(function(){
                box.create({box_id: '#b-new-rename-file',
                            box_label: 'Đổi tên',
                            button2_value: 'Ok'});
            });

            //Click nút Hủy
            box.clickOff();

            // Click nút ok
            box.clickOkBox();
        },
    };//box

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
            var mouse_right = list_disabled.box_mouse_right;
            var element_disabled = list_disabled.element_disabled;
            var region_disabled = list_disabled.region_disabled;
            var style_disabled = list_disabled.style_disabled;

            for (let region of region_disabled){
                this.click(mouse_right, region, true, element_disabled,
                           style_disabled);
            };
            return this; 
        },

        // Lưu element coppy để xóa 
        list_element_disabled: [],

        $this_mouse_right: '',// Trả về this click chuột phải

        click: function($box_mouse_right, region_click, flag_disabled, 
                        element_disabled, style_disabled){
            // Kích hoạt khi bấm chuột phải
            // id_box_mouse_right => Id hộp thoại chuột phải
            // region_click => Vùng click chuột phải: thẻ, #id, .class, window,
            // flag_disabled => Xác định có disabled hay không
            // element_disabled => Thẻ (item menu) bị disabled
            // style_disabled => Định dạng Css disabled
            //...
            var $box_mouse_right = $box_mouse_right;
            var $this = this;

            $(region_click).contextmenu(function(event){

                for(let element of $this.list_element_disabled){
                    $(element).remove();
                };
                $box_mouse_right.children().show();

                if(flag_disabled == true){
                    // Disable bằng cách coppy một element mới thay thế
                    // element bị disabled. Bấm ra ngoài thì xóa, bấm
                    // vào lại tạo
                    for(let element of element_disabled){
                        let element_new = $(element).clone();
                        $(element).hide();
                        $(element_new).addClass(style_disabled);
                        $(element_new).insertAfter(element);
                        $this.list_element_disabled.push(element_new);
                        $(element_new).click(function(){
                            return false;
                        });
                    };
                };

                // Trả về object vị trí của hộp thoại {}
                var position = $this.mousePosition(event.pageX, event.pageY, 
                                                   $box_mouse_right);

                // Hiện hộp thoại khi click chuột phải
                $box_mouse_right
                .css({left: position.left, top: position.top})
                .show(100);

                //Tắt chuột phải
                $this.mouseOff($box_mouse_right);

                //Lưu this click - element
                $this.this_mouse_right = event.target;

                return false;
            });
            return $this; // CHÚ Ý CÁI NÀY
        },//view
    };//MouseRight

    var totalFunction = {
        create: {
            folder: function(folder_name){
                // Tạo mới folder
                var folder_item = `
                    <li>
                        <ul class="folder">
                            <div class="folder-title">
                                <img class="iconvieworhidden" src="images/subtraction.png" alt="icon view/hidden folder"/>
                                <img class="folder-icon" src="images/folder-close.png" alt="img-folder"/>
                                <span class="folder-name">${folder_name}</span>
                            </div>
                        </ul>
                    </li>
                `;
                 $('wrap').append(folder_item)

            },
            file: function(){
                // Tạo mới file
            },
        },//create
        rename: {

        },//rename
    };// totalFunction

    mouseRight
    .click($('#mouse-right'), 'html')
    .mouseDisabled({
        box_mouse_right: $('#mouse-right'),
        element_disabled: ['#mouse-right .new-file', '#mouse-right .new-folder'],
        region_disabled: ['li .file'],
        style_disabled: 'style-disabled'
    });

    box.view();

    time.timeView(100, 50);
});
