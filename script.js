let key = 'qpreuJ70Kafi6gl372wimbDDsf1vcuE5Dto3diw2tV1F9FZJ8t';
let secret = 'uMrJHecgPCPWs1C7jrIVEbAseJevbkKhKJp0A4o9';
let org = 'SPCA'

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
getAuthToken();
}

async function getAuthToken() {
    // POST Request (To get Access Token)

    let apiUrl = 'https://api.petfinder.com/v2/oauth2/token';
fetch(apiUrl, {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) {

	// Return the response as JSON
	return resp.json();

}).then(function (data) {

	// Log the API data
	console.log('token', data);
    var dataToken = data.access_token;
    document.getElementById("displayResponse").innerText = dataToken;
    
	// This one uses the token we received for authentication
	//return fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&status=' + status, {
    return fetch('https://api.petfinder.com/v2/animals?location=98004&type=dog', {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

}).then(function (resp) {

	// Return the API response as JSON
	return resp.json();

}).then(function (data) {

	// Log the pet data
	console.log('pets', data);
	document.getElementById("searchResult").innerHTML = JSON.stringify(data.animals[0]);

}).catch(function (err) {

	// Log any errors
	console.log('something went wrong', err);

});
}
