$('#box').on('click', 'button', function (event) {
  event.preventDefault();
  if (event.target.nodeName.toLowerCase() == "span") {
    event.target = event.target.parentNode
  }//btn
  var noteID = $(this).parent().prev().attr('id');
  var dom = $(event.target);
  data = { "noteID": noteID }
  if ($(event.target).hasClass("followclick")) {
    // dom.replaceWith('<button class="btn btn-primary btn-lg unfollowclick"><span class="glyphicon glyphicon-ok">&nbsp;</span>已关注</button>')
    $.ajax({
      type: 'POST',
      url: '/relationship/follow/note',
      data: data,
      success: function (data) {
        if (data.ret_code == 0) {
          alert("关注成功！")
          dom.replaceWith('<button class="btn btn-primary btn-lg unfollowclick"><span class="glyphicon glyphicon-ok">&nbsp;</span>已关注</button>')
        }
        if (data.ret_code == 2) {
          alert("已关注该记本")
          dom.replaceWith('<button class="btn btn-primary btn-lg unfollowclick"><span class="glyphicon glyphicon-ok">&nbsp;</span>已关注</button>')
        }
      }
    })
  } else {
    dom.replaceWith('<button class="btn btn-primary btn-lg followclick"><span class="glyphicon glyphicon-plus">&nbsp;</span>关注记本</button>')
    $.ajax({
      type: 'POST',
      url: '/relationship/unfollow/note',
      data: data,
      success: function (data) {
        if (data.ret_code == 0) {
          alert("已取消！")
          dom.replaceWith('<button class="btn btn-primary btn-lg followclick"><span class="glyphicon glyphicon-plus">&nbsp;</span>关注记本</button>')
        }
        if (data.ret_code == 2) {
          alert("你没有关注哦")
          dom.replaceWith('<button class="btn btn-primary btn-lg followclick"><span class="glyphicon glyphicon-plus">&nbsp;</span>关注记本</button>')
        }
      }
    })
  }
})