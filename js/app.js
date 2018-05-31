
/*  Declare variables player1 is 0 and player2 is 1
*/
const playerNames = ['player1', 'player2'];
let currentPlayer = 0;
let nextPlayer = 1;
let numberOfPlayers = 1;
let countEmpties = 0;
let emptyBoxes = new Array;
let tempUndefined = new Array;
let winner = '';

let playerInfo = new Array;
playerInfo = [{
		setActive: 'player1',
		boxFill: 'box-filled-1',
		boxhover: 'hover1',
		winnerScreen: 'screen-win-one',
		pname: 'Player 1'
	},
	{
		setActive: 'player2',
		boxFill: 'box-filled-2',
		boxhover: 'hover2',
		winnerScreen: 'screen-win-two',
		pname: 'Computer'
	}
]

/* gridTrack is an Array that is tracking the game.

as players fillout the grid, a 0 or 1 is placed into the array, using [1] through [9]

Multiple games - 
Added history tracking - this array adds every game as a separate array within gridTrack.  Allows for tracking...future enhancements such as displaying the history on the side.
Played with storing this into local storage */
let gridTrack = new Array;
let gridTrackGameNo = 0;
gridTrack[gridTrackGameNo] = new Array;

/*
LSgridTrack = JSON.parse(localStorage.getItem("treetictac"));
gridTrack = LSgridTrack;
console.log('ls: ',LSgridTrack);
 if  (LSgridTrack === 'undefined' || LSgridTrack===null) {
	gridTrackGameNo = 0;
} else {
	gridTrackGameNo = LSgridTrack.length;
	getTrack = LSgridTrack;
	console.log('setArray:', getTrack);
 } 
gridTrack.length = 0;
let gridTrackGameNo = 0;
*/

//winningNumbers is an array of winning solutions.
//using grid, starting with 1 2 3, then 4, 5, 6
//these are the "locations" within the grid that are winners
let winningNumbers = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7]
];


/* checks to see if anyone won - does this by going through the winningNumbers Array and seeing it it matches all 0s or 1s within the gridTrack*/
function checkWinners() {
	for (let checkvar = 0; checkvar < 8; checkvar++) {
			for (let checkvarPlayer = 0; checkvarPlayer <= 1; checkvarPlayer++) {
			
				if (gridTrack[gridTrackGameNo][winningNumbers[checkvar][0]] === checkvarPlayer && gridTrack[gridTrackGameNo][winningNumbers[checkvar][1]] === checkvarPlayer && gridTrack[gridTrackGameNo][winningNumbers[checkvar][2]] === checkvarPlayer) {
					gridTrackGameNo += 1;

					//	localStorage.setItem('treetictac', JSON.stringify(gridTrack));
					winner = checkvarPlayer;
					gridTrack[gridTrackGameNo-1][10] = "Winner: " + playerInfo[checkvarPlayer].pname;
					return insertWinnerScreen(checkvarPlayer);
				}
		}
	}

	//if the entire grid is filled out, needs to display a tie screen
	//definitely a cleaner way to do this, but it works.
	let countEmpties = 1;
	for (let t = 1; t < 10; t++) {
		if (gridTrack[gridTrackGameNo][t] === 1 || gridTrack[gridTrackGameNo][t] === 0) {
		} else {
			countEmpties = 0;
		}
	}
	if (countEmpties === 1) {
		gridTrackGameNo += 1;
		winner = 'tie';
		gridTrack[gridTrackGameNo-1][10] = "Tie";
		insertWinnerScreen('tie')
	};
}

//If one player the computer is randomly picking out a square.
function computerPick() {
	emptyBoxes.length = 0;
	for (let t = 1; t < 10; t++) {
		if (gridTrack[gridTrackGameNo][t] === 1 || gridTrack[gridTrackGameNo][t] === 0) {} else {
			emptyBoxes.push(t);
		}
	}
	getComputerPick = getRandomInt(emptyBoxes.length);
	getComputerPickIndex = emptyBoxes[getComputerPick];
	setBox('box' + getComputerPickIndex, currentPlayer);
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}


function btnChange() {
	document.getElementById('finish').style.display = 'none';
	document.getElementById('start').style.display = 'block';
}

function btnHistory() {
	
	let tempHistory = '';
	let tempHistoryNo = 0;
	Array.from(gridTrack).forEach(function (x) {
		tempHistoryNo = tempHistoryNo + 1;
		tempHistory =  tempHistory + '\n' + 'Game ' + tempHistoryNo + ' ' + x[0] + ' : ' + x[10];
	});
	alert(tempHistory);
}


