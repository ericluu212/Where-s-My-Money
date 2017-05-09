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
		new Transaction(20160229, "La Verde's", -5.49, "MITFCU", 6),
		new Transaction(20160317, "La Verde's", -2.11, "MITFCU", 7),
		new Transaction(20160217, "La Verde's", -18.13, "MITFCU", 8),
		new Transaction(20160418, "La Verde's", -20.02, "MITFCU", 9),
		new Transaction(20170101, "Tuition Payment", -3528, "Chase", 13),
		new Transaction(20160101, "Tuition Payment", -3487, "Chase", 14),
		new Transaction(20170601, "Tuition Payment", -4792, "Chase", 15),
		new Transaction(20160601, "Tuition Payment", -4523, "Chase", 16),
		new Transaction(20160631, "Microsoft Internship", 5567, "MITFCU", 17),
		new Transaction(20160731, "Microsoft Internship", 5603, "MITFCU", 18),
		new Transaction(20160831, "Microsoft Internship", 5743, "MITFCU", 19),
		new Transaction(20160931, "Amazon", -24.22, "Bank of America", 20),
		new Transaction(20170318, "Amazon", -34.28, "MITFCU", 21),
		new Transaction(20170318, "Amazon", -74.51, "Chase", 22),
		new Transaction(20170517, "Keg Party Supplier", -429.87, "Chase", 23),

	];

	this.filteredTransactions = this.transactions;

	this.accounts = [];
	this.colors = [];

	this.clearRenderedList = function()
	{
		// while (this.transactionTableElement.firstChild) {
		// 	this.transactionTableElement.removeChild(this.transactionTableElement.firstChild);
		// }
		for(var i=0; i< this.transactionTableElement.children.length; i++){
			if(this.transactionTableElement.children[i].tagName == 'TR'){
				this.transactionTableElement.removeChild(this.transactionTableElement.children[i]);
				i--;
			}
		}
	}

	this.render = function()
	{
		this.filteredTransactions.sort(function(a, b) {
			if((b.date - a.date) == 0){
				return a.id - b.id;
			}
			return b.date - a.date;
		});
		for (var i=0; i<this.filteredTransactions.length; i++)
		{
			//check if account exists
			if($.inArray(this.filteredTransactions[i].account, accountsArray) != -1){
				var nextTransaction = this.filteredTransactions[i];
				this.transactionTableElement.appendChild(this.createTableElement(nextTransaction));
			}
		}
	}

	this.createTableElement = function(transaction)
	{
		var tableElement = document.createElement('tr');

		var dateElement = document.createElement('td');
		dateElement.appendChild(document.createTextNode(transaction.dateToString()));

		var descriptionElement = document.createElement('td');
		descriptionElement.appendChild(document.createTextNode(transaction.description));

		var costElement = document.createElement('td');
		if (transaction.cost < 0){
			costElement.appendChild(document.createTextNode("-$" + transaction.cost.toString().substring(1)));
		}
		else{
			costElement.appendChild(document.createTextNode("$" + transaction.cost.toString()));
		}

		// var balanceElement = document.createElement('td');
		// if (transaction.balance < 0) {
		// 	balanceElement.appendChild(document.createTextNode("-$" + transaction.balance.toString().substring(1)));
		// }
		// else{
		// 	balanceElement.appendChild(document.createTextNode("$" + transaction.balance.toString()));
		// }

		tableElement.appendChild(dateElement);
		tableElement.appendChild(descriptionElement);
		tableElement.appendChild(costElement);
		// tableElement.appendChild(balanceElement);

		var account = transaction.account;
		var colorIndex = this.accounts.indexOf(account);
		tableElement.style.backgroundColor = this.colors[colorIndex][1];

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
    			// accounts.push(el.value);
    			accounts.push(el.innerHTML);
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
