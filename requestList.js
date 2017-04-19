var RequestList = function(){

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'];

  this.requestListElement = $('#incoming-requests-list')[0];

  this.requests = [
      new Request(new Date("2017-02-10"), "Pack of ramen", 10.00, "Jack", "req_0"),
      new Request(new Date("2017-03-15"), "Beer for party", 150.00, "Rob", "req_1"),
      new Request(new Date("2017-04-05"), "Persona 5", 100.00, "Yoon", "req_2"),
      new Request(new Date("2017-06-29"), "MIT summer housing", 3500.00, "John", 'req_3')
  ];

  this.approveRequest = function(id){
    var request = $.grep(this.requests, function(e){
      return e.id == id;
    })[0];
    console.log(request.description + " for " + request.name + " approved.");

    var indexOfRequest = this.requests.indexOf(request);
    if(indexOfRequest > -1){
      this.requests.splice(indexOfRequest, 1);
    }

    return request;
  }

  this.denyRequest = function(id){
    var request = $.grep(this.requests, function(e){
      return e.id == id;
    })[0];
    console.log(request.description + " for " + request.name + " denied.");

    var indexOfRequest = this.requests.indexOf(request);
    if(indexOfRequest > -1){
      this.requests.splice(indexOfRequest, 1);
    }

    return request;
  }

  this.changeAmount = function(newCost, id){
    var request = $.grep(this.requests, function(e){
      return e.id == id
    })[0];
    request.changeAmount(newCost);
  }

  function createListElement(request, i){
    console.log("creating element")
    //var listElementHTML = '<div class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">List group item heading</h5><small>3 days ago</small></div><p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p><small>Donec id elit non mi porta.</small></div>';
    var outerFlexDiv = $('<div></div>').addClass('list-group-item list-group-item-action align-items-start row').attr('id', request.id);

    //var rowDiv = $('<div></div>').addClass('row');
    var innerFlexColDivButtons = $('<div></div>').addClass('col-sm-6 flex-first justify-content-between').attr('id', 'buttons-col');

    var title = $('<h5></h5>').addClass('mb-1').text('Request ' + (i + 1));

    var info = $('<ul></ul>').addClass('list-inline list-group').attr('id', 'description-list');
    var name = $('<li></li>').addClass('list-group-item description-item p-2').attr('id', 'name').text(request.name);
    var cost = $('<li></li>').addClass('list-group-item description-item p-2').attr('id', 'cost').text("$" + request.cost);
    var date = $('<li></li>').addClass('list-group-item description-item p-2').attr('id', 'date').text(months[request.date.getMonth()] + " " + request.date.getDate() + ", " + request.date.getFullYear());
    info.append(name).append(cost).append(date);

    var commands =  $('<div></div>').addClass('btn-group').attr('role', 'group').attr('id', 'btn-container');
    var approveBtn = $('<button></button>').addClass('btn btn-success request-btn').attr("id", "approve-btn").text('Approve request');
    var changeAmountBtn = $('<button></button>').addClass('btn btn-secondary request-btn').attr("id", "change-amt-btn").attr('data-toggle', 'modal').attr('href', '#change-amt-popup').text('Change amount');
    var denyBtn = $('<button></button>').addClass('btn btn-secondary request-btn').attr('id', 'deny-btn').text('Deny');
    commands.append(approveBtn).append(changeAmountBtn).append(denyBtn);

    innerFlexColDivButtons.append(title).append(info).append(commands);

    var innerFlexColDivDescription = $('<div></div>').addClass('col-sm-6 flex-last justify-content-between').attr('id', 'description-col');

    var descriptionTitle = $('<h3></h3>').text('Request description:');
    var description = $('<div></div>').attr('id', 'description-text').text(request.description);
    innerFlexColDivDescription.append(descriptionTitle).append(description);

    outerFlexDiv.append(innerFlexColDivButtons).append(innerFlexColDivDescription);

    $('#incoming-requests-list').append(outerFlexDiv);
  }

  this.render = function(){
    for (var i = 0; i < this.requests.length; i++){
      createListElement(this.requests[i], i);
    }
  }



}
