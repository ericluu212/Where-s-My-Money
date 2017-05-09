var ENDYEAR = 2050;
var MONTH_AND_DATE = "0501";
var ExpensesList = function()
{
	this.expenseTableElement = $('#expenses-table')[0];

	//this.expenses = generateExpenses();
	this.expenses =

	[
		new Transaction(20170401, "Rent Boston", -2000, "Chase", 1),
		new Transaction(20170401, "Housing", -1000, "MITFCU", 2),
		new Transaction(20170401, "Food Money", -100, "MITFCU", 3),
		new Transaction(20170501, "Rent Boston", -2000, "Chase", 4),
		new Transaction(20170501, "Housing", -1000, "MITFCU", 5),
		new Transaction(20170501, "Food Money", -100, "MITFCU", 6),
		new Transaction(20170601, "Rent Boston", -2000, "Chase", 7),
		new Transaction(20170701, "Rent Boston", -2000, "Chase", 8),
		new Transaction(20170801, "Rent Boston", -2000, "Chase", 9),
		new Transaction(20170901, "Rent Boston", -2000, "Chase", 10),
		new Transaction(20170901, "Housing", -1000, "MITFCU", 11),
		new Transaction(20170901, "Food Money", -100, "MITFCU", 12),
		new Transaction(20171003, "Rent Boston", -2000, "Chase", 13),
		new Transaction(20171001, "Housing", -1000, "MITFCU", 14),
		new Transaction(20171001, "Food Money", -100, "MITFCU", 15),
		new Transaction(20171101, "Rent Boston", -2000, "Chase", 16),
		new Transaction(20171201, "Housing", -1000, "MITFCU", 17),
		new Transaction(20171201, "Food Money", -100, "MITFCU", 18),
		new Transaction(20171201, "Rent Boston", -2000, "Chase", 19),
		new Transaction(20171201, "Housing", -1000, "MITFCU", 20),
		new Transaction(20171201, "Food Money", -100, "MITFCU", 21),
		new Transaction(20170416, "MIT Tuition", -200, "Bank of America", 22),
		new Transaction(20170516, "MIT Tuition", -200, "Bank of America", 23),
		new Transaction(20170616, "MIT Tuition", -200, "Bank of America", 24),
		new Transaction(20170716, "MIT Tuition", -200, "Bank of America", 25),
		new Transaction(20170816, "MIT Tuition", -200, "Bank of America", 26),
		new Transaction(20170901, "Meal Plan", -2000, "MITFCU", 27),
		new Transaction(20170916, "MIT Tuition", -200, "Bank of America", 28),
		new Transaction(20171016, "MIT Tuition", -200, "Bank of America", 29),
		new Transaction(20171116, "MIT Tuition", -200, "Bank of America", 30),
		new Transaction(20171216, "MIT Tuition", -200, "Bank of America", 31),

	];
	this.filteredexpenses = this.expenses;
	this.accounts = [];
	this.colors = [];

	this.clearRenderedList = function()
	{
		// while (this.expenseTableElement.firstChild) {
		// 	this.expenseTableElement.removeChild(this.expenseTableElement.firstChild);
		// }
		for(var i=0; i< this.expenseTableElement.children.length; i++){
			if(this.expenseTableElement.children[i].tagName == 'TR'){
				this.expenseTableElement.removeChild(this.expenseTableElement.children[i]);
				i--;
			}
		}
	}

	this.render = function()
	{
		this.filteredexpenses.sort(function(a, b) {

			if(a.date == b.date){
				return a.id - b.id;
			}
			return a.date - b.date;
		});
		for (var i=0; i<this.filteredexpenses.length; i++)
		{
			//this.expenseTableElement.appendChild(this.createTableElement(this.filteredexpenses[i]));
			if($.inArray(this.filteredexpenses[i].account, accountsArray) != -1){
				this.expenseTableElement.appendChild(this.createTableElement(this.filteredexpenses[i]));
			}
		}
	}


	//function generateExpenses(){
	// 	expenseList = []
	// 	for (var i = 2017; i < ENDYEAR; i++){
	// 		expenseList.push(new Expense(parseInt(i.toString() + MONTH_AND_DATE.toString()), "Rent Boston", -3000, "Chase", i - 2016));
	// 	}
	// 	return expenseList;
	// }

	this.createTableElement = function(expense)
	{
		var tableElement = document.createElement('tr');

		var dateElement = document.createElement('td');
		dateElement.appendChild(document.createTextNode(expense.dateToString()));

		var descriptionElement = document.createElement('td');
		descriptionElement.appendChild(document.createTextNode(expense.description));

		var costElement = document.createElement('td');
		if (expense.cost.toString().substring(0,1) == '-'){
			costElement.appendChild(document.createTextNode("-$" + expense.cost.toString().substring(1)));
		}
		else{
			costElement.appendChild(document.createTextNode("$" + expense.cost.toString()));
		}

		tableElement.appendChild(dateElement);
		tableElement.appendChild(descriptionElement);
		tableElement.appendChild(costElement);

		var account = expense.account;
		var colorIndex = this.accounts.indexOf(account);
		tableElement.style.backgroundColor = this.colors[colorIndex][1];

		return tableElement;

	}

	function getAccounts() {
		var accounts = [];
		$('.expenses-account-check').each(function(i, el) {
			if (el.checked) {
    			accounts.push(el.innerHTML);
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
