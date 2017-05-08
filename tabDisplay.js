function revealTransactions(){
	var areTransactionsVisible = $("#transactions-container").css("visibility");
	if (areTransactionsVisible == "hidden"){
		$("#transactions-container").css("visibility", "visible");
		$("#show-transactions").text("Hide Transactions");
	}
	else{
		$("#transactions-container").css("visibility", "hidden");
		$("#show-transactions").text("Show Transactions");

	}
}

function revealExpenses(){
	var areExpensesVisible = $("#expenses-container").css("visibility");
	if (areExpensesVisible == "hidden"){
		$("#expenses-container").css("visibility", "visible");
		$("#show-expenses").text("Hide Expenses");
	}
	else{
		$("#expenses-container").css("visibility", "hidden");
		$("#show-expenses").text("Show Expenses");

	}
}