// Players object to store player's name, symbol / token, and score.
const players = {
	p1: {
		name: "PLAYER 1",
		token: "X",
		score: 0,
	},
	p2: {
		name: "PLAYER 2",
		token: "O",
		score: 0,
	},
};

// Constructor function for creating a cell.
// It has a public property called value. This stores the player's token upon click / selection
// It has 2 public functions for Player 1 and Player 2. When invoked, it will set the targeted cell value with its token.
const Cell = function () {
	this.value = "";
	this.p1 = () => {
		this.value = players.p1.token;
	};
	this.p2 = () => {
		this.value = players.p2.token;
	};
};

// Constructor function for creating a board.
// It has 1 public property for cells. This stores a 2 dimensional array of cells generated from the Cells constructor function.
// It has 2 public functions - Print() generates HTML tags accessing the DOM to print the board on screen.
// Check () is the checking function that accesses 6 private functions.
// It checks for Columns, Rows, DiagonalA (left top to bottom right), DiagonalB (top right to bottom left).
// The other two private functions helps with checks for the above functions. This helps with keeping the code DRYer.
// --
// This board can expand to as big as you want it to be. Both the checking algorithm and the board / cell generation can dynamically grow.
// --
const Board = function (size = 3) {
	this.cells = [];
	let counter, winPosition, playersToken;

	for (let i = 0; i < size; i++) {
		this.cells[i] = [];
		for (let j = 0; j < size; j++) {
			this.cells[i][j] = new Cell();
		}
	}

	this.print = function () {
		const container = $(".container");
		const table = $("<table></table>");

		for (let i = 0; i < boardSize; i++) {
			const tableRow = $("<tr></tr>");
			for (let j = 0; j < boardSize; j++) {
				tableRow.append(
					$("<td></td>")
						.attr({ id: `c${i}${j}`, class: "cell" })
						.text(` `)
				);
			}
			table.append(tableRow);
		}
		container.append(table);
	};

	this.check = function (cell, player) {
		colCheck(cell, player);
		rowCheck(cell, player);
		diagonalACheck(cell, player);
		diagonalBCheck(cell, player);
	};

	const colCheck = (cell, player) => {
		let position = cell;
		let row = position[0] - 1;
		const col = position[1];
		counter = 1;
		playersToken = players[player].token;
		winPosition = [`${cell.join("")}`];

		while (row >= 0) {
			if (checkWinPos(row, col) === false) break;
			row--;
		}

		row = position[0] + 1;
		while (row < this.cells.length) {
			if (checkWinPos(row, col) === false) break;
			row++;
		}

		playerWon(player);
	};

	const rowCheck = (cell, player) => {
		let position = cell;
		const row = position[0];
		let col = position[1] - 1;
		counter = 1;
		playersToken = players[player].token;
		winPosition = [`${cell.join("")}`];

		while (col >= 0) {
			if (checkWinPos(row, col) === false) break;
			col--;
		}

		col = position[1] + 1;
		while (col < this.cells.length) {
			if (checkWinPos(row, col) === false) break;
			col++;
		}

		playerWon(player);
	};

	const diagonalACheck = (cell, player) => {
		let position = cell;
		let row = position[0] - 1;
		let col = position[1] - 1;
		counter = 1;
		playersToken = players[player].token;
		winPosition = [[`${cell.join("")}`]];

		while (row >= 0 && col >= 0) {
			if (checkWinPos(row, col) === false) break;
			row--;
			col--;
		}

		row = position[0] + 1;
		col = position[1] + 1;
		while (row < this.cells.length && col < this.cells.length) {
			if (checkWinPos(row, col) === false) break;
			row++;
			col++;
		}

		playerWon(player);
	};

	const diagonalBCheck = (cell, player) => {
		let position = cell;
		let row = position[0] - 1;
		let col = position[1] + 1;
		counter = 1;
		playersToken = players[player].token;
		winPosition = [[`${cell.join("")}`]];

		while (row >= 0 && col < this.cells.length) {
			if (checkWinPos(row, col) === false) break;
			row--;
			col++;
		}

		row = position[0] + 1;
		col = position[1] - 1;
		while (row < this.cells.length && col >= 0) {
			if (checkWinPos(row, col) === false) break;
			row++;
			col--;
		}

		playerWon(player);
	};

	const playerWon = (player) => {
		if (counter === this.cells.length) {
			for (let cell of winPosition) {
				$(`#c${cell}`).animate({ backgroundColor: "#06d6a0" }, 2000);
			}
			winner = player;
			gameOver = true;
			players[player].score++;
			$("#p1-score").text(players.p1.score);
			$("#p2-score").text(players.p2.score);
		}
	};

	const checkWinPos = (row, col) => {
		if (this.cells[row][col].value === playersToken) {
			winPosition.push(`${row}${col}`);
			counter++;
		} else return false;
	};
};

// Variable Declaration - Global Scope
let board, boardSize, timeOut, winner, gameOver, turnCounter, blinkingPlayer, currPlayer, $player, cPlayer;

// This function triggers / sets the players selection as a move.
// It is done by targeting the cell 2D array and invoking the current player's public function.
// It then checks for a winning combo and keeps track of the number of turns via a counter.
const move = function (index, player) {
	const pMove = index.map((x) => Number(x));
	board.cells[pMove[0]][pMove[1]][player]();
	turnCounter++;
	board.check(pMove, player);
};
