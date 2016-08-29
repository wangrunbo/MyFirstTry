/**
 * Created by wangrunbo on 16/08/28.
 */
$(function () {
    //submit to login
    $("#login-sub").click(function () {
        var u = $("#u").val();
        var p = $("#p").val();
        var alertField = $("#login-alert");

        if (u == ""){
            alertField.text("! 邮箱不能为空");
        }else if (p == ""){
            alertField.text("! 密码不能为空");
        }else {
            $.post(
                "/login",
                {u: u, p: p},
                function (result) {
                    /**
                     * @param result: Login error result.
                     * @result Email not exist: {result: 0},
                     * @result Password incorrect: {result: 1},
                     * @result Email is empty: {result: 2},
                     * @result Password is empty: {result: 3};
                     */
                    if (result.result == 0){
                        alertField.text("! 该邮箱尚未被注册");
                    }else if (result.result == 1){
                        alertField.text("! 登录密码错误");
                    }else if (result.result == 2){
                        alertField.text("! 邮箱不能为空");
                    }else if (result.result == 3){
                        alertField.text("! 密码不能为空");
                    }else {
                        // alert(document.referrer);
                        window.location.href = document.referrer;
                    }
                }
            )
        }
    })
});