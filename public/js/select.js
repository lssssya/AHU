window.onload = function () {
    //获取url中的参数
    var r = window.location.pathname.split('/');  //匹配目标参数
    var headeractive = r[3];
    var asideactive = r[1];
    $("#header-bar li:lt(4)").each(function () {
        $this1 = $(this);
        if ($this1.children().attr('href').split('/')[3] === headeractive) {
            $this1.addClass("active");
        }
    });

    $(".nav-stacked li:lt(4)").each(function () {
        $this2 = $(this);
        if ($this2.children().attr('href').split('/')[1] === asideactive) {
            $this2.addClass("active");
        }
    });

}