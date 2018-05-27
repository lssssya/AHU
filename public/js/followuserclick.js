$('#header-bar').on('click', 'li:last', function (event) { //事件委托给父级的ul
  // event.target.nodeName => span and a
  if (event.target.nodeName.toLowerCase() == "span") {
    event.target = event.target.parentNode
  }//A
  var ID = $(event.target).attr('id');
  data = { "userID": ID }
  var dom = $(event.target).parent();
  if ($(event.target).hasClass("followclick")) {
    $.ajax({
      type: 'POST',
      url: '/relationship/follow/user',
      data: data,
      success: function (data) {
        if (data.ret_code == 2) {
          alert("已经关注了哦")
          dom.replaceWith('<li role="presentation" class="pull-right"><a class="unfollowclick" id="<%= data.userID %>"><span class="glyphicon glyphicon-ok">&nbsp;</span>已关注</a></li>')
        }
        if (data.ret_code == 0) {
          alert("关注成功!");
          dom.replaceWith('<li role="presentation" class="pull-right"><a class="unfollowclick" id="<%= data.userID %>"><span class="glyphicon glyphicon-ok">&nbsp;</span>已关注</a></li>')
        }
      }
    });
  } else {
    $.ajax({
      type: 'POST',
      url: '/relationship/unfollow/user',
      data: data,
      success: function (data) {
        if (data.ret_code == 2) {
          alert("你没有关注哦")
          dom.replaceWith('<li role="presentation" class="pull-right"><a class="followclick" id="<%= data.userID %>"><span class="glyphicon glyphicon-plus">&nbsp;关注</span></a></li>')
        }
        if (data.ret_code == 0) {
          alert("已取消！");
          dom.replaceWith('<li role="presentation" class="pull-right"><a class="followclick" id="<%= data.userID %>"><span class="glyphicon glyphicon-plus">&nbsp;关注</span></a></li>')
        }
      }
    })
  }
});

// $('.followclick').on('click',function(event){
//   event.preventDefault();
//   var ID = $(event.target).attr('id');
//   alert(ID);
//   var dom = $(this).parent();
//   data ={
//     "userID":ID
//   }
//   $.ajax({
//     type:'POST',
//     url:'/relationship/follow/user',
//     data:data,
//     success:function(data){
//       if(data.ret_code==2){
//         alert("已经关注了哦")
//       }
//       if(data.ret_code == 0){
//         alert("关注成功!");
//         dom.replaceWith('<li role="presentation" class="pull-right"><a class="unfollowclick" id="<%= data.userID %>"><span class="glyphicon glyphicon-ok">&nbsp;</span>已关注</a></li>')
//       }
//     }
//   });
// });