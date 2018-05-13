
  $("#login").click(function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    var data = { "username": username, "pw": password };
    $.ajax({
      type: 'POST',
      url: '/login',
      data: data,
      success: function (data) {
        if (data.ret_code === 0) {
          location.href = '/home/' + data.userID + '/notelist';
        };
        if (data.ret_code === 1) {
          alert("帐号密码错误，请重新登陆！")
          location.href = '/login';
        };
      }
    });
    return false;
  });

$("#register").click(function (event) {
  event.preventDefault();
  var nickname = $("#nickname").val();
  var username = $("#username").val();
  var password = $("#password").val();
  var data = { "username": username, "pw": password, "nickname": nickname };
  $.ajax({
    type: 'POST',
    url: '/register',
    data: data,
    success: function (data) {
      if (data.ret_code === 0) {
        alert("注册成功！");
        location.href = '/login';
      };
      if (data.ret_code === 1) {
        alert("注册重复！")
        location.href = '/register';
      };
    }
  });
  return false;
});