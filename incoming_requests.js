
function incoming_requests(){
  var modal = document.getElementById('incoming-requests-popup');
  requestsList.render();
  modal.style.display = "block";

  var close = document.getElementsByClassName('close')[2];

  close.onclick = function(){
    modal.style.display = "none"
    var list = document.getElementById('incoming-requests-list');
    while(list.hasChildNodes()){
      list.removeChild(list.lastChild);
    }
  };
}

$(document).on('click', '#approve-btn', function(evt){
  var parentId = $(evt.target).parent().parent().parent();
  requestsList.approveRequest(parentId.attr('id'));

  var btn_group = $(evt.target).parent();
  while(btn_group[0].hasChildNodes()){
    btn_group[0].removeChild(btn_group[0].lastChild);
  }
  btn_group.text("APPROVED");
});

$(document).on('click', '#change-amt-btn', function(evt){
  var request_id = $(evt.target).parent().parent().parent().attr('id');

  var element_to_update = $(evt.target).parent().parent().find('#cost').text()
  requestsList.changeAmount(request_id);


});

$(document).on('click', '#deny-btn', function(evt){
  var parent = $(evt.target).parent().parent().parent();

  requestsList.denyRequest(parent.attr('id'));

  var btn_group = $(evt.target).parent();
  while(btn_group[0].hasChildNodes()){
    btn_group[0].removeChild(btn_group[0].lastChild);
  }
  btn_group.text("DENIED");
});
