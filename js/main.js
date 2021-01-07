$(document).ready(function () {
	$(".container").hide();
	$("#restart-btn").hide();
	popUpMessage("board");

	$("#restart-btn").on("click", function () {
		clearTimeout(timeOut);
		start();
	});
});

const main = function () {
	$(".cell")
		.on("click", function () {
			$(this).off("mouseenter mouseleave click").css({ color: "", cursor: "default" }).text(players[cPlayer].token).removeClass("cell");
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
	$(".container").show();
	$("#restart-btn").show();
	$("table").remove();
	board = new Board(boardSize);
	$("#label").html('<span id="player1">P1</span> - <span id="p1-score"></span> : <span id="p2-score"></span> - <span id="player2">P2</span>').removeClass();
	$("#p1-score").text(players.p1.score);
	$("#p2-score").text(players.p2.score);
	board.print();
	gameOver = false;
	turnCounter = 0;
	winner = "";
	currPlayer = "";
	turn();
	main();
};

const blinkPlayer = function () {
	$player.fadeOut(500);
	$player.fadeIn(500);
};

const turn = function () {
	clearInterval(blinkingPlayer);
	if (currPlayer === players.p1.name) {
		currPlayer = players.p2.name;
	} else if (currPlayer === players.p2.name) {
		currPlayer = players.p1.name;
	} else {
		currPlayer = players.p1.name;
	}

	$player = $(`#player${currPlayer.slice(-1)}`);

	if (!gameOver) {
		cPlayer = `${currPlayer[0]}${currPlayer.slice(-1)}`.toLowerCase();
		blinkingPlayer = setInterval(blinkPlayer, 1000);
	}
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

const popUpMessage = function (msg) {
	if (msg === "win" || msg === "draw") {
		const clsBtn = $("<button></button>")
			.attr({ id: "cls-btn" })
			.text("X")
			.on("click", function () {
				$("#popup-display").hide();
			});
		const h1 = $("<h1></h1>").addClass("pdisplay");
		let h2;
		const $infoDisplay = $("#info-display");
		const btnBoard = $("<button></button>")
			.attr({ class: "pdisplay", id: "board-btn" })
			.text("Choose Board")
			.on("click", function () {
				popUpMessage("board");
			});
		const btnPlay = $("<button></button>")
			.attr({ class: "pdisplay", id: "play-btn" })
			.text("Play Again")
			.on("click", function () {
				$("#popup-display").hide();
				start();
			});
		const divDspBtn = $("<div></div>").attr({ class: "pdisplay", id: "div-pdisplay-btn" });

		$infoDisplay.empty();

		if (msg === "win") {
			h1.text("Winner");
			h2 = $("<h2></h2>").addClass("pdisplay").text(players[winner].name);
			$infoDisplay.css({ justifyContent: "center", backgroundColor: "#06d6a0" });
		} else if (msg === "draw") {
			h1.text("It's a draw!");
			$("h2.pdisplay").remove();
			$("#info-display").css({ justifyContent: "space-evenly", backgroundColor: "#f3f31f" });
		}

		divDspBtn.append(btnBoard, btnPlay);
		$infoDisplay.append(clsBtn, h1, h2, divDspBtn);
	} else if (msg === "board") {
		const $infoDisplay = $("#info-display");
		let input, label;
		const h1 = $("<h1></h1>").addClass("board-size pdisplay").text("Select Board Size");
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
