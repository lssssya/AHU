$('.rd-lk').on('click', function (event) {
  event.preventDefault();
  var dom = $(this.nextSibling);
  var likedcount = parseInt(dom.html());
  var recordID = $(this).parent().parent().parent().attr('id');
  var allLikeddom,allLikedcount;
  if(/\/note\/\w+/.test(window.location.pathname)){
    allLikeddom = $(".findliked"); //span
    allLikedcount = parseInt(allLikeddom.html());
  }
  var data = { "recordID": recordID };
  $.ajax({
    type: 'POST',
    url: '/liked',
    data: data,
    success: function (data) {
      if (data.ret_code === 0) {
        alert('点赞成功！');
        likedcount++;//自加1
        allLikedcount++;
        allLikeddom.html(allLikedcount);
        dom.html(likedcount);
      } else {
        alert('点赞重复！');
      }
    }
  });
});