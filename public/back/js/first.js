$(function () {

    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                var htmlstr = template('firstTpl', info);
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

    $('#addBtn').on('click', function () {
        $('#firstModal').modal('show');
    })


    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类名称"
                    }
                }
            }
        }
    });


    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            dataType: 'json',
            data: $('#form').serialize(),
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $('#firstModal').modal('hide');
                    currentPage = 1;
                    render();
                    // 重置表单
                    $('#form').data("bootstrapValidator").resetForm(true);
                }
            }
        })
    });



})