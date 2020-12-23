"use strict";
exports.__esModule = true;
var t3Engine_1 = require("../Script/t3Engine");
var board = new t3Engine_1.Board(2);
var board2 = new t3Engine_1.Board(2, 2);
var zerozero = { x: 0, y: 0 };
var zeroone = { x: 0, y: 1 };
var onezero = { x: 1, y: 0 };
var oneone = { x: 1, y: 1 };
var twozero = { x: 2, y: 0 };
console.log("Running test\t\tPass:\n-----------------------------");
//console.log("Place inside\t\t", placeInside());
//console.log("Place outside\t\t", placeOutside());
//console.log("Stack pieces\t\t", stackPiece());
//console.log("Draw\t\t\t", draw());
console.log("Win\t\t\t", win());
function placeInside() {
    board.move(zerozero);
    board.move(oneone);
    return (board.boardString() == "\nX \n O");
}
function placeOutside() {
    return !board.move(twozero);
}
function stackPiece() {
    return !board.move(zerozero);
}
function draw() {
    board.move(zeroone);
    board.move(onezero);
    return board.draw;
}
function win() {
    board2.move(zerozero);
    board2.move(onezero);
    board2.move(zeroone);
    return board2.winner != " ";
}
