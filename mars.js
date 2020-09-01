let temp, sols, date, day, month, minF, maxF;
let degree = 'c';
const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

async function getMarsWeather() {
	// const weatherReport = await fetch('https://api.nasa.gov/insight_weather/?api_key=3aBOkQAgaee7VbKrmX39LhYJWDvS3le1N18fADWQ&feedtype=json&ver=1.0');
	const weatherReport = await fetch('/data.json');
	temp = await weatherReport.json();
	sols = temp.sol_keys.length - 1;
	updateUI();
}

function updateUI() {
	for (i=0;i<=sols;i++) {
		// display temperature on Mars
		setTemps(i);
		// display Mars sol
		document.getElementById('s' + i).innerHTML = 'Sol ' + temp.sol_keys[i];
		// display Earth date
		earthDateCreator(i);
		}
}

function setTemps(i) {
	document.getElementById('sol-max-' + i).innerHTML =	temp[temp.sol_keys[i]].AT.mx + '°C';
	document.getElementById('sol-min-' + i).innerHTML =	temp[temp.sol_keys[i]].AT.mn + '°C';
}

function earthDateCreator(sol) {
	date = temp[temp.sol_keys[sol]].Last_UTC.split("");
	day = date[8] + date[9];
	month = monthList[date[6] - 1];
	document.getElementById('d' + sol).innerHTML = day + ' ' + month;
}

getMarsWeather();


// Temp conversion button
// change temp on button click - use an addEventListener?
function convertTemp() {
	for (i=0;i<=sols;i++) {
		minF = temp[temp.sol_keys[i]].AT.mn * 9 / 5 + 32;
		maxF = temp[temp.sol_keys[i]].AT.mx * 9 / 5 + 32;
		if (degree == 'c') {
			conversion(i);
		} else {
			setTemps(i);
		}
	}
	if (degree == 'c') {
		degree = 'f';
		document.querySelector('.toggle-on').innerHTML = '°F';
		document.querySelector('.toggle-off').innerHTML = '°C';
	} else {
		degree = 'c'
		document.querySelector('.toggle-on').innerHTML = '°C';
		document.querySelector('.toggle-off').innerHTML = '°F';
	}
}

function conversion(i) {
	document.getElementById('sol-max-' + i).innerHTML =	maxF.toFixed(3) + '°F';
	document.getElementById('sol-min-' + i).innerHTML =	minF.toFixed(3) + '°F';
}