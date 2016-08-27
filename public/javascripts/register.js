/**
 * Created by oujunhaku on 16/08/19.
 */
$(function () {

    var pass = [0, 0, 0, 0, 0, 0];

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
    patterns.password = /^[a-zA-Z0-9]{8,16}$/;
    patterns.tel = /^(13[0-9]|14[5|7]|15[0-3|5-9]|18[0-3|5-9])\d{8}|\d{3}-\d{4}-\d{4}$/;

    // click submit button
    $("#register-submit").click(function () {

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
            telField.parent().parent().find("td:eq(1)").text(" ❌ 请输入您的手机号码");
            telField.parent().parent().find("td:eq(1)").css("color", "red")
        }
        if (captchaField.val()==""){
            captchaField.parent().parent().find("td:eq(1)").text(" ❌ 验证码不能为空");
            captchaField.parent().parent().find("td:eq(1)").css("color", "red")
        }

        if (pass.indexOf(0) == -1){
            $("#register").submit();
        }

    });

    // validate input fields
    emailField.blur(function () {
        if(emailField.val() != ""){
            if (!patterns.email.test(emailField.val())){
                emailField.parent().parent().find("td:eq(1)").text(" ❌ 邮箱格式错误");
                emailField.parent().parent().find("td:eq(1)").css("color", "red");
                pass[0] = 0;
            }else{
                emailField.parent().parent().find("td:eq(1)").text(" √");
                emailField.parent().parent().find("td:eq(1)").css("color", "green");
                pass[0] = 1;
            }
        }else{
            pass[0] = 0;
        }
    });

    nameField.blur(function () {
        if (nameField.val() != ""){
            nameField.parent().parent().find("td:eq(1)").text(" √");
            nameField.parent().parent().find("td:eq(1)").css("color", "green");
            pass[1] = 1;
        }else{
            pass[1] = 0;
        }
    });

    pwdField.blur(function () {
        if (pwdField.val() != ""){
            if (pwdConfirmField.val() != "" && pass[3] == 1){
                if (pwdConfirmField.val() != pwdField.val()){
                    pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 两次输入的密码不一致");
                    pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red");
                    pass[3] = 0;
                }
            }
            if (!patterns.password.test(pwdField.val())){
                pwdField.parent().parent().find("td:eq(1)").text(" ❌ 密码只能由8~16位字母及数字组成");
                pwdField.parent().parent().find("td:eq(1)").css("color", "red");
                pass[2] = 0;
            }else{
                pwdField.parent().parent().find("td:eq(1)").text(" √");
                pwdField.parent().parent().find("td:eq(1)").css("color", "green");
                pass[2] = 1;
            }
        }else{
            pass[2] = 0;
        }
    });

    pwdConfirmField.blur(function () {
        if (pass[2] == 1){
            if (pwdConfirmField.val() != ""){
                if (pwdConfirmField.val() != pwdField.val()){
                    pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 两次输入的密码不一致");
                    pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red");
                    pass[3] = 0;
                }else{
                    pwdConfirmField.parent().parent().find("td:eq(1)").text(" √");
                    pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "green");
                    pass[3] = 1;
                }
            }else{
                pass[3] = 0;
            }
        }else{
            pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 密码只能由8~16位字母及数字组成");
            pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red");
            pass[3] = 0;
        }
    });

    genderField.change(function () {
        pass[4] = 1;
    });

    telField.blur(function () {
        if (telField.val() != ""){
            if (!patterns.tel.test(telField.val())){
                telField.parent().parent().find("td:eq(1)").text(" ❌ 请输入正确的手机号码");
                telField.parent().parent().find("td:eq(1)").css("color", "red");
                pass[5] = 0;
            }else{
                telField.parent().parent().find("td:eq(1)").text(" √");
                telField.parent().parent().find("td:eq(1)").css("color", "green");
                pass[5] = 1;
            }
        }else{
            pass[5] = 0;
        }
    })
});