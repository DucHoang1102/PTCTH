$(document).ready(function(){
    var box = {
        // Quản lý ẩn hiện box
        // Quản lý Các nút trong box: Hủy, OK or Tạo mới
        show: function(box_id){
            // 1, Hiện thị box
            $('#black-background').show();
            $(box_id).show(100);
        },//show

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
                // Nút OK, Tạo mới chung cho các hộp thoại
                // Lấy giá trị và gửi về các hàm tương ứng
                // Hàm tạo folder, tạo file, đổi tên folder
                // đổi tên file
                var $this_box_id = $(this).parent().attr('id');
                var $this_mouse_right = $(mouseRight.$this_mouse_right);
                //var input_name_file = $('input.name-file').val();
                //var input_url_file = $('input.url-file').val();
                
                function createFolderLocation($this_mouse_right){
                    /* 
                    1, Xác định vị trí chứa thư mục dựa vào vị trí click 
                       chuột phải
                    2, $this_mouse_right => đối tượng this jquery ở vị trí 
                       click phải chuột
                    3, element_wrap => Thành phần bao ngoài được return, 
                       thư mục sẽ được tạo trong thành phần này. Đây là đối
                       tượng jquery
                    */
                    var $this_mouse_right = $this_mouse_right;
                    var element_wrap;
                    if($this_mouse_right.attr('class') == 'folder'){
                        element_wrap = $this_mouse_right;
                    }
                    else if($this_mouse_right.attr('class') == 'folder-title'){
                        element_wrap = $this_mouse_right.parent();
                    }
                    else if($this_mouse_right.attr('class') == 'iconvieworhidden'
                           || $this_mouse_right.attr('class') == 'folder-icon'
                           || $this_mouse_right.attr('class') == 'folder-name'){
                        element_wrap = $this_mouse_right.parent().parent();
                    }
                    else{
                        // Ngoài vùng folder ra thì tạo trong $('#wrap').
                        element_wrap = $('#wrap');
                    }
                    return element_wrap;
                };

                if($this_box_id == 'b-new-folder'){
                    let input_name_folder = $('input.name-folder').val();
                    let input_time = parseInt($('input.time').val());

                    if(isNaN(input_time)){
                        // validate dữ liệu, bất kì giá trị nào NaN 
                        // thì gán input_time =0
                        input_time = 0;
                    }

                    //Xác định vị trí chứa folder được tạo;
                    var element_wrap = createFolderLocation($this_mouse_right);

                    // Tạo item folder
                    totalFunction.create.folder(input_name_folder, input_time,
                                                element_wrap);

                } 

                else if($this_box_id == 'b-rename-folder'){
                    alert('b-rename-folder');
                }

                else if($this_box_id == 'b-new-file'){
                    alert('b-new-file');
                }

                else if($this_box_id == 'b-rename-file'){
                    alert('b-rename-file');
                }

                //Tắt hộp thoại mỗi lần set xong một item
                $this.offBox(this);
            });
        },//clickOkBox

        view: function(){
            // Click tạo folder
            $('#mouse-right .new-folder').click(function(){
                box.show('#b-new-folder');
            });

            // Click tạo file
            $('#mouse-right .new-file').click(function(){
                box.show('#b-new-file');
            });

            // Click đổi tên folder or file(chung nút rename)
            $('#mouse-right .rename').click(function(){
                // Xác định chuột phải click vào đâu để hiện box rename 
                // cho phù hợp
                var $this = $(mouseRight.$this_mouse_right);
                if($this.attr('class') == 'file'|| 
                   $this.parent().attr('class') == 'file')
                {
                    box.show('#b-rename-file');
                }
                else{
                    box.show('#b-rename-folder');
                }
            });

            //Click nút Hủy
            box.clickOff();

            // Click nút ok
            box.clickOkBox();
        },
    };//box

    var time = {
        timeView: function(total_times=0, times_spent=0, id_time_view){
            // Vẽ đường biểu diễn time bằng canvas
            // Đơn vị thời gian sử dụng theo giờ
            // total_times: Tổng số giờ
            // times_spent: Giờ đã dùng
            // $time => time cụ thể theo id
            var $time = $('#' + id_time_view);
            var $timeView = $time.find('.time-view');
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
            $time.find('.times-total').text(total_times);
            $time.find('.times-spent').text(times_spent);
            $time.find('.times-rest').text(total_times - times_spent);

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
        none: function(element){
            // Tắt chuột phải trong thành phần được chọn
            // element => Thành phần vô hiệu chuột phải
            $this = this;
            $(element).on('contextmenu', function(){
                return false;
            });
            return $this;
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

            $(region_click).on('contextmenu', function(event){

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
                $this.$this_mouse_right = event.target;

                return false;
            });
            return $this; // CHÚ Ý CÁI NÀY
        },//view
    };//mouseRight

    var totalFunction = {
        create: {
            folder: function(folder_name, time_number, element_wrap){
                // Tạo mới folder vào trong element_wrap
                // Random trong khoảng 99,999,999,999,999
                var id_time_view = Math.floor(Math.random() * 100000000000000);
                id_time_view = id_time_view.toString()
                var folder_item = `
                    <li>
                        <ul class="folder">
                            <div class="folder-title">
                                <img class="iconvieworhidden" src="images/subtraction.png" alt="icon view/hidden folder"/>
                                <img class="folder-icon" src="images/folder-close.png" alt="img-folder"/>
                                <span class="folder-name">${folder_name}</span>
                                <span class="time" id="${id_time_view}">
                                    <canvas class="time-view" height="16px" width="0px"></canvas>
                                    <span class="time-number times-total"></span>
                                    <span class="time-number times-spent"></span>
                                    <span class="time-number times-rest"></span>
                                </span>
                            </div>
                            <div class="folder-title-tag">
                                <div class="lienquan">
                                    <span class="label">Liên quan</span>
                                </div>
                                <hr>
                            <div class="ghichu">
                                <span class="label">Ghi chú</span>
                            </div>
                        </ul>
                    </li>
                `;
                element_wrap.append(folder_item)
                time.timeView(time_number, 0, id_time_view);
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
    })
    .none('.folder-title span.time')
    .none('div.folder-title-tag');

    box.view();

    time.timeView(100, 50, 'duchoang');// demo se xoa sau
});
