$('.rd-cmt').on('click', function (event) {
  event.preventDefault();
  if ($(this).parent().next().css("display") == "none") {
    $(this).parent().next().show();
  } else {
    $(this).parent().next().hide();
  };
});

$('.rd-btn').on('click', function (event) {
  event.preventDefault();
  var dom = $(this).parent().parent().parent().prev().find('.rd-cmt').next();
  var commentcount = parseInt(dom.html());
  var comment = $(this).prev().val();
  var recordID = $(this).parent().parent().parent().parent().parent().attr('id');//获得当前评论中 record的ID 
  var userID = $(this).parent().parent().parent().parent().parent().parent().attr('id');
  alert(userID);
  var ul = $(this).parent().parent().prev().find('#ul-cmt');
  var data = {
    "comment": comment,
    "recordID": recordID,
    "userID": userID
  };
  $.ajax({
    type: 'POST',
    url: '/friending/addcomment',  //  借用了friending 的评论功能
    data: data,
    success: function (data) {
      if (data.ret_code === 0) {
        alert('评论成功！');
        var newLi = document.createElement('li');
        var text = '<li class="list-group-item"><a href="/home/' + data.userID + '/notelist">' + data.nickname + '</a><span>&nbsp;:&nbsp;' + comment + '</span></li>';
        newLi.innerHTML = text;
        setTimeout(function () {
          ul.append(newLi);
          commentcount++;//自加1
          dom.html(commentcount);
        }, 1000);// 假装上传且实时更新 
      }
    }
  });
});
$('.rd-del').on('click',function(event){
  event.stopPropagation();
  event.preventDefault();
  console.log($(this));

})


$("#btn").click(function (event) {
  event.preventDefault();
  var addRecord = $("#addRecord").val();
  var data = { "recordContent": addRecord };
  $.ajax({
    type: 'POST',
    url: window.location.pathname + '/addrecord',
    data: data,
    success: function (data) {
      if (data.ret_code === 0) {
        alert('添加成功！');
        location.reload();
      }
    }
  });
});

$("#deletenote").click(function (event) {
  event.preventDefault();
  $.ajax({
    type:'POST',
    url: window.location.pathname + '/delete',
    success:function(data){
      if(data.ret_code==0){
        alert("删除记本成功！");
        self.location = document.referrer;//返回前一页并且刷新
      }
    }
  })
})