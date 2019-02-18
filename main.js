// Data members length
let members = data.results[0].members;

// Starting the filter
let republican = document.getElementById('republican');
let democrat = document.getElementById('democrat');
let independant = document.getElementById('independant');

// Event listeners
republican.addEventListener('click', isChecked);
democrat.addEventListener('click', isChecked);
independant.addEventListener('click', isChecked);

// Function to determine if politician has a middle name
function middleName(firstName, middleName, lastName) {
	if (middleName === null) {
		return firstName + ' ' + lastName;
	} else {
		return firstName + ' ' + middleName + ' ' + lastName;
	}
}

function partyRep(partyType) {
	if (partyType.innerHTML === 'R') {
		return (partyType.parentNode.className = 'r states ');
	} else if (partyType.innerHTML === 'D') {
		return (partyType.parentNode.className = 'd states ');
	} else if (partyType.innerHTML === 'I') {
		return (partyType.parentNode.className = 'i states ');
	} else {
		console.log('Nothing here!');
	}
}

// Create States Array

var usstate = [];

function stateArray() {
	for (i = 0; i < members.length; i++) {
		usstate.push(members[i].state);
	}
}
stateArray();

// Remove Duplicate States
let statesArray = [ ...new Set(usstate) ];

// creating the table
let div = document.querySelector('#table');
div.className = 'container table-responsive-md';
let table = document.createElement('table');
table.className = 'table table-sm table-bordered container';
div.appendChild(table);

// function to create the table based on the data given.

function congressTable() {
	let tHeader = document.createElement('thead');
	tHeader.className = 'table-dark';
	let header = document.createElement('tr');
	let nameHeader = document.createElement('th');
	let partyHeader = document.createElement('th');
	let stateHeader = document.createElement('th');
	let seniorityHeader = document.createElement('th');
	let percentageHeader = document.createElement('th');

	// Titles for th elements
	nameHeader.innerHTML = 'Name';
	partyHeader.innerHTML = 'Party';
	stateHeader.innerHTML = 'State';
	seniorityHeader.innerHTML = 'Years In Office';
	percentageHeader.innerHTML = 'Votes With Party';

	header.appendChild(nameHeader);
	header.appendChild(partyHeader);
	header.appendChild(stateHeader);
	header.appendChild(seniorityHeader);
	header.appendChild(percentageHeader);
	tHeader.appendChild(header);
	table.appendChild(tHeader);

	// loop through the TGIF politician data

	for (let i = 0; i < members.length; i++) {
		let tr = document.createElement('tr');
		tr.className = 'tableRow';

		let fullName = document.createElement('td');
		let a = document.createElement('a');
		let party = document.createElement('td');
		party.id = 'partyType';
		let state = document.createElement('td');
		state.className = 'state-select';

		let seniority = document.createElement('td');
		let percentage = document.createElement('td');

		// Appending all the elements

		tr.appendChild(fullName);
		tr.appendChild(party);
		tr.appendChild(state);
		tr.appendChild(seniority);
		tr.appendChild(percentage);
		table.appendChild(tr);

		// Adding links to each name
		a.href = data.results[0].members[i].url;
		a.innerHTML = middleName(members[i].first_name, members[i].middle_name, members[i].last_name);

		// Looking for party
		party.innerHTML = members[i].party;
		party = partyRep(party);

		// Looking for state
		state.innerHTML = members[i].state;

		// looking for years in service
		seniority.innerHTML = members[i].seniority;

		// do they vote with the party
		percentage.innerHTML = members[i].votes_with_party_pct;

		// Append the link to the name
		fullName.appendChild(a);
	}
}
congressTable();

// Attach State ID to each TR

function attachState() {
	let selectState = document.querySelectorAll('.state-select');

	for (i = 0; i < members.length; i++) {
		selectState.forEach(function(s) {
			if (s.innerHTML == statesArray[i]) {
				return (s.parentNode.className += statesArray[i]);
			}
		});
	}
}

attachState();

// Create Dropdown Menu

var select = document.querySelector('.select');

for (i = 0; i < statesArray.length; i++) {
	var option = document.createElement('option');
	txt = document.createTextNode(statesArray[i]);
	option.appendChild(txt);
	option.setAttribute('value', statesArray[i]);
	select.insertBefore(option, select.lastChild);
}

// on change function that changes the value in console.log

select.addEventListener('change', isChecked);

function whatState() {
	let statePicked = document.querySelector('.select').value;
	let selectState = document.querySelectorAll('.state-select');
	let trState = document.querySelectorAll('.' + statePicked);

	for (var i = 0; i < selectState.length; i++) {
		selectState[i].parentNode.style.display = 'none';
	}
	trState.forEach(function(s) {
		s.style.display = '';
	});
}

let checkRep;
let checkInd;
let checkDem;

function isChecked() {
	let selectState = document.querySelectorAll('.state-select');
	for (var i = 0; i < selectState.length; i++) {
		selectState[i].parentNode.style.display = 'none';
	}
	let statePicked = document.querySelector('.select').value;
	if (statePicked != 'all') {
		checkRep = document.querySelectorAll('.r' + '.' + statePicked);
		checkInd = document.querySelectorAll('.i' + '.' + statePicked);
		checkDem = document.querySelectorAll('.d' + '.' + statePicked);
	} else {
		checkRep = document.querySelectorAll('.r');
		checkInd = document.querySelectorAll('.i');
		checkDem = document.querySelectorAll('.d');
	}

	if (document.getElementById('democrat').checked) {
		checkDem.forEach(function(r) {
			r.style.display = '';
		});
	}
	if (document.getElementById('republican').checked) {
		checkRep.forEach(function(d) {
			d.style.display = '';
		});
	}
	if (document.getElementById('independant').checked) {
		checkInd.forEach(function(d) {
			d.style.display = '';
		});
	}
}
