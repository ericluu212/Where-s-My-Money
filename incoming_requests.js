
function incoming_requests(){
  var modal = document.getElementById('incoming-requests-popup');
  requestsList.render();
  modal.style.display = "block";

  var close = document.getElementsByClassName('close')[0];

  close.onclick = function(){
    modal.style.display = "none"
    var list = document.getElementById('incoming-requests-list');
    while(list.hasChildNodes()){
      list.removeChild(list.lastChild);
    }
  };
}

$(document).on('click', '#approve-btn', function(evt){
  var parent = $(evt.target).parent().parent().parent();
  requestsList.approveRequest(parent.attr('id'));

  var modal = document.getElementById('incoming-requests-popup');
  modal.style.display = "none"

  var list = document.getElementById('incoming-requests-list');
  while(list.hasChildNodes()){
    list.removeChild(list.lastChild);
  }
});

$(document).on('click', '#change-amt-btn', function(evt){
  var request_id = $(evt.target).parent().parent().parent().attr('id');

  var element_to_update = $(evt.target).parent().parent().find('#cost').text()
  requestsList.changeAmount(parent.attr('id'));


});

$(document).on('click', '#deny-btn', function(evt){
  var parent = $(evt.target).parent().parent().parent();

  requestsList.denyRequest(parent.attr('id'));

  var modal = document.getElementById('incoming-requests-popup');
  modal.style.display = "none";

  var list = document.getElementById('incoming-requests-list');
  while(list.hasChildNodes()){
    list.removeChild(list.lastChild);
  }
});
