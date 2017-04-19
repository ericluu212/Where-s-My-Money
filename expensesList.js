var ExpensesList = function()
{
	this.expenseListElement = $('#expenses-list')[0];

	this.expenses = [
		new Expense(20170501, "Rent Boston", -1500, "Chase", 1), 
		new Expense(20170601, "Rent Boston", -1500, "Chase", 2),
		new Expense(20170721, "Rent San Francisco", -3000, "Chase", 3)
		];
	this.filteredexpenses = this.expenses;
	this.accounts = [];

	this.clearRenderedList = function()
	{
		while (this.expenseListElement.firstChild) {
			this.expenseListElement.removeChild(this.expenseListElement.firstChild);
		}
	}

	this.render = function()
	{
		for (var i=0; i<this.filteredexpenses.length; i++)
		{
			this.expenseListElement.appendChild(createListElement(this.filteredexpenses[i]));
		}
	}

	function createListElement(expense)
	{
		var listElement = document.createElement('ol');
		listElement.appendChild(document.createTextNode(expense.cost.toString()));
		return listElement;
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
			var year = dateValue.substr(6,10);
			var month = dateValue.substr(0,2);
			var day = dateValue.substr(3,5);
			var yearMonthDay = year + month + day;
			return parseInt(yearMonthDay);
		} else {
			return null;
		}
	}

	this.filterExpenses = function() {
		// var expense = function(date, description, cost, account, id)
		var accountsList, startDate, endDate;
		accountsList = this.accounts;
		startDate = getExpensesStartDate();
		endDate = getExpensesEndDate();

		this.filteredexpenses = this.expenses;

		this.filteredexpenses = datesFilter(this.filteredexpenses, startDate, endDate);
		this.filteredexpenses = accountsFilter(this.filteredexpenses, accountsList);
	}
}