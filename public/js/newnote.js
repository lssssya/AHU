function typeControl(file){
  var info = file.files[0];
  if(!/image\/\w+/.test(info.type)){
    alert("非图片文件，请重新选择")
    $("#noteCover").val("");
  }
  if(info.size>10*1024*1024){
    alert("上传的图片的大于10M,请重新选择");
    $("#noteCover").val("");
  }
}



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
        alert(data.ret_msg)
        location.href = '/home/' + data.userID + '/notelist';
      };
      if (data.ret_code === 2) {
        alert(data.ret_msg)
        location.reload();
      }
    }

  });
});

