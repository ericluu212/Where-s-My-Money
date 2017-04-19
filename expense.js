var Expense = function(date, description, cost, account, id)
{
	Object.defineProperty(this, 'id', {value: id, writable: false});

	this.date = date;
	this.description = description;
	this.cost = cost;
	this.account = account;

/*

Expense.prototype.toString = function toString() {
	var date = this.date.toString();
	var year = date.substring(0,4);
	var month = date.substring(4,6);
	var dayNum = date.substring(6);

	if (parseInt(this.cost.toString()) < 0) {
		var str =  month + "/" + dayNum + "/" + year + "   " + this.description.toString() + ": -$" + this.cost.toString().substring(1);
		return str
	}	
	else{
		var str = month + "/" + dayNum + "/" + year + "   " + this.description.toString() + ": $" + this.cost.toString();
		return str
=======
*/

	this.dateToString = function ()
	{
		var dateString = "" + this.date;
		var year = dateString.substring(0,4);
		var month = dateString.substring(4,6);
		var day = dateString.substring(6,8);
		return month + '/' + day + '/' + year;
	}
}