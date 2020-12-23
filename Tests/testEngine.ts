import { Board } from "../Script/t3Engine";

let board = new Board(2);
let board2 = new Board(2, 2);

let zerozero = {x: 0, y: 0};
let zeroone = {x: 0, y: 1};
let onezero = {x: 1, y: 0};
let oneone = {x: 1, y: 1};

let twozero = {x: 2, y: 0};

console.log("Running test\t\tPass:\n-----------------------------");
//console.log("Place inside\t\t", placeInside());
//console.log("Place outside\t\t", placeOutside());
//console.log("Stack pieces\t\t", stackPiece());
//console.log("Draw\t\t\t", draw());
console.log("Win\t\t\t", win());


function placeInside(): boolean {
    board.move(zerozero);
    board.move(oneone);
    return (board.boardString() == "\nX \n O");
}

function placeOutside(): boolean {
    return !board.move(twozero);
}

function stackPiece(): boolean {
    return !board.move(zerozero);
}

function draw(): boolean{
    board.move(zeroone);
    board.move(onezero);
    return board.draw;
}


function win(): boolean {
    board2.move(zerozero);
    board2.move(onezero);
    board2.move(zeroone);
    return board2.winner != " ";
}