var Transaction = function(date, description, cost, id)
{
	Object.defineProperty(this, 'id', {value: id, writable: false});

	this.date = date;
	this.description = description;
	this.cost = cost;
}