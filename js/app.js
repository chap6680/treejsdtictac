const playerNames = ['player1', 'player2'];
//const currentPlayer = 'player1';
let currentPlayer = 0;
let nextPlayer = 1;
let playerInfo = new Array;
playerInfo = [{
		setActive: 'player1',
		boxFill: 'box-filled-1',
	boxhover: 'hover1',
		winnerScreen: 'screen-win-one'
	},
	{
		setActive: 'player2',
		boxFill: 'box-filled-2',
		boxhover: 'hover2',
		winnerScreen: 'screen-win-two'

	}
]
let gridTrack = new Array;
let gridTrackNumber = 0;
let winners = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7]
];
/* Adds Element AFTER NeighborElement */
Element.prototype.appendAfter = function (element) {
	element.parentNode.insertBefore(this, element.nextSibling);
}, false;

function checkWinners() {
	for (let checkvar = 0; checkvar < 7; checkvar++) {
		for (let checkvarPlayer = 0; checkvarPlayer <= 1; checkvarPlayer++) {
			console.log('checking w');
			if (gridTrack[winners[checkvar][0]] === checkvarPlayer && gridTrack[winners[checkvar][0]] === checkvarPlayer && gridTrack[winners[checkvar][2]] === checkvarPlayer) {
				console.log('winner player', checkvarPlayer);
				insertWinnerScreen(checkvarPlayer);
			}
		}
	}
}

function btnStart() {
	document.getElementById('start').style.display = 'none';
	document.getElementById('finish').style.display = 'none';
	
	
	switchActivePlayer(currentPlayer);
	//switchActivePlayer(currentPlayer);
}

function insertWinnerScreen(player) {
/* 	let winnerHTML = document.createElement('div');
	winnerHTML.appendChild = '< div class= "screen screen-win screen-win-one" id = "finish" > </div>';
	let getPlacement = document.getElementById('start');
	getPlacement.parentNode.insertBefore(winnerHTML, getPlacement.nextSibling);
	getPlacement = document.getElementById('finish').style.display = 'block';

	*/	
	//	winnerHTML.appendAfter(getPlacement);
	document.getElementById('finish').style.display = 'block';
	document.getElementById('finish').classList.add(playerInfo[player].winnerScreen);

}

function switchActivePlayer(getPlayer) {
	/* 	if (getPlayer = playerNames[0]) {
			turnoffPlayer = playerNames[1];
		} else {
			turnoffPlayer = playerNames[0];
		}; */
	let tempActiveClass = 'players active';

	let setActivePlayer = document.getElementById(playerInfo[currentPlayer].setActive).className = tempActiveClass;
	let setOtherPlayer = document.getElementById(playerInfo[nextPlayer].setActive).className = 'players';
}

function setBox(boxloc, cp) {
	console.log('box', boxloc, " ..", currentPlayer);

	let checkstring = boxloc.substr(boxloc.length - 1);
	console.log('check gridplacement:', checkstring, gridTrack[checkstring]);

	if (gridTrack[checkstring] === 0 || gridTrack[checkstring] === 1) {
		return;
	};


	document.getElementById(boxloc).classList.add(playerInfo[cp].boxFill);

	//set gridTrack Array with selection
	gridTrack[boxloc.substr(boxloc.length - 1)] = cp;


	if (currentPlayer == 0) {
		for (let i = 1; i <= 9; i++) {
			//console.log('forloo in setbox:',i,gridTrack[i]);
			if (gridTrack[i] == 1 || gridTrack[i] === '') {
				//	console.log('next inside', i);
				document.getElementById('box' + i).classList.add('hover2');
			}
		}
	} else {
		let hover2boxes = document.getElementsByClassName('hover2');
		console.log('h2box:', hover2boxes);
		Array.from(hover2boxes).forEach(function (x) {
			x.classList.remove("hover2");
		});
	}

	checkWinners();
	document.getElementById(playerInfo[cp].setActive).classList.remove('active');
	document.getElementById(playerInfo[Math.abs(cp - 1)].setActive).classList.add('active');


	return currentPlayer = Math.abs(cp - 1);
	/* 	if (currentPlayer == 1) {
			console.log('in');
			console.log('cp', currentPlayer);
			return currentPlayer = 0;
		} else {
			console.log('in2');
			console.log('cp', currentPlayer);
			gridTrack[boxloc.substr(boxloc.length - 1)] = 0;
			return currentPlayer = 1;
		};
	 */
}

/* 
document.getElementById('box8').addEventListener('click', function() { setBox('box8', currentPlayer) },false);

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('box9').addEventListener('click', function () {
		setBox('box9', currentPlayer)
	})
});
 */
for (let i = 1; i <= 9; i++) {
	let tempx = "box" + i;
	console.log(tempx);
	gridTrack[i] = '';
	document.addEventListener('DOMContentLoaded', function () {
		document.getElementById(tempx).addEventListener('click', function () {
			setBox(tempx, currentPlayer)
		})
	});
}