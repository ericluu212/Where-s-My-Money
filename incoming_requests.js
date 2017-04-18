var requestsList;

function incoming_requests(){
  var modal = document.getElementById('incoming-requests-popup');
  //var modal = document.getElementById('myModal');
  modal.style.display = "block";

  var close = document.getElementsByClassName('close')[1];

  close.onclick = function(){
    modal.style.display = "none"
  };


}

function fill_modal_content(){

}
