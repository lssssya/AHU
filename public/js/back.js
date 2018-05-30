$("#btnReturn").click(function () {  //给return的图片一个点击事件
  window.history.back(-1);
  // self.location = document.referrer;//返回前一页并且刷新
});