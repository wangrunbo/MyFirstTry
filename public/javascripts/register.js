/**
 * Created by oujunhaku on 16/08/19.
 */
$(function () {
    /**
     * register submit validate
     * @param pass[email, name, pwd, pwd-confirm, gender, tel]
     */
    var pass = [0, 0, 0, 0, 0, 0];

    // input fields
    var emailField = $("#email");
    var nameField = $("#name");
    var pwdField = $("#pwd");
    var pwdConfirmField = $("#pwd-confirm");
    var genderField = $("#gender");
    var birthdayField = $("#birthday");
    var telField = $("#tel");
    var captchaField = $("#captcha");
    var policy = $("#policy");
    var submit = $("#register-submit");

    //check policy
    policy.change(function () {
        if (policy.is(":checked")){
            submit.attr("disabled", false)
        }else{
            submit.attr("disabled", true)
        }
    });

    // Regular Expression
    var patterns = {};

    patterns.email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    patterns.password = /^[a-zA-Z0-9]{8,16}$/;
    patterns.tel = /^(13[0-9]|14[5|7]|15[0-3|5-9]|18[0-3|5-9])\d{8}|\d{3}-\d{4}-\d{4}$/;

    // click submit button
    submit.click(function () {

        // validate input fields
        if (emailField.val()==""){
            emailField.parent().parent().find("td:eq(1)").text(" ❌ 请输入有效邮箱");
            emailField.parent().parent().find("td:eq(1)").css("color", "red")
        }else if (patterns.email.test(emailField.val())){
            pass[0] = 1;
        }
        if (nameField.val()==""){
            nameField.parent().parent().find("td:eq(1)").text(" ❌ 请输入您的姓名");
            nameField.parent().parent().find("td:eq(1)").css("color", "red")
        }else{
            pass[1] = 1;
        }

        if (pwdField.val()==""){
            pwdField.parent().parent().find("td:eq(1)").text(" ❌ 请设置登录密码");
            pwdField.parent().parent().find("td:eq(1)").css("color", "red")
        }else if (patterns.password.test(pwdField.val())){
            pass[2] = 1;
        }
        if (pwdConfirmField.val()==""){
            pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 请再次输入密码");
            pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red")
        }else if (pwdConfirmField.val() == pwdField.val()){
            pass[3] = 1;
        }
        if (!$("#gender0").is(":checked") && !$("#gender1").prop("checked")){
            genderField.parent().parent().find("td:eq(1)").text(" ❌ 请选择您的性别");
            genderField.parent().parent().find("td:eq(1)").css("color", "red")
        }else {
            pass[4] = 1;
        }
        if (telField.val()==""){
            telField.parent().parent().find("td:eq(1)").text(" ❌ 请输入您的手机号码");
            telField.parent().parent().find("td:eq(1)").css("color", "red")
        }else if (patterns.tel.test(telField.val())){
            pass[5] = 1;
        }
        if (captchaField.val()==""){
            captchaField.parent().parent().find("td:eq(1)").text(" ❌ 验证码不能为空");
            captchaField.parent().parent().find("td:eq(1)").css("color", "red")
        }

        // for test
        // pass=[1, 1, 1, 1, 1, 1];

        if (pass.indexOf(0) == -1 && policy.is(":checked")){
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
                $.get(
                    "/register/validate",
                    {email: emailField.val()},
                    function (result) {
                        if (result == true){
                            emailField.parent().parent().find("td:eq(1)").text(" √");
                            emailField.parent().parent().find("td:eq(1)").css("color", "green");
                            pass[0] = 1;
                        }else {
                            emailField.parent().parent().find("td:eq(1)").text(" ❌ 该邮箱已被注册");
                            emailField.parent().parent().find("td:eq(1)").css("color", "red");
                            pass[0] = 0;
                        }
                    }
                );
            }
        }else{
            emailField.parent().parent().find("td:eq(1)").text("！必须项，用于登入您的帐号");
            emailField.parent().parent().find("td:eq(1)").css("color", "#ffb81c");
            pass[0] = 0;
        }
    });

    nameField.blur(function () {
        if (nameField.val() != ""){
            nameField.parent().parent().find("td:eq(1)").text(" √");
            nameField.parent().parent().find("td:eq(1)").css("color", "green");
            pass[1] = 1;
        }else{
            nameField.parent().parent().find("td:eq(1)").text("！必须项");
            nameField.parent().parent().find("td:eq(1)").css("color", "#ffb81c");
            pass[1] = 0;
        }
    });

    pwdField.blur(function () {
        if (pwdField.val() == "" && pwdConfirmField.val() == ""){
            pwdField.parent().parent().find("td:eq(1)").text("！必须项，请输入8～16位密码，由字母和数字组成");
            pwdConfirmField.parent().parent().find("td:eq(1)").text("！必须项，再次输入密码");
            pwdField.parent().parent().find("td:eq(1)").css("color", "#ffb81c");
            pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "#ffb81c");
            pass[2] = 0;
            pass[3] = 0;
        }else if (pwdField.val() == "" && pwdConfirmField.val() != ""){
            pwdField.parent().parent().find("td:eq(1)").text(" ❌ 密码只能由8~16位字母及数字组成");
            pwdField.parent().parent().find("td:eq(1)").css("color", "red");
            pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 请输入有效密码");
            pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red");
            pass[2] = 0;
            pass[3] = 0;
        }else if (pwdField.val() != "" && pwdConfirmField.val() == ""){
            if(patterns.password.test(pwdField.val())){
                pwdField.parent().parent().find("td:eq(1)").text(" √");
                pwdField.parent().parent().find("td:eq(1)").css("color", "green");
                pwdConfirmField.parent().parent().find("td:eq(1)").text("！必须项，再次输入密码");
                pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "#ffb81c");
                pass[2] = 1;
                pass[3] = 0;
            }else{
                pwdField.parent().parent().find("td:eq(1)").text(" ❌ 密码只能由8~16位字母及数字组成");
                pwdField.parent().parent().find("td:eq(1)").css("color", "red");
                pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 请输入有效密码");
                pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red");
                pass[2] = 0;
                pass[3] = 0;
            }
        }else {
            if(patterns.password.test(pwdField.val())){
                pwdField.parent().parent().find("td:eq(1)").text(" √");
                pwdField.parent().parent().find("td:eq(1)").css("color", "green");
                pass[2] = 1;
                if (pwdField.val() == pwdConfirmField.val()){
                    pwdConfirmField.parent().parent().find("td:eq(1)").text(" √");
                    pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "green");
                    pass[3] = 1;
                }else {
                    pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 两次输入的密码不一致");
                    pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red");
                    pass[3] = 0;
                }
            }else {
                pwdField.parent().parent().find("td:eq(1)").text(" ❌ 密码只能由8~16位字母及数字组成");
                pwdField.parent().parent().find("td:eq(1)").css("color", "red");
                pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 请输入有效密码");
                pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red");
                pass[2] = 0;
                pass[3] = 0;
            }
        }
    });

    pwdConfirmField.blur(function () {
        if (pwdField.val() == "" && pwdConfirmField.val() == ""){
            pwdField.parent().parent().find("td:eq(1)").text("！必须项，请输入8～16位密码，由字母和数字组成");
            pwdConfirmField.parent().parent().find("td:eq(1)").text("！必须项，再次输入密码");
            pwdField.parent().parent().find("td:eq(1)").css("color", "#ffb81c");
            pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "#ffb81c");
            pass[2] = 0;
            pass[3] = 0;
        }else if (pwdField.val() == "" && pwdConfirmField.val() != ""){
            pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 请输入有效密码");
            pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red");
            pass[2] = 0;
            pass[3] = 0;
        }else if (pwdField.val() != "" && pwdConfirmField.val() == ""){
            pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 请再次输入密码");
            pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red");
            pass[3] = 0;
        }else{
            if (patterns.password.test(pwdField.val())){
                if (pwdConfirmField.val() == pwdField.val()){
                    pwdConfirmField.parent().parent().find("td:eq(1)").text(" √");
                    pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "green");
                    pass[3] = 1;
                }else {
                    pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 两次输入的密码不一致");
                    pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red");
                    pass[3] = 0;
                }
            }else{
                pwdField.parent().parent().find("td:eq(1)").text(" ❌ 密码只能由8~16位字母及数字组成");
                pwdField.parent().parent().find("td:eq(1)").css("color", "red");
                pwdConfirmField.parent().parent().find("td:eq(1)").text(" ❌ 请输入有效密码");
                pwdConfirmField.parent().parent().find("td:eq(1)").css("color", "red");
                pass[2] = 0;
                pass[3] = 0;
            }
        }
    });

    genderField.change(function () {
        genderField.parent().parent().find("td:eq(1)").text(" √");
        genderField.parent().parent().find("td:eq(1)").css("color", "green");
        pass[4] = 1;
    });

    telField.focus(function () {
        birthdayField.parent().parent().find("td:eq(1)").text(" √");
        birthdayField.parent().parent().find("td:eq(1)").css("color", "green");
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
            telField.parent().parent().find("td:eq(1)").text("！必须项");
            telField.parent().parent().find("td:eq(1)").css("color", "#ffb81c");
            pass[5] = 0;
        }
    })
});