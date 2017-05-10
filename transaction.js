var Transaction = function(date, description, cost, account, id)
{
	Object.defineProperty(this, 'id', {value: id, writable: false});

	this.date = date;
	this.description = description;
	this.cost = cost;
	this.account = account;

	this.dateToString = function ()
	{
		var dateString = "" + this.date;
		var year = dateString.substring(0,4);
		var month = dateString.substring(4,6);
		var day = dateString.substring(6,8);
		return month + '/' + day + '/' + year;
	}
}