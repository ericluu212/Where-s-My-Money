function showTransfer(){
	// Get the modal
	var modal = document.getElementById('transferModal');

	// Get the <span> element that closes the modal
	var span = document.getElementById("closeTransfer");

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