let currPlayer, $player, cPlayer;

$(document).ready(function () {
	$(".container").hide();
	$("#restart-btn").hide();
	popUpMessage("board");
	// $("#start-btn").on("click", function () {
	// 	const boardSizeButton = $('input[name="board-size"]:checked')[0].id;
	// 	boardSize = Number(boardSizeButton.slice(-1));
	// 	$("#popup-display").hide();
	// 	start();
	// });

	$("#restart-btn").on("click", function () {
		clearTimeout(timeOut);
		start();
	});
});

const main = function () {
	$(".cell")
		.on("click", function () {
			$(this).off("mouseenter mouseleave click").css({ color: "" }).text(players[cPlayer].token).removeClass("cell");
			move(this.id.slice(1).split(""), cPlayer);
			isGameOver();
			turn();
		})
		.hover(
			function () {
				$(this).text(players[cPlayer].token).css({ color: "rgba(0,0,0,0.4)" });
			},
			function () {
				$(this).empty();
			}
		);
};

const start = function () {
	// const restartBtn = $("<button></button>")
	// 	.attr({ id: "restart-btn" })
	// 	.text("Restart Game")
	// 	.on("click", function () {
	// 		clearTimeout(timeOut);
	// 		start();
	// 	});
	$(".container").show();
	$("#restart-btn").show();
	$("table").remove();
	board = new Board(boardSize);
	$("#label").html('Your Turn: <span id="player"></span>').removeClass();
	$player = $("#player");
	blinkingPlayer = setInterval(blinkPlayer, 1000);
	// printBoard();
	board.print();
	gameOver = false;
	turnCounter = 0;
	winner = "";
	currPlayer = "";
	turn();
	main();
};

const blinkPlayer = function () {
	$("#player").fadeOut(500);
	$("#player").fadeIn(500);
};

const turn = function () {
	if (currPlayer === players.p1.name) {
		currPlayer = players.p2.name;
	} else if (currPlayer === players.p2.name) {
		currPlayer = players.p1.name;
	} else {
		currPlayer = players.p1.name;
	}

	if (!gameOver) {
		cPlayer = `${currPlayer[0]}${currPlayer.slice(-1)}`.toLowerCase();
		$player.text(currPlayer);
	}
};

const popUpMessage = function (msg) {
	if (msg === "win" || msg === "draw") {
		const h1 = $("<h1></h1>").addClass("winner");
		let h2;
		const $infoDisplay = $("#info-display");
		const btnBoard = $("<button></button>")
			.attr({ class: "winner", id: "board-btn" })
			.text("Choose Board")
			.on("click", function () {
				popUpMessage("board");
			});
		const btnPlay = $("<button></button>")
			.attr({ class: "winner", id: "play-btn" })
			.text("Play Again")
			.on("click", function () {
				$("#popup-display").hide();
				start();
			});
		const divWinBtn = $("<div></div>").attr({ class: "winner", id: "div-win-btn" });

		$infoDisplay.empty();

		if (msg === "win") {
			h1.text("Winner");
			h2 = $("<h2></h2>").addClass("winner").text(players[winner].name);
			$infoDisplay.css({ justifyContent: "center", backgroundColor: "#06d6a0" });
		} else if (msg === "draw") {
			h1.text("It's a draw!");
			$("h2.winner").remove();
			$("#info-display").css({ justifyContent: "space-evenly", backgroundColor: "#f3f31f" });
		}

		divWinBtn.append(btnBoard, btnPlay);
		$infoDisplay.append(h1, h2, divWinBtn);
	} else if (msg === "board") {
		const $infoDisplay = $("#info-display");
		let input, label;
		const h1 = $("<h1></h1>").addClass("board-size winner").text("Select Board Size");
		let divGrid = $("<div></div>").attr({ id: "grid-buttons", class: "board-size" });
		const startBtn = $("<button></button>")
			.attr({ class: "board-size", id: "start-btn" })
			.text("Start Game")
			.on("click", function () {
				const boardSizeButton = $('input[name="board-size"]:checked')[0].id;
				boardSize = Number(boardSizeButton.replace("board", ""));
				$("#popup-display").hide();
				start();
			});

		$infoDisplay.empty().append(h1);

		for (let i = 3; i <= 10; i++) {
			input = $("<input></input>").attr({ type: "radio", name: "board-size", id: `board${i}` });
			if (i === 3) input.attr({ checked: true });

			label = $("<label></label>")
				.attr({ for: `board${i}` })
				.text(`${i} x ${i}`);

			divGrid.append($("<div></div>").append(input, label));
		}

		$infoDisplay.append(divGrid, startBtn).css({ justifyContent: "space-evenly", backgroundColor: "#007ffe" });
	}
};

// const printBoard = function () {
// 	const container = $(".container");
// 	const table = $("<table></table>");

// 	for (let i = 0; i < boardSize; i++) {
// 		const tableRow = $("<tr></tr>");
// 		for (let j = 0; j < boardSize; j++) {
// 			tableRow.append(
// 				$("<td></td>")
// 					.attr({ id: `c${i}${j}`, class: "cell" })
// 					.text(` `)
// 			);
// 		}
// 		table.append(tableRow);
// 	}
// 	container.append(table);
// };
