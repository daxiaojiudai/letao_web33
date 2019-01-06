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
                console.log(info);
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


    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text();
        $('#dropdownText').text(txt);
    })


    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            console.log(data);
            var picURL = data.result.picAddr;
            $('#imgBox img').attr('src', picURL);
        }
    });

    // $('#submitBtn').on('click', function () {
    //     $("#form").bootstrapValidator({
    //         feedbackIcons: {
    //             valid: 'glyphicon glyphicon-ok',
    //             invalid: 'glyphicon glyphicon-remove',
    //             validating: 'glyphicon glyphicon-refresh'
    //         },
    //         fields: {
    //             categoryName: {
    //                 validators: {
    //                     notEmpty: {
    //                         message: "请输入二级分类名称"
    //                     }
    //                 }
    //             }
    //         }
    //     });
    
    //     $("#form").on('success.form.bv', function (e) {
    //         e.preventDefault();
    //         $.ajax({
    //             type: 'post',
    //             url: '/category/addSecondCategory',
    //             dataType: 'json',
    //             data: $('#form').serialize(),
    //             success: function (info) {
    //                 console.log(info);
    //                 if (info.success) {
    //                     $('#secondModal').modal('hide');
    //                     currentPage = 1;
    //                     render();
    //                     // 重置表单
    //                     $('#form').data("bootstrapValidator").resetForm(true);
    //                 }
    //             }
    //         })
    //     });
    // })

    



})