var Expense = function(date, description, cost, account, id)
{
	Object.defineProperty(this, 'id', {value: id, writable: false});

	this.date = date;
	this.description = description;
	this.cost = cost;
	this.account = account;
}