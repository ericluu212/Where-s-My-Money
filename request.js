var Request = function Request(date, description, cost, name, id){

  Object.defineProperty(this, 'id', {value: id, writable: false});

  this.date = date;
  this.description = description;
  this.cost = cost;
  this.name = name;

  this.changeAmount = function(newCost){
    this.cost = cost
  }
}
