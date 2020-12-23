"use strict";
exports.__esModule = true;
exports.Board = void 0;
var Board = /** @class */ (function () {
    function Board(size, requiredStreak) {
        if (size < 1)
            return;
        this.size = size;
        this.board = new Array();
        this.currentPlayer = "X";
        this.moves = 0;
        this.draw = false;
        this.winner = " ";
        this.requiredStreak = (requiredStreak != undefined) ? requiredStreak : 3;
        this.init();
    }
    Board.prototype.boardIterator = function (rowFunc, colFunc) {
        for (var y = 0; y < this.size; y++) {
            rowFunc(y);
            for (var x = 0; x < this.size; x++) {
                colFunc(x, y);
            }
        }
    };
    // Kinda stupid, 
    Board.prototype.init = function () {
        var _this = this;
        this.boardIterator(function () { return _this.board.push([]); }, function (x, y) { return _this.board[y].push(" "); });
    };
    Board.prototype.boardString = function () {
        var _this = this;
        var board = "";
        this.boardIterator(function () { return board += "\n"; }, function (x, y) { return board += _this.board[y][x]; });
        return board;
    };
    Board.prototype.move = function (at) {
        // Check move is valid.
        if (at.x < 0 || at.x >= this.size || at.y < 0 || at.y >= this.size)
            return false;
        if (this.board[at.x][at.y] !== " ")
            return false;
        // Make move and set other player as current.
        this.board[at.x][at.y] = this.currentPlayer;
        this.currentPlayer = (this.currentPlayer === "X" ? this.currentPlayer = "O" : this.currentPlayer = "X");
        this.moves++;
        // Check if move resulted in a draw.
        this.checkDraw();
        // Check if move resulted in a win.
        this.checkWin(this.board, 0);
        return true;
    };
    Board.prototype.checkDraw = function () {
        if (this.moves >= Math.pow(this.size, 2)) {
            this.draw = true;
        }
        return this.draw;
    };
    Board.prototype.checkWin = function (board, streak) {
        console.log("asdadsadsads");
        // Player wins!
        if (streak === this.requiredStreak) {
            this.winner = this.currentPlayer;
            return true;
        }
        ;
        // Not able to get a large enough streak with remaining board.
        if (board.length + streak < this.requiredStreak)
            return false;
        var newBoard = board;
        this.boardIterator(function () { }, function (x, y) { newBoard[y][x] = board[y + 1][x + 1]; });
        // First pos doesn't contain currentPlayer.
        if (board[0][0] != this.currentPlayer) {
            return this.checkWin(newBoard, 0);
        }
        return this.checkWin(newBoard, streak++);
    };
    Board.prototype.checkWin2 = function () {
        var res = false;
        this.boardIterator;
        return res;
    };
    return Board;
}());
exports.Board = Board;
