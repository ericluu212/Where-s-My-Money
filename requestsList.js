var RequestsList = function RequestsList(){

  this.requestListElement = $('#requests-list')[0];

  this.transactions = [
      new Request(new Date("2017-02-10"), "Pack of Ramen", 10.00, "Jack", "req_0"),
      new Request(new Date("2017-03-15"), "Beer for party", 150.00, "Rob", "req_1"),
      new Request(new Date("2017-04-05"), "Persona 5", 100.00, "Yoon", "req_2")
  ]

  this.approveRequest = function(){

  }

  this.denyRequest = function(){

  }

  this.changeAmount = function(newCost, id){
    var request = $.grep(this.transactions, function(e){
      return e.id == id
    })[0];

    request.changeAmount(newCost);
  }
}
