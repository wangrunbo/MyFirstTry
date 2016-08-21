/**
 * Created by oujunhaku on 16/08/19.
 */
$(function () {
    // click submit button
    $("#register-submit").click(function () {

        // input fields
        var emailField = $("#email");
        var nameField = $("#name");
        var pwdField = $("#pwd");
        var pwdConfirmField = $("#pwd-confirm");
        var genderField = $("#gender");
        var telField = $("#tel");
        var captchaField = $("#captcha");

        // Regular Expression
        var patterns = {};

        patterns.email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        // patterns.password = ;
        // patterns.tel = ;


        // validate input fields
        if (emailField.val()==""){
            emailField.parent().parent().find("td:eq(1)").text(" ❌ 请输入有效邮箱");
            emailField.parent().parent().find("td:eq(1)").css("color", "red")
        }
        if (nameField.val()==""){
            nameField.parent().parent().find("td:eq(1)").text(" ❌ 请输入您的姓名");
            nameField.parent().parent().find("td:eq(1)").css("color", "red")
        }
        if (pwdField.val()==""){
            pwdField.parent().parent().find("td:eq(1)").text(" ❌ 请设置登录密码");
            pwdField.parent().parent().find("td:eq(1)").css("color", "red")
        }
        if (pwdConfirmField.val()==""){
            pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 请再次输入密码");
            pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red")
        }
        if (!$("#gender0").is(":checked") && !$("#gender1").prop("checked")){
            genderField.parent().parent().find("td:eq(1)").text(" ❌ 请选择您的性别");
            genderField.parent().parent().find("td:eq(1)").css("color", "red")
        }
        if (telField.val()==""){
            telField.parent().parent().find("td:eq(1)").text(" ❌ 请输入您的电话号码");
            telField.parent().parent().find("td:eq(1)").css("color", "red")
        }
        if (captchaField.val()==""){
            captchaField.parent().parent().find("td:eq(1)").text(" ❌ 验证码不能为空");
            captchaField.parent().parent().find("td:eq(1)").css("color", "red")
        }

    })
});