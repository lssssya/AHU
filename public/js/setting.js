
  $("#confirSet").click(function (event) {
    event.preventDefault();
    var nickname = $("#nickname").val();
    var gender = $("#sex").val();
    var signUp = $("#signUp").val();
    var data = { "gender": gender, "nickname": nickname, "signUp": signUp };
    $.ajax({
      type: 'POST',
      url: window.location.pathname,
      data: data,
      success: function (data) {
        if (data.ret_code === 0) {
          alert("修改成功！");
        };
        if (data.ret_code === 1) {
          alert("修改失败！");
        };
      }
    });
    return false;
  });

$("#submit").click(function (event) {
  event.preventDefault();
  var password = $("#password").val();
  var password1 = $("#password1").val();
  var password2 = $("#password2").val();
  var data = { "userID": userID, "rowPw": password, "pw": password1 };
  if (password == "") {
    alert("请输入原始密码");
  }
  else {
    if (password1 == "") {
      alert("请输入新密码");
    }
    else {
      if (password1 != password2) {
        alert("两次输入密码必须一致")
      }
      else {
        $.ajax({
          type: 'POST',
          url: window.location.pathname,
          data: data,
          success: function (data) {
            if (data.ret_code === 0) {
              alert("修改成功！");
            };
            if (data.ret_code === 1) {
              alert("修改失败！")
            };
            if (data.ret_code === 2) {
              alert("初始密码错误！")
            }
          }
        });
      }
    }
  }
  return false;
});
