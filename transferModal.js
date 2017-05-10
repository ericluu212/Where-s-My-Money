function showTransfer(){
	// Get the modal
	var modal = document.getElementById('transferModal');
	// Get the <span> element that closes the modal
	var span = document.getElementById("closeTransfer");
	//transfer button
	var btn = document.getElementById('transferBtn');
	// When the user clicks the button, open the modal 
	var transferErrorAccounts = document.getElementById("transferAlertAccounts");
	var transferErrorCurrency = document.getElementById("transferAlertCurrency");
	var currencyInput = document.getElementById("Amount");
	var toList = document.getElementById('toList');
	var fromList = document.getElementById('fromList');

	transferErrorAccounts.style.visibility = "hidden";
	transferErrorAccounts.innerHTML ="";
	transferErrorCurrency.style.visibility = "hidden";
	transferErrorCurrency.innerHTML ="";
	currencyInput.style.borderColor = "initial";
	currencyInput.style.borderStyle = "inset";
	toList.style.borderColor = "initial";
	fromList.style.borderColor = "initial";

	modal.style.display = "block";
	// When the user clicks on <span> (x), close the modal
	populateDropdown();
	function populateDropdown(){
		var fromDropdown = document.getElementById("fromList");
		var toDropdown = document.getElementById("toList");
		for(var i=0; i<fromDropdown.children.length;i++){
			if(!fromDropdown.children[i].disabled){
				fromDropdown.removeChild(fromDropdown.children[i]);
				i--;
			}else{
				fromDropdown.children[i].selected = true;
			}
		}
		for(var i=0; i<toDropdown.children.length;i++){
			if(!toDropdown.children[i].disabled){
				toDropdown.removeChild(toDropdown.children[i]);
				i--;
			}else{
				toDropdown.children[i].selected = true;
			}
		}
		for(var i=0; i<accountsArray.length;i++){
			var account = document.createElement("option");
			var accountCopy = document.createElement("option");
			account.value = accountsArray[i];
			account.innerHTML = accountsArray[i];
			accountCopy.value = accountsArray[i];
			accountCopy.innerHTML = accountsArray[i];
			fromDropdown.appendChild(account);
			toDropdown.appendChild(accountCopy);
		}
	}
	span.onclick = function() {
	    modal.style.display = "none";
	    document.getElementById('fromList').value = 'initial';
		document.getElementById('toList').value = 'initial';
		var currency = document.getElementById("Amount").value = '';
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	        document.getElementById('fromList').value = 'initial';
			document.getElementById('toList').value = 'initial';
			var currency = document.getElementById("Amount").value = '';
	    }
	}

	btn.onclick = function(){
		transferErrorCurrency.style.visibility = "hidden";
		transferErrorAccounts.style.visibility = "hidden";
		transferErrorCurrency.innerHTML ="";
		transferErrorAccounts.innerHTML ="";
		currencyInput.style.borderColor = "initial";
		currencyInput.style.borderStyle = "inset";
		toList.style.borderColor = "initial";
		fromList.style.borderColor = "initial";
		c = validateCurrency();
		a = validateAccounts();
		if(a && c){
			modal.style.display = "none";
			var toAccount = document.getElementById('fromList').value;
			var fromAccount = document.getElementById('toList').value;
			var amount = document.getElementById('Amount').value;
			var today = new Date();
			var year = today.getFullYear().toString();
			var month = (today.getMonth()+1).toString();
			if(parseInt(month) < 10){
				month = "0" + month;
			}
			var day = today.getDate().toString();
			if(parseInt(day) < 10){
				day = "0" + day;
			}
			date = parseInt(year+month+day);
			var currency = document.getElementById("Amount").value = '';
			var toAmount = parseInt(amount);
			var fromAmount = parseInt("-" + amount);
			var toId = transactionsList.length + 2;
			var fromId = transactionsList.length + 1;
			var fromTransaction = new Transaction(date, "Transfer", fromAmount, toAccount, fromId);
			var toTransaction = new Transaction(date, "Transfer", toAmount, fromAccount, toId);
			transactionsList.transactions.push(fromTransaction);
			transactionsList.transactions.push(toTransaction);
			transactionsList.clearRenderedList();
			transactionsList.render();
			renderAccountBalances();
			document.getElementById('fromList').value = 'initial';
			document.getElementById('toList').value = 'initial';
			showTransferSuccess();
			setTimeout(closeTransferSuccess, 1000);
		}
	}

	function validateAccounts(){
		var account1 = document.getElementById('fromList').value;
		var account2 = document.getElementById('toList').value;
		if(account1 == '' || account2 == ''){
			transferErrorAccounts.innerHTML = "Both a 'To' and 'From' account must be selected."
			transferErrorAccounts.style.visibility = "visible";
			if(account1 == ''){
				fromList.style.borderColor = 'red';
			}
			if(account2 == ''){
				toList.style.borderColor = "red";
			}
			return false;
		}
		if(account1 == account2){
			transferErrorAccounts.innerHTML = "Transfer must be between different accounts."
			transferErrorAccounts.style.visibility = "visible";
			toList.style.borderColor = "red";
			fromList.style.borderColor = "red";
			return false;
		}
		return true;
		
	}

	function validateCurrency(){
		var currency = document.getElementById("Amount").value;
		if(!currency.includes('.')){
			currency = currency + ".00";
		}
		currency = currency.replace(/^0+/, '');
		var regex  = /^\d+(?:\.\d{2})$/;
		if(regex.test(currency) && parseInt(currency) != 0){
			return true;
		}else{
			//alert("Invalid currency value.");
			transferErrorCurrency.innerHTML = "Invalid currency value."
			transferErrorCurrency.style.visibility = "visible";
			currencyInput.style.borderColor = "red";
			currencyInput.style.borderStyle = "solid";
			return false;
		}
	}
}


