const JSON_ADDRESS = "127.0.0.1";
const JSON_PORT = 7190;
const POLLING_RATE = 333;

const JSON_ENDPOINT = `http://${JSON_ADDRESS}:${JSON_PORT}/`;

window.onload = function () {
	getData();
	setInterval(getData, POLLING_RATE);
};

var Asc = function (a, b) {
	if (a > b) return +1;
	if (a < b) return -1;
	return 0;
};

var Desc = function (a, b) {
	if (a > b) return -1;
	if (a < b) return +1;
	return 0;
};

function getData() {
	fetch(JSON_ENDPOINT)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			appendData(data);
		})
		.catch(function (err) {
			console.log("Error: " + err);
		});
}

function appendData(data) {
	var mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML = "";

	//Toxic
	if (data.PlayerPoisoned) {
		mainContainer.innerHTML += `
		<div class="section">
		<div id="tag"><i class="fas fa-heartbeat"></i><div id="value"><font size="4" color="#7851a9">${data.PlayerCurrentHealth}</font></div></div>
		</div>`;
	}
	
	//Fine
	else if (data.PlayerCurrentHealth <= 1200 && data.PlayerCurrentHealth >= 801) {
		mainContainer.innerHTML += `
		<div class="section">
		<div id="tag"><i class="fas fa-heartbeat"></i><div id="value"><font size="4" color="#7cfc00">${data.PlayerCurrentHealth}</font></div></div>
		</div>`;
	}	
	
	//Caution!
	else if (data.PlayerCurrentHealth <= 800 && data.PlayerCurrentHealth >= 361) {
		mainContainer.innerHTML += `
		<div class="section">
		<div id="tag"><i class="fas fa-heartbeat"></i><div id="value"><font size="4" color="#daa520">${data.PlayerCurrentHealth}</font></div></div>
		</div>`;
	}
	
	//Dangerops!
	else if (data.PlayerCurrentHealth <= 360 && data.PlayerCurrentHealth >= 1) {
		mainContainer.innerHTML += `
		<div class="section">
		<div id="tag"><i class="fas fa-heartbeat"></i><div id="value"><font size="4" color="#ff0000">${data.PlayerCurrentHealth}</font></div></div>
		</div>`;
	}
	
	//Default
	else {
		mainContainer.innerHTML += `
		<div class="section">
		<div id="tag"><i class="fas fa-heartbeat"></i><div id="value"><font size="4" color="#ff0000">${data.PlayerCurrentHealth}</font></div></div>
		</div>`;
	}
		
	mainContainer.innerHTML += `
	<div class="section">
	<div id="tag"><i class="fas fa-dice-d20"></i><div id="value"><font size="4" color="#FFF">${Math.floor(data.RankScore)}</font></div></div>
	</div>`;

	mainContainer.innerHTML += `
	<div class="section">
	<div id="tag"><i class="fas fa-skull"></i><div id="value"><font size="4" color="#ff0000">${data.EnemyHealth[0].CurrentHP}</font></div></div>
	</div>`;
}
