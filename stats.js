var stats = {
	num_Rep: 0,
	num_Dem: 0,
	num_Ind: 0,
	ave_Vote_D: 0,
	ave_Vote_R: 0,
	most_Vote: [],
	least_Vote: [],
	most_missed_Vote: [],
	least_missed_Vote: []
};

// Global Variables
let members = data.results[0].members;

// Total Rep / Dem Numbers empty array
let totalPol = [];
let partyDem = [];
let partyRep = [];
let partyInd = [];

// Average Vote empy array

let totalDemPartyVote = [];
let totalRepPartyVote = [];

//  Vote with party empty Array

let voteWithPartyDem = [];
let voteWithPartyRep = [];

// function to push total politicians to Array

function pushPol(amount) {
	for (var i = 0; i < members.length; i++) {
		amount.push(members[i]);
	}
}
pushPol(totalPol);

// Filter Array into different totals

function demNum() {
	partyDem = totalPol.filter((member) => member.party === 'D');
	stats.num_Dem = partyDem.length;
}
demNum();

function repNum() {
	partyRep = totalPol.filter((member) => member.party === 'R');
	stats.num_Rep = partyRep.length;
}
repNum();

function indNum() {
	partyInd = totalPol.filter((member) => member.party === 'I');
	stats.num_Ind = partyInd.length;
}
indNum();

// Total Democrat votes with party
function demAveVote() {
	for (var i = 0; i < partyDem.length; i++) {
		totalDemPartyVote.push(partyDem[i].votes_with_party_pct);
	}
}

demAveVote();

// Total Democrat votes with party divided by number of Dems
stats.ave_Vote_D = totalDemPartyVote.reduce((a, b) => a + b, 0) / totalDemPartyVote.length;

// Total Republican Vote Ave
function repAveVote() {
	for (var i = 0; i < partyRep.length; i++) {
		totalRepPartyVote.push(partyRep[i].votes_with_party_pct);
	}
}
repAveVote();

// Total Republican Vote Ave divided by number of Dems
stats.ave_Vote_R = totalRepPartyVote.reduce((a, b) => a + b, 0) / totalRepPartyVote.length;

// Votes Most with Party Func

function sortLeastVoteParty(arr) {
	arr.sort(function(a, b) {
		return a.votes_with_party_pct - b.votes_with_party_pct;
	});

	let tenPerct = arr.length * 0.1;

	for (var i = 0; i < tenPerct; i++) {
		stats.least_Vote.push({
			first_Name: arr[i].first_name,
			last_Name: arr[i].last_name,
			num_Party_Votes: Math.round(arr[i].votes_with_party_pct / 100 * arr[i].total_votes),
			votes_with_party: arr[i].votes_with_party_pct
		});
	}
}

sortLeastVoteParty(totalPol);

//

function sortMostVoteParty(arr) {
	arr.sort(function(a, b) {
		return b.votes_with_party_pct - a.votes_with_party_pct;
	});

	let tenPerct = arr.length * 0.1;

	for (var i = 0; i < tenPerct; i++) {
		stats.most_Vote.push({
			first_Name: arr[i].first_name,
			last_Name: arr[i].last_name,
			num_Party_Votes: Math.round(arr[i].votes_with_party_pct / 100 * arr[i].total_votes),
			votes_with_party: arr[i].votes_with_party_pct
		});
	}
}

// Attendance Funtion

function sortMostAttendace(arr) {
	arr.sort(function(a, b) {
		return b.missed_votes_pct - a.missed_votes_pct;
	});

	let tenPerct = arr.length * 0.1;

	for (var i = 0; i < tenPerct; i++) {
		stats.most_missed_Vote.push({
			first_Name: arr[i].first_name,
			last_Name: arr[i].last_name,
			num_missed_votes: arr[i].missed_votes,
			num_missed_pct: arr[i].missed_votes_pct
		});
	}
}

sortMostAttendace(totalPol);

function sortLeastAttendace(arr) {
	arr.sort(function(a, b) {
		return a.missed_votes_pct - b.missed_votes_pct;
	});

	let tenPerct = arr.length * 0.1;

	for (var i = 0; i < tenPerct; i++) {
		stats.least_missed_Vote.push({
			first_Name: arr[i].first_name,
			last_Name: arr[i].last_name,
			num_missed_votes: arr[i].missed_votes,
			num_missed_pct: arr[i].missed_votes_pct
		});
	}
}

sortLeastAttendace(totalPol);
