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
		// for (let rows of this.cells) {
		// 	let row = [];
		// 	for (let col of rows) {
		// 		row.push(col.value);
		// 	}
		// 	console.log(row.join(" | "));
		// }
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
		// console.log("counter is", counter);
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
		// console.log("counter is", counter);
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
// let boardSize = Number(prompt("Enter Board Size 3 - 6: (default 3)"));

// boardSize = !boardSize || boardSize < 3 ? 3 : boardSize > 6 ? 6 : boardSize;
let board, boardSize, timeOut, winner, gameOver, turnCounter, blinkingPlayer;
// let gameOver = false;
// let board = new Board(boardSize);
// let turnCounter = 0;
// let winner = "";
// const numOfTurns = board.cells.length ** 2;

const move = function (index, player) {
	// console.log(index);
	const pMove = index.map((x) => Number(x));
	// const cell = board.cells[pMove[0]][pMove[1]].value;
	// if (!cell) {
	board.cells[pMove[0]][pMove[1]][player]();
	// } else {
	// 	console.log("UNAVAILABLE OPTION! CHOOSE ANOTHER CELL!");
	// }
	// console.log(player, turnCounter);
	turnCounter++;
	board.check(pMove, player);
};

const isGameOver = function () {
	// return turnCounter === numOfTurns ? true : false;
	if (gameOver) {
		clearInterval(blinkingPlayer);
		$(".cell").off("mouseenter mouseleave click").removeClass("cell");
		// $("#label").text(`WINNER: ${players[winner].name}`).addClass("winner");
		timeOut = setTimeout(function () {
			popUpMessage("win");
			$("#popup-display").show();
		}, 2000);
	} else if (turnCounter === boardSize ** 2) {
		gameOver = true;
		clearInterval(blinkingPlayer);
		$(".cell").off("click").removeClass("cell");
		// $("#label").text("It's a draw!").addClass("draw");
		timeOut = setTimeout(function () {
			popUpMessage("draw");
			$("#popup-display").show();
		}, 1500);
	}
};

///// MAIN /////
// const startGame = function () {
// 	while (!gameOver && turnCounter < numOfTurns) {
// 		//player1 turn:
// 		//player2 turn:
// 		let p1Move = prompt("Player 1 chooses: ");
// 		p1Move = p1Move.split("");
// 		move(p1Move, "p1");

// 		if (gameOver || isGameOver()) break;

// 		let p2Move = prompt("Player 2 chooses: ");
// 		p2Move = p2Move.split("");
// 		move(p2Move, "p2");

// 		// isGameOver = true;
// 		// if (isGameOver) break;
// 	}
// };

// if (!winner) {
// 	console.log("IT'S A DRAW!");
// } else {
// 	console.log(`${winner.toUpperCase()} WINS! CONGRATS!!`);
// }

// const board = {
// 	cells: [],
// 	print() {},
// 	check: {
// 		col() {},
// 		row() {},
// 		diagA() {},
// 		diagB() {}
// 	}
// };
