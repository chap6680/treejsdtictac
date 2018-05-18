const playerNames = ['player1', 'player2'];
//const currentPlayer = 'player1';
let currentPlayer = 0;
let nextPlayer = 1;
let playerInfo = new Array;
playerInfo = [
	{
		setActive: 'player1',
		boxFill: 'box-filled-1',
		boxhover: 'hover1'
	},
	{
		setActive: 'player2',
		boxFill: 'box-filled-2',
		boxhover: 'hover2'
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

function setBox(boxloc, cp) { 
	console.log('box', boxloc," ..", currentPlayer );
	document.getElementById(boxloc).classList.add(playerInfo[cp].boxFill);
	if (currentPlayer == 1) {
		console.log('in');
		console.log('cp', currentPlayer);
		return currentPlayer = 0;
	} else {
		console.log('in2');
		console.log('cp', currentPlayer);
		return currentPlayer = 1;
	};

}

/* 
document.getElementById('box8').addEventListener('click', function() { setBox('box8', currentPlayer) },false);

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('box9').addEventListener('click', function () {
		setBox('box9', currentPlayer)
	})
});
 */
for (let i = 1; i <=9; i++) {
	let tempx = "box" + i;
	console.log(tempx);
	document.addEventListener('DOMContentLoaded', function () {
		document.getElementById(tempx).addEventListener('click', function () {
			setBox(tempx, currentPlayer)
		})
	});
}