$("#btnReturn").click(function () {  //给return的图片一个点击事件
  // location.href='/home';
  self.location = document.referrer;//返回前一页并且刷新
});