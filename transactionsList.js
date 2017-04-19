var ENDYEAR = 2050;
var MONTH_AND_DATE = 0501;

var TransactionsList = function()
{
	this.transactionListElement = $('#transactions-list')[0];

	this.transactions = generateTransactions();
	/*
	[
		new Transaction(20170101, "Coffee", -2.49, "Chase", 1), 
		new Transaction(20170131, "UROP Deposit", 450, "Bank of America", 2),
		new Transaction(20170211, "UROP Deposit", 423, "Bank of America", 3)
		];
	*/

	this.filteredTransactions = this.transactions;
	this.accounts = [];

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

	function generateTransactions(){
		transactionsList = []
		for (var i = 2017; i < ENDYEAR; i++) {
			transactionsList.push(new Expense(parseInt(i.toString() + MONTH_AND_DATE.toString()), "UROP Deposit", 450, "Bank of America", i-2016));
		}
		return transactionsList;
	}

	function createListElement(transaction)
	{
		var listElement = document.createElement('ol');
		listElement.appendChild(document.createTextNode(transaction.toString()));
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
		return transactionsList.filter(function(transaction) {
			return $.inArray(transaction.account, accountsList) > -1;
		});
	}

	function datesFilter(transactionsList, startDate, endDate) {
		// Date style is Year Month Day=>20161231
		return transactionsList.filter(function(transaction) {
			if (startDate && endDate) {
				return (startDate <= transaction.date && endDate >= transaction.date);
			} else if (startDate) {
				return (startDate <= transaction.date);
			} else if (endDate) {
				return (endDate >= transaction.date);
			} else {
				return true;
			}
		});
	}

	function getTransactionTypeFilterValue() {
		var transactionsTypeFilterElement = $('#transactionsTypeFilter')[0];
		return transactionsTypeFilterElement.options[transactionsTypeFilterElement.selectedIndex].value;
	}

	function getTransactionsStartDate() {
		var transactionsStartDateElement = $('#transactionsStartDate')[0];
		if (transactionsStartDateElement.value.length == 8) {
			return parseInt(transactionsStartDateElement.value);
		} else {
			return null;
		}
	}

	function getTransactionsEndDate() {
		var transactionsEndDateElement = $('#transactionsEndDate')[0];
		if (transactionsEndDateElement.value.length == 8) {
			return parseInt(transactionsEndDateElement.value);
		} else {
			return null;
		}
	}

	this.filterTransactions = function() {
		// var Transaction = function(date, description, cost, account, id)
		var transactionType, accountsList, startDate, endDate;
		transactionType = getTransactionTypeFilterValue();
		accountsList = this.accounts;
		startDate = getTransactionsStartDate();
		endDate = getTransactionsEndDate();

		this.filteredTransactions = this.transactions;
		if (transactionType == "withdrawals") {
			this.filteredTransactions = withdrawalsFilter(this.filteredTransactions);
		} else if (transactionType == "deposits") {
			this.filteredTransactions = depositsFilter(this.filteredTransactions);
		}

		this.filteredTransactions = datesFilter(this.filteredTransactions, startDate, endDate);
		this.filteredTransactions = accountsFilter(this.filteredTransactions, accountsList);
	}
}