var TransactionsList = function()
{
	this.transactions = [new Transaction("1-1-2017", "Coffee", -2.49, 1)];
	this.render = function()
	{
		var transactionListElement = $('#transactions-list')[0];
		for (var i=0; i<this.transactions.length; i++)
		{
			transactionListElement.appendChild(createListElement(this.transactions[i]));
		}
	}

	function createListElement(transaction)
	{
		var listElement = document.createElement('li');
		listElement.appendChild(document.createTextNode(transaction.cost.toString()));
		return listElement;
	}
}