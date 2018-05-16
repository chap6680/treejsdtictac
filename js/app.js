const playerNames = ['player1', 'player2'];
//const currentPlayer = 'player1';
let currentPlayer = 0;
let nextPlayer = 1;
let playerInfo = new Array;
playerInfo = [
	{
		setActive: 'player1',
		boxFill: 'box-filled-1'
	},
	{
		setActive: 'player2',
		boxFill: 'box-filled-2'
	}
] 

function btnStart() {
	document.getElementById('start').style.display = 'none';
	switchActivePlayer(currentPlayer);
	//switchActivePlayer(currentPlayer);
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

function setBox() { 
	console.log('box');
	document.getElementById('box22').classList.add(playerInfo[1].boxFill);
}

