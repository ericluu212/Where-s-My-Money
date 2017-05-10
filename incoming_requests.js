var clickedListItemId = "";

var approveCache = [];
var denyCache = [];
var changeCache = [];

//Saves any changes when confirm is clicked in requests modal
function saveChanges(){
  for(i=0; i<approveCache.length; i++){
    requestsList.approveRequest(approveCache[i])
  }
  for(i=0; i<denyCache.length; i++){
    requestsList.denyRequest(denyCache[i])
  }
  for(i=0; i<changeCache.length; i++){
  }
  emptyCache();
}
// Empties all the caches
function emptyCache(){
  approveCache = [];
  denyCache = [];
  changeCache = [];
}

$(document).on('click', '#request-confirm-btn', function(){

    saveChanges();

    var modal = document.getElementById('incoming-requests-popup');
    modal.style.display = "none";
    var list = document.getElementById('incoming-requests-list');
    while(list.hasChildNodes()){
      list.removeChild(list.lastChild);
    }
    updateBtnDescription();
});

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
  approveCache.push(parentId.attr('id'));
  var request = requestsList.getRequest(parentId.attr('id'));

  var btn_group = $(evt.target).parent();
  while(btn_group[0].hasChildNodes()){
    btn_group[0].removeChild(btn_group[0].lastChild);
  }

  var feedback = "Approved: " + request.description;
  btn_group.text(feedback);
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
  denyCache.push(parent.attr('id'))
  var request = requestsList.getRequest(parent.attr('id'));

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

$(window).click(function(event) {
    var modal = document.getElementById('change-amt-popup');
    if (event.target == modal) {
        modal.style.display = "none";
        $('#change-amt-text').val("");
        clickedListItemId = '';
    }
});

$(document).on('click', '#change-amt-confirm', function(){
  var newCost = $('#change-amt-text').val().replace(/^0+/, ''); //from http://stackoverflow.com/questions/6676488/remove-leading-zeros-from-a-number-in-javascript
  condition = validateCurrency(newCost);
  if (condition){
    var id = clickedListItemId.slice(1);
    var modal = document.getElementById('change-amt-popup');
    requestsList.changeAmount(newCost, id);
    $(clickedListItemId).find('#buttons-col').find('#description-list').find('#cost').text("$" + newCost);
    $('#change-amt-confirm').prop('disabled', true);
    setTimeout(function() {
      modal.style.display = "none";
      var transferError = document.getElementById("changeRequestAlert");
      transferError.innerHTML = "";
      $('#change-amt-text').val("");
      $('#change-amt-confirm').prop('disabled', false);
    }, 1000);
  }
});


function validateCurrency(currency){
    if(!currency.includes('.')){
      currency = currency + ".00";
    }
    var regex  = /^\d+(?:\.\d{2})$/;
    if(regex.test(currency) && parseInt(currency) != 0){ //don't want user to input a bunch of meaningless 0s
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
      transferError.style.color = "red";
      return false;
    }
  }
