var ENDYEAR = 2050;
var MONTH_AND_DATE = "0501";
var ExpensesList = function()
{
	this.expenseTableElement = $('#expenses-table')[0];

	this.expenses = generateExpenses();
	this.filteredexpenses = this.expenses;
	this.accounts = [];

	this.clearRenderedList = function()
	{
		while (this.expenseTableElement.firstChild) {
			this.expenseTableElement.removeChild(this.expenseTableElement.firstChild);
		}
	}

	this.render = function()
	{
		for (var i=0; i<this.filteredexpenses.length; i++)
		{
			this.expenseTableElement.appendChild(createTableElement(this.filteredexpenses[i]));
		}
	}


	function generateExpenses(){
		expenseList = []
		for (var i = 2017; i < ENDYEAR; i++){
			expenseList.push(new Expense(parseInt(i.toString() + MONTH_AND_DATE.toString()), "Rent Boston", -3000, "Chase", i - 2016));
		}
		return expenseList;
	}

	function createTableElement(expense)
	{
		var tableElement = document.createElement('tr');

		var dateElement = document.createElement('td');
		dateElement.appendChild(document.createTextNode(expense.dateToString()));

		var descriptionElement = document.createElement('td');
		descriptionElement.appendChild(document.createTextNode(expense.description));

		var costElement = document.createElement('td');
		costElement.appendChild(document.createTextNode(expense.cost.toString()));

		tableElement.appendChild(dateElement);
		tableElement.appendChild(descriptionElement);
		tableElement.appendChild(costElement);

		return tableElement;

	}

	function getAccounts() {
		var accounts = [];
		$('.expenses-account-check').each(function(i, el) {
			if (el.checked) {
    			accounts.push(el.value);
    		}
		});
		return accounts;
	}

	function accountsFilter(expensesList, accountsList) {
		return expensesList.filter(function(expense) {
			return $.inArray(expense.account, accountsList) > -1;
		});
	}

	function datesFilter(expensesList, startDate, endDate) {
		// Date style is Year Month Day=>20161231
		return expensesList.filter(function(expense) {
			if (startDate && endDate) {
				return (startDate <= expense.date && endDate >= expense.date);
			} else if (startDate) {
				return (startDate <= expense.date);
			} else if (endDate) {
				return (endDate >= expense.date);
			} else {
				return true;
			}
		});
	}

	function getExpensesStartDate() {
		var expensesStartDateElement = $('#expensesStartDate')[0];
		var dateValue = expensesStartDateElement.value;
		return parseDateValue(dateValue);
	}

	function getExpensesEndDate() {
		var expensesEndDateElement = $('#expensesEndDate')[0];
		var dateValue = expensesEndDateElement.value;
		return parseDateValue(dateValue);
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

	this.filterExpenses = function() {
		// var expense = function(date, description, cost, account, id)
		var accountsList, startDate, endDate;
		accountsList = getAccounts();
		startDate = getExpensesStartDate();
		endDate = getExpensesEndDate();

		this.filteredexpenses = this.expenses;

		this.filteredexpenses = datesFilter(this.filteredexpenses, startDate, endDate);
		this.filteredexpenses = accountsFilter(this.filteredexpenses, accountsList);
	}
}