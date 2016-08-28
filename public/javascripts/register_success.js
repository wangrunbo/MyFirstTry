/**
 * Created by wangrunbo on 16/08/28.
 */
$(function () {

    var t = 3;
    $("#timing").html(t);

    function time_count() {
        t--;

        $("#timing").html(t);

        if (t == 0){
            clearInterval(interval);
            window.location.href = "/"
        }
    }

    var interval = window.setInterval(time_count, 1000);
});