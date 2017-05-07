var clickedListItemId = "";

function updateBtnDescription(){
  console.log('updating description');
  var desc = requestsList.requests.length;
  console.log(desc);
  $('.button-badge').text(desc);
}

function incoming_requests(){
  var modal = document.getElementById('incoming-requests-popup');
  requestsList.render();
  modal.style.display = "block";
}

//handles closing for x button
$(document).on('click', '.request-close', function(){
    var modal = document.getElementById('incoming-requests-popup');
    modal.style.display = "none"
    var list = document.getElementById('incoming-requests-list');
    while(list.hasChildNodes()){
      list.removeChild(list.lastChild);
    }

    console.log("Closed request");
});

$(window).click(function(event) {
    var modal = document.getElementById('incoming-requests-popup');
    if (event.target == modal) {
        modal.style.display = "none";
        var list = document.getElementById('incoming-requests-list');
        while(list.hasChildNodes()){
          list.removeChild(list.lastChild);
        }
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
  condition = validateCurrency(newCost);
  if (condition){
    var id = clickedListItemId.slice(1);

    requestsList.changeAmount(newCost, id);
    $(clickedListItemId).find('#buttons-col').find('#description-list').find('#cost').text("$" + newCost);
  }
});


function validateCurrency(currency){
    if(!currency.includes('.')){
      currency = currency + ".00";
    }
    var regex  = /^\d+(?:\.\d{2})$/;
    if(regex.test(currency)){
      var transferError = document.getElementById("changeRequestAlert");
      transferError.innerHTML = "Change complete."
      transferError.style.visibility = "visible";
      transferError.style.color = "green";
      return true;
    }
    else{
      var transferError = document.getElementById("changeRequestAlert");
      transferError.innerHTML = "Invalid currency value."
      transferError.style.visibility = "visible";
      return false;
    }
  }

