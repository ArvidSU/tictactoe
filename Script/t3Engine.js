"use strict";
exports.__esModule = true;
exports.Board = exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(symbol) {
        this.symbol = symbol;
        this.tiles = new Array();
    }
    return Player;
}());
exports.Player = Player;
var Board = /** @class */ (function () {
    function Board(size, players, requiredStreak) {
        if (size < 1)
            return;
        this.grid = [];
        for (var i = 0; i < size; i++) {
            this.grid[i] = new Array(size);
        }
        this.players = players;
        this.moves = 0;
        this.draw = false;
        this.requiredStreak = (requiredStreak != undefined) ? requiredStreak : 3;
    }
    Board.prototype.boardIterator = function (rowFunc, colFunc) {
        for (var y = 0; y < this.grid.length; y++) {
            rowFunc(y);
            for (var x = 0; x < this.grid.length; x++) {
                colFunc(x, y);
            }
        }
    };
    Board.prototype.boardString = function () {
        var _this = this;
        var board = "";
        this.boardIterator(function () { return board += "\n"; }, function (x, y) { return board += (_this.grid[y][x] === undefined ? " " : _this.grid[y][x]); });
        return board;
    };
    Board.prototype.move = function (player, pos) {
        // Check move is valid.
        if (pos.x < 0 || pos.x >= this.grid.length || pos.y < 0 || pos.y >= this.grid.length)
            return false;
        if (this.grid[pos.x][pos.y] !== undefined)
            return false;
        // Make move and set other Symbol as current.
        this.grid[pos.x][pos.y] = player.symbol;
        player.tiles.push(pos);
        this.moves++;
        // Check if move resulted in a draw.
        this.checkDraw();
        // Check if move resulted in a win.
        if (this.checkWin(player.tiles, player.tiles[0]))
            this.winner = player;
        return true;
    };
    Board.prototype.checkDraw = function () {
        if (this.moves >= Math.pow(this.grid.length, 2)) {
            this.draw = true;
        }
        return this.draw;
    };
    Board.prototype.checkWin = function (tiles, pred, streak) {
        var _this = this;
        if (streak === void 0) { streak = 0; }
        tiles.forEach(function (tile) {
            var xDiff = tile.x - pred.x;
            var yDiff = tile.y - pred.y;
            if (Math.abs(xDiff) == 1 || Math.abs(yDiff) == 1) {
                return _this.checkWin(tiles.splice(tiles.indexOf(tile), 1), tile, streak++);
            }
        });
        return streak;
    };
    return Board;
}());
exports.Board = Board;
