$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function() {
    // 模拟网络延迟
    setTimeout(function() {
      // 结束进度条
      NProgress.done();
    }, 500);
});

$(function () {
    
    $('.lt_aside .category').on("click", function () {
        $(this).next().stop().slideToggle();
    });

    $('.icon-menu').on("click", function () {
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
    });

    $('.icon-logout').on('click', function () {
        $('#logoutModal').modal("show");
    });

    $('#logoutBtn').on('click', function () {
        $.ajax({
            type: 'get',
            url: "/employee/employeeLogout",
            dataType: 'json',
            success: function (info) {
                if (info.success) {
                    location.href = 'login.html';
                }
            }
        })
    })

})