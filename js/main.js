let currPlayer, $player, cPlayer;

$(document).ready(function () {
	$player = $("#player");
	printBoard();
	turn();

	$(".cell").on("click", function () {
		console.log(this.id.slice(1), players[cPlayer].name);
		$(this).text(players[cPlayer].token).off("click").removeClass("cell");
		move(this.id.slice(1).split(""), cPlayer);
		isGameOver();
		turn();
	});
});

const turn = function () {
	if (currPlayer === players.p1.name) {
		currPlayer = players.p2.name;
	} else if (currPlayer === players.p2.name) {
		currPlayer = players.p1.name;
	} else {
		currPlayer = players.p1.name;
	}
	cPlayer = `${currPlayer[0]}${currPlayer.slice(-1)}`.toLowerCase();
	$player.text(currPlayer);
};

const printBoard = function () {
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

// console.log(boardSize);
