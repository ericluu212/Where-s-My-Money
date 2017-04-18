function showTransfer(){
	// Get the modal
	var modal = document.getElementById('transferModal');

	// Get the <span> element that closes the modal
	var span = document.getElementById("closeTransfer");

	//transfer button
	var btn = document.getElementById('transferBtn')

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

	btn.onclick = function(){
		a = validateAccounts();
		c = validateCurrency();
		if(a && c){
			modal.style.display = "none";
			document.getElementById('fromList').value = 'default';
			document.getElementById('toList').value = 'default';
			var currency = document.getElementById("Amount").value = '';
			showTransferSuccess();
		}
	}

	function validateAccounts(){
		var account1 = document.getElementById('fromList').value;
		var account2 = document.getElementById('toList').value;
		if(account1 == '' || account2 == '' || account1 == account2){
			alert("Invalid accounts");
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
			alert("Invalid currency value.");
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

	// When the user clicks the button, open the modal 
	modal.style.display = "block";

	//create list of bank accounts
	var accountsList = document.getElementById("accountsList");
	while (accountsList.firstChild) {
    	accountsList.removeChild(accountsList.firstChild);
	}
	for (var i = 0; i < accountsArray.length; i++) {
		var element = document.createElement("li");
		element.innerHTML = accountsArray[i];
    	accountsList.appendChild(element);
	}

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