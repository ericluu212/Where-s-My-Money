function removeAccount(){
    if (confirm("Are you sure you want to remove all of the selected accounts?") == true) {
		for(var i=0; i<accountsArray.length; i++){
			if(document.getElementById(accountsArray[i]).className == 'highlight'){
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
    }
	
}

function showAddAccounts(){
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
			renderAccountsOptions($('#transactionsAccountsFilter')[0]);
			renderAccountsOptions($('#elementsAccountsFilter')[0]);
			transactionsList.clearRenderedList();
			expensesList.clearRenderedList();
			transactionsList.render();
			expensesList.render();
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
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
}
