var TransactionsList = function()
{
	this.transactionListElement = $('#transactions-list')[0];

	this.transactions = [
		new Transaction(20170101, "Coffee", -2.49, "Chase", 1), 
		new Transaction(20170131, "UROP Deposit", 450, "Bank of America", 2),
		new Transaction(20170211, "UROP Deposit", 423, "Bank of America", 3)
		];
	this.filteredTransactions = this.transactions;

	this.clearRenderedList = function()
	{
		while (this.transactionListElement.firstChild) {
			this.transactionListElement.removeChild(this.transactionListElement.firstChild);
		}
	}

	this.render = function()
	{
		for (var i=0; i<this.filteredTransactions.length; i++)
		{
			this.transactionListElement.appendChild(createListElement(this.filteredTransactions[i]));
		}
	}

	function createListElement(transaction)
	{
		var listElement = document.createElement('ol');
		listElement.appendChild(document.createTextNode(transaction.cost.toString()));
		return listElement;
	}

	function withdrawalsFilter(transactionsList) {
		return transactionsList.filter(function(transaction) {
			return transaction.cost <= 0;
		});
	}

	function depositsFilter(transactionsList) {
		return transactionsList.filter(function(transaction) {
			return transaction.cost > 0;
		});
	}

	function accountsFilter(transactionsList, accountsList) {
		return undefined;
	}

	this.filterTransactions = function(transactionType="all", accountsList=[], startDate=null, endDate=null) {
		// var Transaction = function(date, description, cost, account, id)
		this.filteredTransactions = this.transactions;
		if (transactionType == "withdrawals") {
			this.filteredTransactions = withdrawalsFilter(this.filteredTransactions);
		} else if (transactionType == "deposits") {
			this.filteredTransactions = depositsFilter(this.filteredTransactions);
		}
	}
}