function showTransferSuccess(){
	// Get the modal
	var modal = document.getElementById('transferSuccessModal');
	// Get the <span> element that closes the modal
	var span = document.getElementById("closeTransferSuccess");
	// When the user clicks the button, open the modal 
	modal.style.display = "block";
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
}


function showAccounts(){
	// Get the modal
	var modal = document.getElementById('accountsModal');
	// Get the <span> element that closes the modal
	var span = document.getElementById("closeAccounts")
	//remove button
	var removeBtn = document.getElementById('remove-account-button');
	//add button
	var addBtn = document.getElementById('add-account-button');
	// When the user clicks the button, open the modal 
	modal.style.display = "block";

	/*for (var i = 0; i < accountsArray.length; i++) {
  		var checkbox = document.createElement('input');
  		checkbox.type = "checkbox";
		checkbox.name = accountsArray[i];
		checkbox.value = accountsArray[i];
		checkbox.id = accountsArray[i];
		var label = document.createElement('label')
		label.htmlFor = accountsArray[i];
		label.appendChild(document.createTextNode(accountsArray[i]));
		accountsList.appendChild(checkbox);
		accountsList.appendChild(label);
	}*/
	makeTable();
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}

	removeBtn.onclick = function(){
	    if (confirm("Are you sure you want to remove all of the selected accounts?") == true) {
	        var accountsList = document.getElementById("accountsList");
			/*for(var i=0; i<accountsList.children.length; i++){
				if(accountsList.children[i].tagName == 'LABEL'){
					var elem = document.getElementById(accountsList.children[i].htmlFor);
					if(elem.checked){
						accountsList.removeChild(accountsList.children[i]);
						accountsList.removeChild(elem);
					}
				}
			}*/
			for(var i=0; i<accountsArray.length; i++){
				if(document.getElementById(accountsArray[i]+"checkbox").checked){
					var row = document.getElementById(accountsArray[i]+"row");
					row.parentNode.removeChild(row);
					accountsArray.splice(i, 1);
					transactionsList.accounts = accountsArray;
					expensesList.accounts = accountsArray;
					renderAccountsOptions($('#transactionsAccountsFilter')[0]);
					renderAccountsOptions($('#elementsAccountsFilter')[0]);
					transactionsList.clearRenderedList();
					expensesList.clearRenderedList();
					transactionsList.render();
					expensesList.render();
					i--;
				}
			}
			//update array of accounts
			/*accountsArray = [];
			for(var i=0; i<accountsList.children.length; i++){
				if(accountsList.children[i].tagName == 'INPUT'){
					accountsArray.push(accountsList.children[i].id);
				}
			}*/
	    }
		
	}

	addBtn.onclick = function(){
		var modal = document.getElementById('addAccountModal');
		// Get the <span> element that closes the modal
		var span = document.getElementById("closeAddAccount");
		//create button
		var btn = document.getElementById('create-button');
		// When the user clicks the button, open the modal 
		modal.style.display = "block";
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		    modal.style.display = "none";
		}
		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		        showAccounts();
		    }
		}
		btn.onclick = function(){
			validNumber = validateAccountNumber();
			if(validNumber){
				var accountName = document.getElementById('accountName').value;
				accountsArray.push(accountName);
				makeTable();
				/*var checkbox = document.createElement('input');
		  		checkbox.type = "checkbox";
				checkbox.name = accountName;
				checkbox.value = accountName;
				checkbox.id = accountName;
				var label = document.createElement('label')
				label.htmlFor = accountName;
				label.appendChild(document.createTextNode(accountName));
				accountsList.appendChild(checkbox);
				accountsList.appendChild(label);*/
				modal.style.display = "none";
				document.getElementById('accountName').value = '';
				document.getElementById('accountNumber').value = '';
				showAddSuccess();
			}
		}
		function validateAccountNumber(){
			var accountNumber = document.getElementById("accountNumber").value;
			var regex  = /^\d+/;
			if(regex.test(accountNumber)){
				return true;
			}else{
				alert("Invalid account number.");
				return false;
			}
		}
	}
}

function makeTable(){
	var table = document.getElementById("accountsTable");
	$("#accountsTable tr").remove(); 
	for (var i = 0; i < accountsArray.length; i++) {
  		var checkbox = document.createElement('input');
  		checkbox.type = "checkbox";
		checkbox.name = accountsArray[i];
		checkbox.value = accountsArray[i];
		checkbox.id = accountsArray[i]+"checkbox";
		var label = document.createElement('label');
		label.htmlFor = accountsArray[i]+"checkbox";
		label.appendChild(document.createTextNode(accountsArray[i]));
		label.style.fontSize = "16px";
		checkbox.style.transform = "scale(1.1)";
		var row = document.createElement("tr");
		row.id = accountsArray[i]+"row";
		var labelCell = document.createElement("td");
		var checkboxCell = document.createElement("td");
		//labelCell.id = accountsArray[i]+"label";
		//checkboxCell.id = accountsArray[i]+"checkbox";
		checkboxCell.appendChild(checkbox);
		labelCell.appendChild(label);
		row.appendChild(checkboxCell);
		row.appendChild(labelCell);
		table.appendChild(row);
	}
}

function showAddSuccess(){
	// Get the modal
	var modal = document.getElementById('addAccountSuccessModal');
	// Get the <span> element that closes the modal
	var span = document.getElementById("closeAddAccountSuccess");
	// When the user clicks the button, open the modal 
	modal.style.display = "block";
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	    showAccounts();
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
}

function closeTransferSuccess(){
	// Get the modal
	var modal = document.getElementById('transferSuccessModal');
	modal.style.display = "none";
}