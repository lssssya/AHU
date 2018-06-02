function typeControl(file) {
  var info = file.files[0];
  if (!/image\/\w+/.test(info.type)) {
    alert("非图片文件，请重新选择")
    $("#userPtoUrl").val("");
  }
  if (info.size > 10 * 1024 * 1024) {
    alert("上传的图片的大于10M,请重新选择");
    $("#userPtoUrl").val("");
  }
};

$("#confirSet").click(function (event) {
  event.preventDefault();
  var nickname = $("#nickname").val();
  var gender = $('input:radio[name="sex"]:checked').val();
  var signUp = $("#signUp").val();
  var formData = new FormData();
  formData.append('nickname', nickname);
  formData.append('sex', gender);
  formData.append('qianming', signUp);
  formData.append('userPtoUrl', $("#userPtoUrl")[0].files[0]);
  $.ajax({
    type: 'POST',
    url: window.location.pathname,
    async: false,
    data: formData,
    processData: false,
    contentType: false,
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
function setnull() {
  $("#password").val("");
  $("#password1").val("");
  $("#password2").val("");
};
$("#submit").click(function (event) {
  event.preventDefault();
  var password = $("#password").val();
  var password1 = $("#password1").val();
  var password2 = $("#password2").val();
  var data = { "rowPw": password, "pw": password1 };
  if (password == "") {
    alert("请输入原始密码");
    $("#password").focus();
  } else {
    if (password1 == "") {
      alert("请输入新密码");
      $("#password1").focus();
    } else {
      if (password1 != password2) {
        alert("两次输入密码必须一致");
        $("#password2").val("");
        $("#password2").focus();  
      } else {
        $.ajax({
          type: 'POST',
          url: window.location.pathname,
          data: data,
          success: function (data) {
            if (data.ret_code === 0) {
              alert("修改成功！");
              setnull();
            };
            if (data.ret_code === 1) {
              alert("修改失败！");
              setnull();
            };
            if (data.ret_code === 2) {
              alert("初始密码错误！");
              setnull();
            }
          }
        });
      }
    }
  }
  return false;
});
