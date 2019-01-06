
$(function () {

    var currentId;
    var isDelete;

    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                var htmlstr = template('userTpl', info);
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


    // 点击按钮弹出模态框
    $('tbody').on('click', '.btn', function () {
        $('#userModal').modal('show');
        currentId = $(this).parent().data('id');
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    })


    $('#submitBtn').on("click", function () {
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            dataType: 'json',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    $('#userModal').modal('hide');
                    render();
                }
            }
        })
    })





})