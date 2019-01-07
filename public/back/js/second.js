$(function () {

    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                var htmlstr = template('secondTpl', info);
                $('tbody').html(htmlstr);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }


    // 2. 点击添加按钮, 显示添加模态框
    $('#addBtn').on('click', function () {
        $('#secondModal').modal('show');
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                var htmlstr = template('dropdownTpl', info);
                $('.dropdown-menu').html(htmlstr);
            }
        })
    });


    // 3. 给所有的下拉菜单的 a 添加点击事件 (通过事件委托)
    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text();
        $('#dropdownText').text(txt);
        var id = $(this).data('id');
        $('[name="categoryId"]').val(id);
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");

    })


    // 4. 配置fileupload进行初始化
    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            // console.log(data);
            var picURL = data.result.picAddr;
            $('#imgBox img').attr('src', picURL);
            $('[name="brandLogo"]').val(picURL);
            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });



    // 5. 添加表单校验
    $('#form').bootstrapValidator({
        // 配置不校验的类型, 对 hidden 需要进行校验
        excluded: [],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',   // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            },
        }
    });



    // 6. 注册表单校验成功事件, 阻止默认的提交, 通过ajax提交
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            dataType: 'json',
            data: $('#form').serialize(),
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    $('#secondModal').modal('hide');
                    currentPage = 1;
                    render();
                    $('#form').data('bootstrapValidator').resetForm(true);
                    $('#dropdownText').text('请选择一级分类');
                    $('#imgBox img').attr('src', "./images/none.png")
                }
            }
        })
    })





})