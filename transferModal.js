function showTransfer(){
	// Get the modal
	var modal = document.getElementById('transferModal');
	// Get the <span> element that closes the modal
	var span = document.getElementById("closeTransfer");
	//transfer button
	var btn = document.getElementById('transferBtn');
	// When the user clicks the button, open the modal 
	var transferError = document.getElementById("transferAlert");
	transferError.style.visibility = "hidden";
	transferError.innerHTML ="";

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
		transferError.style.visibility = "hidden";
		transferError.innerHTML ="";
		a = validateAccounts();
		c = validateCurrency();
		if(a && c){
			modal.style.display = "none";
			document.getElementById('fromList').value = 'initial';
			document.getElementById('toList').value = 'initial';
			var currency = document.getElementById("Amount").value = '';
			showTransferSuccess();
		}
	}

	function validateAccounts(){
		var account1 = document.getElementById('fromList').value;
		var account2 = document.getElementById('toList').value;
		if(account1 == '' || account2 == ''){
			//alert("Both a To and From account must be selected.");
			transferError.innerHTML = "Both a 'To' and 'From' account must be selected."
			transferError.style.visibility = "visible";
			return false;
		}else if(account1 == account2){
			//alert("Transfer must be between different accounts.");
			transferError.innerHTML = "Transfer must be between different accounts."
			transferError.style.visibility = "visible";
			return false;
		}else{
			return true;
		}
	}

	function validateCurrency(){
		var currency = document.getElementById("Amount").value;
		if(!currency.includes('.')){
			currency = currency + ".00";
		}
		var regex  = /^\d+(?:\.\d{2})$/;
		if(regex.test(currency)){
			return true;
		}else{
			//alert("Invalid currency value.");
			var transferError = document.getElementById("transferAlert");
			transferError.innerHTML = "Invalid currency value."
			transferError.style.visibility = "visible";
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

	//create list of bank accounts
	var accountsList = document.getElementById("accountsList");
	while (accountsList.firstChild) {
    	accountsList.removeChild(accountsList.firstChild);
	}
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