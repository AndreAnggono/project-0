# Project 0 - Tic Tac Toe
## Introduction
This is the first project at General Assembly. 

My aim was to incorporate different techniques learned in the first two weeks at GA.

This includes:
* Constructors
* DOM manipulation and Animation- jQuery
* Dynamic and Efficient Algorithm

[Link to the game here](https://andreanggono.github.io/project-0/ "Tic Tac Toe")

## Game Code Details
### Cells
Cells are created via a constructor function `Cell()`.
`const cell1 = new Cell()`

#### Properties and Functions
* It has a public property called value. This stores the player's token upon click / selection.
* It has 2 public functions for Player 1 and Player 2. When invoked, it will set the targeted cell value with its token.

### Board
The board can expand to as big as you want it to be. Both the checking algorithm and the board / cell generation can dynamically grow.

It is created via a constructor function `Board(default = 3)`.
`const board = new Board()`

Constructor function takes an argument for the board size. Default is 3 for 3 x 3 board game.

#### Properties and Functions
* It has 1 public property for cells (`cells = [];`). This stores a 2 dimensional array of cells generated from the Cells constructor function. This is achieved by running a nested loop.
* It has 2 public functions:
    * print() - generates HTML tags accessing the DOM via jQuery to print the board on screen.
    * check() - is the checking function that accesses 4 private functions. Explained more below.

### Checking Function
The checking function is a public function within the `Board()` constructor function. It has 2 parameters, `check = function (cell, player)`.

#### Properties and Functions
* cell takes an array of cell indexes `[row, col]`
* player takes a string of the current player in the shorthand form of "p1" or "p2". This is then used to access the `players` object and access its properties.
* It accesses 4 private functions to check for different types of winning combos. It uses the index of the cell the user clicks on as the starting point. Both arguments are passed on by the parent `check()` function.
    * Column - `colCheck(cell, player)` , checks for columns.
    * Row - `rowCheck(cell, player)` , checks for rows.
    * DiagonalA - `diagonalACheck(cell, player)` , checks for diagonal left top to bottom right.
    * DiagonalB - `diagonalBCheck(cell, player)` , checks for diagonal top right to bottom left.

#### Algorithm
The algorithm is dynamic and can grow to accomodate for boards of any sizes. This is achieved by setting boundries where the it can continue checking. The lowest boundary is `0`, any lower it goes out of bounds. The highest boundary is the `boardSize - 1`, if it goes to the board size or higher it goes out of bounds. This approach follows the boundaries of arrays.

It was also designed with efficiency in mind. For it to be efficient, it will first check one cell adjacent to it, if the player tokens doesn't match, it will break and continue with the other checks. If it finds a matching token, it will continue to do so in the same direction until it goes out of bounds and switches to the other direction. For example of a column check, it will go upwards first then downwards. This way it doesn't waste any time and resources to continue checking even if it doesn't find matches in one direction.

## Improvements
* The layout and design of the front end can be nicer.
* The algorithm could be DRYer. This would be challenging with the different requirements for each types of checks.
* Add new winning combos. For example 4 x 4 board, you can win by creating a square of 4 cells.
* Add a save game feature to continue the game at a later time.
* Add a load game feature to load a saved game.
* Add a choose board button in game so players can change it mid game.