const playerNames = ['player1', 'player2'];
let currentPlayer = 0;
let nextPlayer = 1;
let numberOfPlayers = 1;
let countEmpties = 0;
let emptyBoxes = new Array;
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
let gridTrack = new Array;
let gridTrackHistory;

//let gridTrackHistory = 0;
gridTrack[gridTrackHistory] =new Array;
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
	for (let checkvar = 0; checkvar < 8; checkvar++) {
		for (let checkvarPlayer = 0; checkvarPlayer <= 1; checkvarPlayer++) {
			//console.log('checking w');
			if (gridTrack[gridTrackHistory][winners[checkvar][0]] === checkvarPlayer && gridTrack[gridTrackHistory][winners[checkvar][1]] === checkvarPlayer && gridTrack[gridTrackHistory][winners[checkvar][2]] === checkvarPlayer) {
				//console.log('winner player', checkvarPlayer);
				gridTrackHistory += 1;
				
				localStorage.setItem('treetictac', JSON.stringify(gridTrack));	
				insertWinnerScreen(checkvarPlayer);
			}
		}
	}
	let countEmpties = 1;
	for (let t = 1; t < 10; t++) {
		if (gridTrack[gridTrackHistory][t] === 1 || gridTrack[gridTrackHistory][t] === 0) {
			
		} else { 
			countEmpties = 0;
		}
		//	console.log("no players:", numberOfPlayers, ' - current P ', currentPlayer);
	}
	if (countEmpties === 1) {
		gridTrackHistory += 1;
		insertWinnerScreen('tie')
	};
}

function computerPick() { 
	emptyBoxes.length = 0;
	for (let t = 1; t < 10; t++) { 
		if (gridTrack[gridTrackHistory][t] === 1 || gridTrack[gridTrackHistory][t] === 0) {

		} else { 

			emptyBoxes.push(t);
		}
	}
	getComputerPick = getRandomInt(emptyBoxes.length);	
	getComputerPickIndex = emptyBoxes[getComputerPick];
//	console.log(' box is: ', 'box'+getComputerPickIndex, 'currentPlayer: ', currentPlayer);	
	setBox('box' + getComputerPickIndex, currentPlayer);
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
  }
  

function btnChange() { 
	document.getElementById('finish').style.display = 'none';
	document.getElementById('start').style.display = 'block';
}

function btnStart() {
	
	document.getElementById('start').style.display = 'none';
	document.getElementById('finish').style.display = 'none';
	updateName();
	emptyBoxes[0] = 1;
	console.log('current game number is: '+ gridTrackHistory);
	if (gridTrackHistory > 0) { 
//		gridTrack[gridTrackHistory].length = 0;
		for (let i = 1; i <= 9; i++) {
			let tempx = "box" + i;
			document.getElementById('box' + i).classList.remove('box-filled-1');
			document.getElementById('box' + i).classList.remove('box-filled-2');
			document.getElementById('box' + i).classList.remove('hover2');
		}
		document.getElementById('finish').classList.remove( playerInfo[0].winnerScreen);
		document.getElementById('finish').classList.remove(playerInfo[1].winnerScreen);
		document.getElementById('finish').classList.remove('screen-win-tie');
	
	}
	currentPlayer = 0;
	gridTrack[gridTrackHistory] = new Array;
	gridTrack[gridTrackHistory][0] =  (playerInfo[0].pname + ' - ' + playerInfo[1].pname);
	console.log('array ', gridTrack[gridTrackHistory][0]);

	switchActivePlayer(currentPlayer);
	//switchActivePlayer(currentPlayer);
}

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

	let getC = document.getElementById('player1').getElementsByTagName('p');
	
	console.log(getC);
	document.getElementById('player1').children[1].textContent = document.getElementById('player1name').value ;
}



function insertWinnerScreen(player) {
	document.getElementById('finish').style.display = 'block';
	let tempE = document.getElementById('finish').children[2];
	if (player == 'tie') {
		console.log('TIE ', tempE);
		let tempEE = "TIE";
		document.getElementById('finish').children[2].innerHTML = tempEE;
			document.getElementById('finish').classList.add('screen-win-tie')
	} else { 
	console.log('winner ', tempE);
	let tempEE = "Winner<br>" + playerInfo[player].pname;
	document.getElementById('finish').children[2].innerHTML = tempEE;
		document.getElementById('finish').classList.add(playerInfo[currentPlayer].winnerScreen)
	};

}

function switchActivePlayer(getPlayer) {
	let tempActiveClass = 'players active';

	let setActivePlayer = document.getElementById(playerInfo[currentPlayer].setActive).className = tempActiveClass;
	let setOtherPlayer = document.getElementById(playerInfo[nextPlayer].setActive).className = 'players';
}

function setBox(boxloc, cp) {
	console.log('box', boxloc, " ..", currentPlayer);

	let checkstring = boxloc.substr(boxloc.length - 1);
//	console.log('check gridplacement:', checkstring, gridTrack[gridTrackHistory][checkstring]);

	if (gridTrack[gridTrackHistory][checkstring] === 0 || gridTrack[gridTrackHistory][checkstring] === 1) {
		return;
	};


	document.getElementById(boxloc).classList.add(playerInfo[cp].boxFill);

	//set gridTrack Array with selection
	gridTrack[gridTrackHistory][boxloc.substr(boxloc.length - 1)] = cp;


	if (currentPlayer == 0) {
		for (let i = 1; i <= 9; i++) {
			console.log('forloo in setbox:',i,gridTrack[gridTrackHistory][i]);
			if (gridTrack[gridTrackHistory][i] === 1 || gridTrack[gridTrackHistory][i] === ''|| gridTrack[gridTrackHistory][i]===undefined) {
				console.log('next inside', i);
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


	currentPlayer = Math.abs(cp - 1);

	if (numberOfPlayers === 1 && currentPlayer===1) {
		computerPick();
	 }


}

for (let i = 1; i <= 9; i++) {
	let tempx = "box" + i;
	//console.log(tempx);
	
	gridTrack[gridTrackHistory][i] = '';
	document.addEventListener('DOMContentLoaded', function () {
		document.getElementById(tempx).addEventListener('click', function () {
			setBox(tempx, currentPlayer)
		})
	});
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
} 

