$('#searchbtn').on('click', function (event) {
  event.preventDefault();
  var str = $('#searchinput').val();
  var data = { "str": str }
  $('#random').remove();
  $('#result').remove();
  var text, notetext, usertext, info1, info2;
  // usertext = '<ul>';
  // userdata.forEach(function(item){
  // 	usertext += '<li><div class="f-items"><div class="user-pto"><img src="'+item.userPtoUrl+'"></div><div class="user-info"><div class="user-nick"><a href="/home/'+item.userID+'/notelist">'+item.nickname+'</a></div></div></div></li>'
  // });
  // usertext += '</ul>';
  // notetext = '<div class="notelist"><ul class="note-list">';
  // notedata.forEach(function(item){
  // 	notetext +='<li class="notelist-item"><a href="/note/'+item.noteID+'" class="notelist-pic"><img src="'+item.noteCoverUrl+'" ></a><div class="notelist-title"><p>'+item.noteTitle+'<p></div></li>'
  // });
  // notetext += '</div>';
  // text = $('<div class="result"></div>').html(
  // 	'<div class="information"><div class="panel panel-default"><div class="panel-body text-center">用户</div></div></div>'+usertext+
  // 	'<div class="information"><div class="panel panel-default"><div class="panel-body text-center">记本</div></div></div>'+notetext+
  // 	)
  // $(this).parent().parent().parent().append(text);
  $.ajax({
    type: 'POST',
    url: '/discovery',
    data: data,
    success: function (data) {
      if (data.usercount == 0) {
        usertext = '<div class="blank-list">没有搜索到用户</div>'
      } else {
        usertext = '<ul class="userlist">';
        data.userdata.forEach(function (item) {
          usertext += '<li class="userlist-item"><div class="f-items"><div class="user-pto"><img src="' + item.userPtoUrl + '"></div><div class="user-info"><div class="user-nick"><a href="/home/' + item.userID + '/notelist">' + item.nickname + '</a></div></div></div></li>'
        });
        usertext += '</ul>';
      };
      if (data.notecount == 0) {
        notetext = '<div class="blank-list">没有搜索到记本</div>'
      } else {
        notetext = '<div class="notelist"><ul class="note-list">';
        data.notedata.forEach(function (item) {
          notetext += '<li class="notelist-item"><a href="/note/' + item.noteID + '" class="notelist-pic"><img src="' + item.noteCoverUrl + '" ></a><div class="notelist-title"><p>' + item.noteTitle + '<p></div></li>'
        });
        notetext += '</div>';
      };
      info1 = '<div class="information"><div class="panel panel-default"><div class="panel-body text-center">用户</div></div></div>';
      info2 = '<div class="information"><div class="panel panel-default"><div class="panel-body text-center">记本</div></div></div>';
      text = $('<div class="result" id="result"></div>').html(info1 + usertext + info2 + notetext);
      $(".body").append(text);
    }
  })
})