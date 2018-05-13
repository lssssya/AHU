$("#btn").click(function (event) {
  event.preventDefault();
  var noteTitle = $("#noteTitle").val();
  var noteIntroduction = $("#noteIntroduction").val();
  var formData = new FormData();
  formData.append('noteCover', $("#noteCover")[0].files[0]);  //添加图片信息的参数
  formData.append('noteTitle', noteTitle);
  formData.append('noteIntroduction', noteIntroduction);  //添加其他参数
  $.ajax({
    type: 'POST',
    url: '/newnote',
    async: false,
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      if (data.ret_code === 0) {
        alert("创建记本成功！");
        location.href = '/home/' + data.userID + '/notelist';
      };
      if (data.ret_code === 2) {
        alert("false");
      }
    }

  });
});

