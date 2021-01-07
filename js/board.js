// Players object to store player symbol / token.
const players = {
	p1: {
		name: "PLAYER 1",
		token: "X",
	},
	p2: {
		name: "PLAYER 2",
		token: "O",
	},
};

// Constructor function for creating a cell.
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
const Board = function (size = 3) {
	this.cells = [];

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
		let counter = 1;
		let position = cell;
		let row = position[0] - 1;
		const col = position[1];
		const playersToken = players[player].token;
		const winPosition = [[`${cell.join("")}`]];

		while (row >= 0) {
			if (this.cells[row][col].value === playersToken) {
				winPosition.push(`${row}${col}`);
				counter++;
			} else break;
			row--;
		}

		row = position[0] + 1;
		while (row < this.cells.length) {
			if (this.cells[row][col].value === playersToken) {
				winPosition.push(`${row}${col}`);
				counter++;
			} else break;
			row++;
		}

		if (counter === this.cells.length) {
			for (let cell of winPosition) {
				$(`#c${cell}`).animate({ backgroundColor: "#06d6a0" }, 2000);
			}
			winner = player;
			gameOver = true;
		}
	};

	const rowCheck = (cell, player) => {
		let counter = 1;
		let position = cell;
		const row = position[0];
		let col = position[1] - 1;
		const playersToken = players[player].token;
		const winPosition = [[`${cell.join("")}`]];

		while (col >= 0) {
			if (this.cells[row][col].value === playersToken) {
				winPosition.push(`${row}${col}`);
				counter++;
			} else break;
			col--;
		}

		col = position[1] + 1;
		while (col < this.cells.length) {
			if (this.cells[row][col].value === playersToken) {
				winPosition.push(`${row}${col}`);
				counter++;
			} else break;
			col++;
		}

		if (counter === this.cells.length) {
			for (let cell of winPosition) {
				$(`#c${cell}`).animate({ backgroundColor: "#06d6a0" }, 2000);
			}
			winner = player;
			gameOver = true;
		}
	};

	const diagonalACheck = (cell, player) => {
		let counter = 1;
		let position = cell;
		let row = position[0] - 1;
		let col = position[1] - 1;
		const playersToken = players[player].token;
		const winPosition = [[`${cell.join("")}`]];

		while (row >= 0 && col >= 0) {
			if (this.cells[row][col].value === playersToken) {
				winPosition.push(`${row}${col}`);
				counter++;
			} else break;
			row--;
			col--;
		}

		row = position[0] + 1;
		col = position[1] + 1;
		while (row < this.cells.length && col < this.cells.length) {
			if (this.cells[row][col].value === playersToken) {
				winPosition.push(`${row}${col}`);
				counter++;
			} else break;
			row++;
			col++;
		}

		if (counter === this.cells.length) {
			for (let cell of winPosition) {
				$(`#c${cell}`).animate({ backgroundColor: "#06d6a0" }, 2000);
			}
			winner = player;
			gameOver = true;
		}
	};

	const diagonalBCheck = (cell, player) => {
		let counter = 1;
		let position = cell;
		let row = position[0] - 1;
		let col = position[1] + 1;
		const playersToken = players[player].token;
		const winPosition = [[`${cell.join("")}`]];

		while (row >= 0 && col < this.cells.length) {
			if (this.cells[row][col].value === playersToken) {
				winPosition.push(`${row}${col}`);
				counter++;
			} else break;
			row--;
			col++;
		}

		row = position[0] + 1;
		col = position[1] - 1;
		while (row < this.cells.length && col >= 0) {
			if (this.cells[row][col].value === playersToken) {
				winPosition.push(`${row}${col}`);
				counter++;
			} else break;
			row++;
			col--;
		}

		if (counter === this.cells.length) {
			for (let cell of winPosition) {
				// $(`#c${cell}`).animate({ backgroundColor: "#3ff289" }, 2000);
				$(`#c${cell}`).animate({ backgroundColor: "#06d6a0" }, 2000);
			}
			winner = player;
			gameOver = true;
		}
	};
};

////////
let board, boardSize, timeOut, winner, gameOver, turnCounter, blinkingPlayer, currPlayer, $player, cPlayer;

const move = function (index, player) {
	const pMove = index.map((x) => Number(x));
	board.cells[pMove[0]][pMove[1]][player]();
	turnCounter++;
	board.check(pMove, player);
};

const isGameOver = function () {
	if (gameOver) {
		clearInterval(blinkingPlayer);
		$(".cell").off("mouseenter mouseleave click").removeClass("cell").css({ cursor: "default" });
		timeOut = setTimeout(function () {
			popUpMessage("win");
			$("#popup-display").show();
		}, 2000);
	} else if (turnCounter === boardSize ** 2) {
		gameOver = true;
		clearInterval(blinkingPlayer);
		$(".cell").off("click").removeClass("cell").css({ cursor: "default" });
		timeOut = setTimeout(function () {
			popUpMessage("draw");
			$("#popup-display").show();
		}, 1500);
	}
};
