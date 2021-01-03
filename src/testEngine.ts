import { Board, Player } from "../Script/t3Engine";

let p1 = new Player("O")
let p2 = new Player("X")

let board = new Board(2, [p1, p2]);
let board2 = new Board(2, [p1, p2], 2);

let zerozero = {x: 0, y: 0};
let zeroone = {x: 0, y: 1};
let onezero = {x: 1, y: 0};
let oneone = {x: 1, y: 1};

let twozero = {x: 2, y: 0};

console.log("Running tests...");
placeInside();
placeOutside();
stackPiece();
draw();
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