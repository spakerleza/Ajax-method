function extract() {
	for(var key in variable) {
		window[key] = variable[key];
	}
}

var http = {};

/*
* Aurgument Map
* http.ajax({method: "", params: "" ,url: "",type: ""}, function(callback){});
*
* data (pass as object):	Method: POST OR GET,
* 							params: Your parameters or NULL in case of GET,
* 							url: The path url,
* 							type: Enter FormData or Null
*
* callback(pass as a function): To get a return of the ajax request call
*/


http.ajax = function(data, callback) {
	extract(data);

	var action = method.toUpperCase(); // POST or GET
	
	var request;
	try {request = new XMLHttpRequest();/*All browsers except internet explora*/}
	catch (e1) {
		try {request = new ActiveXObject("Msxml2.XMLHTTP"); /*for indernet explora*/}
		catch (e2) {
			try {request = new ActiveXObject("Microsoft.XMLHTTP"); /*for internet explora*/}
			catch (e3) {request = false;}
		}
	}

	request.open(action, url, true);

	if (action == "POST") {
		if (type === null) {
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}
	}

	if (callback !== false && callback !== undefined) {
		request.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					if (this.responseText.trim() !== null) {
						callback(this.responseText);
					}
				}
			}	
		};
	}

	// send request
	switch(action) {
		case "POST" : 
			request.send(params);
			break;

		case "GET" : 
			request.send();
			break;

		default :
			alert("error");
			break;
	} 
};
