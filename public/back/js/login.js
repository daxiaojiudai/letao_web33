$(function () {

    $("#form").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {

            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在2~6位之间'
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },

            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度必须在6~12位之间'
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            },

        }

    });

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                if (info.error == 1000) {
                    $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                    return;
                }
                if (info.error == 1001) {
                    $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                    return;
                }
                if (info.success) {
                    location.href = "index.html";
                    return;
                }
            }
        })
    });

    $('[type="reset"]').on('click', function () {
        $('#form').data("bootstrapValidator").resetForm();
    })



});