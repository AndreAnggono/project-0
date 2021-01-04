// $(document).ready(function () {

// });

const printBoard = function () {
	const container = $(".container");
	const table = $("<table></table>");

	for (let i = 0; i < 3; i++) {
		const tableRow = $("<tr></tr>");
		for (let j = 0; j < 3; j++) {
			tableRow.append($("<td></td>").attr("id", `c${i}${j}`).text(`${i}, ${j}`));
		}
		table.append(tableRow);
	}
	container.append(table);

	// $(".container").append($("<h2></h2>").text("HELLO"));
};

// console.log(boardSize);
