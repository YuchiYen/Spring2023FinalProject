let zip = document.getElementById('zip');
let animal = document.getElementById('animal');
let form = document.getElementById('myForm');
let goodWithChildren = document.getElementById('goodWithChildren');
let goodWitDogs = document.getElementById('goodWitDogs');
let goodWitCats = document.getElementById('goodWitCats');
let houseTrained = document.getElementById('houseTrained');
let male = document.getElementById('male');
let female = document.getElementById('female');
let small = document.getElementById('small');
let medium = document.getElementById('medium');
let large = document.getElementById('large');
let xlarge = document.getElementById('xlarge');
let preferredSelection;
let isPaused = false;
let searchResult = document.getElementById('searchResult');
const image = document.getElementById('img_to_flip'); 

	var i = 0;
	var pics = ["animal-1.jpg", "animal-2.jpg", "animal-3.jpg", "animal-4.jpg","animal-5.jpg"];
	
	const toggle = () => {
	   image.src = pics[i]; // set the image
	  i = (i + 1) % pics.length; // update the counter
	}
	let interval = setInterval(toggle, 1000);

 
function retrieveFields() {
	let savedSelection = localStorage.getItem('preferredSelection');

	var savedObj = {};
	//type = cat & location=98004 & page=1 & gender=male & good_with_children=true & good_with_dogs=true & good_with_cats=true & house_trained=true & size=small

	savedSelection.split('&').forEach((item) => {
		let p = item.split('=');
		savedObj[p[0]] = p[1];
	});

	if (savedObj.type != undefined)
		animal.value = savedObj.type;

	if (savedObj.location != undefined)
		zip.value = savedObj.location;

	if (savedObj.gender != undefined) {
		savedObj.gender.split(',').forEach((g) => {
			if (g == "male")
				male.checked = true;
			if (g == "female")
				female.checked = true;
		})
	}

	if (savedObj.size != undefined) {
		savedObj.size.split(',').forEach((s) => {
			switch (s) {
				case "small":
					small.checked = true;
					break;
				case "medium":
					medium.checked = true;
					break;
				case "large":
					large.checked = true;
					break;
				case "xlarge":
					xlarge.checked = true;
					break;
				default:
					break;
			}
		})
	}

	if (savedObj.good_with_children != undefined && savedObj.good_with_children === "true" )
	goodWithChildren.checked = true;

	if (savedObj.good_with_dogs != undefined && savedObj.good_with_dogs === "true")
		goodWitDogs.checked = true;

	if (savedObj.good_with_cats != undefined && savedObj.good_with_cats === "true")
		goodWitCats.checked = true;

	if (savedObj.house_trained != undefined && savedObj.house_trained === "true")
		houseTrained.checked = true;
}

async function getPets() {
    // POST Request (To get Access Token)
    let apiUrl = 'https://api.petfinder.com/v2/oauth2/token';
	fetch(apiUrl, {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + API_KEY + '&client_secret=' + CLIENT_SECRET,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) {
	// Return the response as JSON
	return resp.json();

}).then(function (data) {
	// Log the API data
	console.log('token', data);	

	localStorage.setItem("preferredSelection", preferredSelection);

    return fetch(`https://api.petfinder.com/v2/animals?${preferredSelection}`, {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}).then(function (resp) {
	// Return the API response as JSON
	return resp.json();

}).then(function (data) {
		//parse the display the response data
	displayAnimals(data.animals);	

}).catch(function (err) {
	// Log any errors
	console.log('something went wrong', err);
});
}

function buildQueryStringForAPICall(){

	preferredSelection = `type=${animal.value}&location=${zip.value}&page=1`;

	const genders = document.querySelectorAll('input[name="gender"]:checked');

	let genderValue = '';
	genders.forEach((checkbox) => {
		genderValue += checkbox.value;
		genderValue += ','
	});
	if (genderValue.length > 0)	{	
		genderValue = genderValue.substring(0, genderValue.length - 1);
		preferredSelection += `&gender=${genderValue}`;
	}

	if (document.getElementById('goodWithChildren').checked) 
		preferredSelection += '&good_with_children=true';

	if (document.getElementById('goodWitDogs').checked) 
		preferredSelection += '&good_with_dogs=true';	

	if (document.getElementById('goodWitCats').checked) 
		preferredSelection += '&good_with_cats=true';		
	
	if (document.getElementById('houseTrained').checked) 
		preferredSelection += '&house_trained=true';		
	
	const sizes = document.querySelectorAll('input[name="size"]:checked');

	let sizeValue = '';
	sizes.forEach((checkbox) => {
		sizeValue += checkbox.value;
		sizeValue += ','
	});
	if (sizeValue.length > 0) {
		sizeValue = sizeValue.substring(0, sizeValue.length - 1);
		preferredSelection += `&size=${sizeValue}`;
	}
}

async function displayAnimals(animals){
		// Log the pet data
		console.log('pets', animals);
		document.querySelector("#searchResult").innerHTML ="";
		animals.forEach((animal)=>{
				let pet = new Animal(animal);
			let div = pet.BuildDiv();
		})
}

const checkValidation = (e) => {	
	e.preventDefault();		
	let zipError = document.getElementById('zipError');
	zipError.innerText = '';
	zipError.classList.add('hidden');	

	let regex = new RegExp(/^\d{5}$/);

	if (!zip.value.match(regex)) {
		zip.validity.valid = false;
		zipError.innerText += 'Please Enter 5 Digit Zip Code';
		zipError.classList.remove('hidden');

		zip.setCustomValidity(`The Zip format is wrong`);
		zip.reportValidity();
		zip.classList.add('invalid');
		zip.classList.remove('valid');
		return false;
	}		
	zip.validity.valid = true;
	zip.classList.remove('invalid');
	zip.classList.add('valid');
	zip.setCustomValidity(``);
	return true;
}

document.addEventListener('DOMContentLoaded', retrieveFields);

form.addEventListener('submit', (e) => {
	if (checkValidation(e)){
		buildQueryStringForAPICall();
		getPets();
	}	 
	e.preventDefault();		
});

zip.addEventListener("change", () => {
	if (zip.classList.contains('invalid'))
	checkValidation();
})

image.addEventListener("click", () => {
	if (isPaused === false) {
		clearInterval(interval);
		isPaused = true;
	}else{
		interval = setInterval(toggle, 1000);
		isPaused = false;
	}
});