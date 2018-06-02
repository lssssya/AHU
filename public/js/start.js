
$("#login").click(function (event) {
  event.preventDefault();
  var username = $("#username").val();
  var password = $("#password").val();
  var data = { "username": username, "pw": password };
  $("#login").attr('disabled', true);
  $.ajax({
    type: 'POST',
    url: '/login',
    data: data,
    success: function (data) {
      if (data.ret_code === 0) {
        location.href = '/home/' + data.userID + '/notelist';
      };
      if (data.ret_code === 3) {
        alert(data.ret_msg)
        location.href = '/login';
      }
      if (data.ret_code === 1) {
        alert(data.ret_msg)
        $("#login").attr('disabled', false);
        location.href = '/login';
      };
    }
  });
  return false;
});
function passwordControl() {
  if ($("#password").val().length < 6) {
    alert("密码不少于6位");
    $("#password").val("");
    $("#password").focus();
  }
}
$("#register").click(function (event) {
  event.preventDefault();
  var nickname = $("#nickname").val();
  var username = $("#username").val();
  var password = $("#password").val();
  var data = { "username": username, "pw": password, "nickname": nickname };
  if (nickname == "") {
    alert("昵称不能为空");
    $("#nickname").focus();
  } else if (username == "") {
    alert("用户名不能为空")
    $("#username").focus();
  } else if (password == "") {
    alert("密码不能为空")
    $("#password").focus();
  } else {
    $("#register").attr('disabled', true);
    $.ajax({
      type: 'POST',
      url: '/register',
      data: data,
      success: function (data) {
        if (data.ret_code === 0) {
          alert(data.ret_msg)
          location.href = '/login';
        };
        if (data.ret_code === 1) {
          alert(data.ret_msg)
          $("#register").attr('disabled', false);
          location.href = '/register';
        };
      }
    });
  }

  return false;
});