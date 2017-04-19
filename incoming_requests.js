var clickedListItemId = "";

function updateBtnDescription(){
  console.log('updating description');
  var desc = requestsList.requests.length + " Incoming requests";
  console.log(desc);
  $('#request-btn').text(desc);
}

function incoming_requests(){
  var modal = document.getElementById('incoming-requests-popup');
  requestsList.render();
  modal.style.display = "block";
}

$(document).on('click', '.request-close', function(){
    var modal = document.getElementById('incoming-requests-popup');
    modal.style.display = "none"
    var list = document.getElementById('incoming-requests-list');
    while(list.hasChildNodes()){
      list.removeChild(list.lastChild);
    }
});



$(document).on('click', '#approve-btn', function(evt){
  var parentId = $(evt.target).parent().parent().parent();
  var request = requestsList.approveRequest(parentId.attr('id'));

  var btn_group = $(evt.target).parent();
  while(btn_group[0].hasChildNodes()){
    btn_group[0].removeChild(btn_group[0].lastChild);
  }

  var feedback = "Approved: " + request.description;
  btn_group.text(feedback);
  updateBtnDescription();
});

$(document).on('click', '#change-amt-btn', function(evt){
  var request_id = $(evt.target).parent().parent().parent().attr('id');
  clickedListItemId = '#' + request_id;

  var modal = document.getElementById('change-amt-popup');
  modal.style.display = 'block';

  var current_cost = $(clickedListItemId).find('#buttons-col').find('#description-list').find('#cost').text();
  $('#current-cost').text("Current amount: " + current_cost);


});

$(document).on('click', '#deny-btn', function(evt){
  var parent = $(evt.target).parent().parent().parent();

  var request = requestsList.denyRequest(parent.attr('id'));

  var btn_group = $(evt.target).parent();
  while(btn_group[0].hasChildNodes()){
    btn_group[0].removeChild(btn_group[0].lastChild);
  }

  var feedback = "Denied: " + request.description;
  btn_group.text(feedback);
  updateBtnDescription();
});


$(document).on('click', '.change-amt-close', function(){
    var modal = document.getElementById('change-amt-popup');
    modal.style.display = "none";

    $('#change-amt-text').val("");
    clickedListItemId = '';
});

$(document).on('click', '#change-amt-confirm', function(){
  var newCost = $('#change-amt-text').val();
  var id = clickedListItemId.slice(1);

  requestsList.changeAmount(newCost, id);
  $(clickedListItemId).find('#buttons-col').find('#description-list').find('#cost').text("$" + newCost);

});