function btnStart() {
	winner = '';
	document.getElementById('start').style.display = 'none';
	document.getElementById('finish').style.display = 'none';
	updateName();
	emptyBoxes[0] = 1;
	if (gridTrackGameNo > 0) {
		for (let i = 1; i <= 9; i++) {
			let tempx = "box" + i;
			document.getElementById('box' + i).classList.remove('box-filled-1');
			document.getElementById('box' + i).classList.remove('box-filled-2');
			document.getElementById('box' + i).classList.remove('hover2');
		}
		document.getElementById('finish').classList.remove(playerInfo[0].winnerScreen);
		document.getElementById('finish').classList.remove(playerInfo[1].winnerScreen);
		document.getElementById('finish').classList.remove('screen-win-tie');

	}
	currentPlayer = 0;
	gridTrack[gridTrackGameNo] = new Array;
	gridTrack[gridTrackGameNo][0] = (playerInfo[0].pname + ' - ' + playerInfo[1].pname);
	
	switchActivePlayer(currentPlayer);
}

//puts the player name in the header box
function updateName() {
	playerInfo[0].pname = document.getElementById('player1name').value;
	playerInfo[1].pname = document.getElementById('player2name').value;
	document.getElementById('player1').children[1].textContent = playerInfo[0].pname;
	if (numberOfPlayers == 2) {
		document.getElementById('player2').children[1].textContent = playerInfo[1].pname;
	}
}

function btnOnePlayer() {
	document.getElementById('btnPlayerNum2').classList.remove('active');
	document.getElementById('btnPlayerNum1').classList.add('active');
	document.getElementById('player2group').style.display = 'none';
	document.getElementById('player2name').value = "Computer";
	updateName();
	numberOfPlayers = 1;

}

function btnTwoPlayer() {
	document.getElementById('btnPlayerNum1').classList.remove('active');
	document.getElementById('btnPlayerNum2').classList.add('active');
	document.getElementById('player2group').style.display = 'block';
	numberOfPlayers = 2;
	if (document.getElementById('player2name').value = "Computer") { 
		document.getElementById('player2name').value = 'Player 2';
	};

	let getC = document.getElementById('player1').getElementsByTagName('p');

	document.getElementById('player1').children[1].textContent = document.getElementById('player1name').value;
}

//inserts winning screen or tie screen
function insertWinnerScreen(player) {
	document.getElementById('finish').style.display = 'block';
	let tempE = document.getElementById('finish').children[2];
	if (player == 'tie') {
		let tempEE = "TIE";
		document.getElementById('finish').children[2].innerHTML = tempEE;
		document.getElementById('finish').classList.add('screen-win-tie');
		document.getElementById(playerInfo[0].setActive).className = 'players';
		document.getElementById(playerInfo[1].setActive).className = 'players';
	} else {
		let tempEE = "Winner<br>" + playerInfo[player].pname;
		document.getElementById('finish').children[2].innerHTML = tempEE;
		
		document.getElementById('finish').classList.add(playerInfo[currentPlayer].winnerScreen);
		document.getElementById(playerInfo[Math.abs(player)].setActive).className='players';
	};

}

//function called after every play - to switch current player
function switchActivePlayer(getPlayer) {
	let tempActiveClass = 'players active';

	let setActivePlayer = document.getElementById(playerInfo[currentPlayer].setActive).className = tempActiveClass;
	let setOtherPlayer = document.getElementById(playerInfo[nextPlayer].setActive).className = 'players';
}


//Grid - filling in the X and O selected
//boxloc is the gridbox number, cp is current player (1 or 0)
function setBox(boxloc, cp) {
	let checkstring = boxloc.substr(boxloc.length - 1);
	
	if (gridTrack[gridTrackGameNo][checkstring] === 0 || gridTrack[gridTrackGameNo][checkstring] === 1) {
		return;
	};

	document.getElementById(boxloc).classList.add(playerInfo[cp].boxFill);

	//set gridTrack Array with selection
	gridTrack[gridTrackGameNo][boxloc.substr(boxloc.length - 1)] = cp;

	if (currentPlayer == 0) {
		for (let i = 1; i <= 9; i++) {
			if (gridTrack[gridTrackGameNo][i] === 1 || gridTrack[gridTrackGameNo][i] === '' || gridTrack[gridTrackGameNo][i] === undefined) {
				document.getElementById('box' + i).classList.add('hover2');
			}
		}
	} else {
		let hover2boxes = document.getElementsByClassName('hover2');
		Array.from(hover2boxes).forEach(function (x) {
			x.classList.remove("hover2");
		});
	}

	checkWinners();
	if (winner !== 'tie') {
		document.getElementById(playerInfo[cp].setActive).classList.remove('active');
	//	document.getElementById(playerInfo[Math.abs(cp - 1)].setActive).classList.add('active');
	};

	currentPlayer = Math.abs(cp - 1);

	if (numberOfPlayers === 1 && currentPlayer === 1&&winner==='') {
		computerPick();
	}

}


//set eventListener on setup for the grid
for (let i = 1; i <= 9; i++) {
	let tempx = "box" + i;
	gridTrack[gridTrackGameNo][i] = '';
	document.addEventListener('DOMContentLoaded', function () {
		document.getElementById(tempx).addEventListener('click', function () {
			setBox(tempx, currentPlayer)
		})
	});
}
