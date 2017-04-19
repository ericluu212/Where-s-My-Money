var ENDYEAR = 2050;
var MONTH_AND_DATE = 0501;

var TransactionsList = function()
{
	this.transactionTableElement = $('#transactions-table')[0];

	this.transactions =

	[
		new Transaction(20160101, "Coffee", -2.49, "Chase", 1), 
		new Transaction(20160131, "UROP Deposit", 450, "Bank of America", 2),
		new Transaction(20160231, "UROP Deposit", 423, "Bank of America", 3),
		new Transaction(20160331, "UROP Deposit", 450, "Bank of America", 10),
		new Transaction(20160431, "UROP Deposit", 460, "Bank of America", 11),
		new Transaction(20160531, "UROP Deposit", 411, "Bank of America", 12),
		new Transaction(20160215, "La Verde's", -8.42, "MITFCU", 4),
		new Transaction(20160216, "La Verde's", -3.45, "MITFCU", 5),
		new Transaction(20160216, "La Verde's", -5.49, "MITFCU", 6),
		new Transaction(20160217, "La Verde's", -2.11, "MITFCU", 7),
		new Transaction(20160217, "La Verde's", -18.13, "MITFCU", 8),
		new Transaction(20160218, "La Verde's", -20.02, "MITFCU", 9)

	];

	this.filteredTransactions = this.transactions;
	this.accounts = [];

	this.clearRenderedList = function()
	{
		while (this.transactionTableElement.firstChild) {
			this.transactionTableElement.removeChild(this.transactionTableElement.firstChild);
		}
	}

	this.render = function()
	{
		for (var i=0; i<this.filteredTransactions.length; i++)
		{
			this.filteredTransactions.sort(function(a, b) {
				return a.date - b.date;
			});
			this.transactionTableElement.appendChild(createTableElement(this.filteredTransactions[i]));
		}
	}

	function generateTransactions(){
		transactionsList = []
		for (var i = 2017; i < ENDYEAR; i++) {
			transactionsList.push(new Expense(parseInt(i.toString() + MONTH_AND_DATE.toString()), "UROP Deposit", 450, "Bank of America", i-2016));
		}
		return transactionsList;
	}

	function createTableElement(transaction)
	{
		var tableElement = document.createElement('tr');

		var dateElement = document.createElement('td');
		dateElement.appendChild(document.createTextNode(transaction.dateToString()));

		var descriptionElement = document.createElement('td');
		descriptionElement.appendChild(document.createTextNode(transaction.description));

		var costElement = document.createElement('td');
		costElement.appendChild(document.createTextNode(transaction.cost.toString()));

		tableElement.appendChild(dateElement);
		tableElement.appendChild(descriptionElement);
		tableElement.appendChild(costElement);

		return tableElement;
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

	function parseDateValue(dateValue) {
		// dateValue is MM/DD/YYYY
		if (dateValue.length == 10) {
			var year = dateValue.substring(6,10);
			var month = dateValue.substring(0,2);
			var day = dateValue.substring(3,5);
			var yearMonthDay = year + month + day;
			return parseInt(yearMonthDay);
		} else {
			return null;
		}
	}

	function getTransactionTypeFilterValue() {
		var transactionsTypeFilterElement = $('#transactionsTypeFilter')[0];
		return transactionsTypeFilterElement.options[transactionsTypeFilterElement.selectedIndex].value;
	}

	function getTransactionsStartDate() {
		var transactionsStartDateElement = $('#transactionsStartDate')[0];
		// dateValue is MM/DD/YYYY
		var dateValue = transactionsStartDateElement.value;
		return parseDateValue(dateValue);
	}


	function getTransactionsEndDate() {
		var transactionsEndDateElement = $('#transactionsEndDate')[0];
		var dateValue = transactionsEndDateElement.value;
		// dateValue is MM/DD/YYYY
		return parseDateValue(dateValue);
	}

	function getAccounts() {
		var accounts = [];
		$('.transactions-account-check').each(function(i, el) {
			if (el.checked) {
    			accounts.push(el.value);
    		}
		});
		return accounts;
	}

	this.filterTransactions = function() {
		// var Transaction = function(date, description, cost, account, id)
		var transactionType, accountsList, startDate, endDate;
		transactionType = getTransactionTypeFilterValue();
		accountsList = getAccounts();
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