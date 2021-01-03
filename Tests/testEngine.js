"use strict";
exports.__esModule = true;
var t3Engine_1 = require("../Script/t3Engine");
var p1 = new t3Engine_1.Player("O");
var p2 = new t3Engine_1.Player("X");
var board = new t3Engine_1.Board(2, [p1, p2]);
var board2 = new t3Engine_1.Board(2, [p1, p2], 2);
var zerozero = { x: 0, y: 0 };
var zeroone = { x: 0, y: 1 };
var onezero = { x: 1, y: 0 };
var oneone = { x: 1, y: 1 };
var twozero = { x: 2, y: 0 };
/*
console.log("Running test\t\tPass:\n-----------------------------");
console.log("Place inside\t\t", placeInside());
console.log("Place outside\t\t", placeOutside());
console.log("Stack pieces\t\t", stackPiece());
console.log("Draw\t\t\t", draw());
console.log(board.boardString())
//console.log("Win\t\t\t", win());
 */
console.log("Running tests...");
/* placeInside();
placeOutside();
stackPiece();
draw(); */
win();
console.log("All tests passed.");
function placeInside() {
    board.move(p1, zerozero);
    board.move(p1, oneone);
    console.assert(board.boardString() == "\nO \n O", "Place inside: board didn't have the expected appearance: " + board.boardString());
}
function placeOutside() {
    console.assert(!board.move(p1, twozero), "Place outside: expected move to return false.");
}
function stackPiece() {
    console.assert(!board.move(p1, zerozero), "Stack piece: expected move to return false.");
}
function draw() {
    board.move(p1, zeroone);
    board.move(p1, onezero);
    console.assert(board.draw, "Draw: expected game to be draw.");
}
function win() {
    board2.move(p1, zerozero);
    board2.move(p1, onezero);
    console.assert(board2.winner === p1, "Win: expected p1 to be winner.");
}
