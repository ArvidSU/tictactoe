type Symbol = "O" | "X" | " ";

interface Tile {
    x: number;
    y: number;
}

export class Player {
    symbol: Symbol;
    tiles: Tile[];

    constructor(symbol: Symbol) {
        this.symbol = symbol;
        this.tiles = new Array<Tile>();
    }
}

export class Board {
    private grid: Symbol[][];
    players: Player[];
    moves: number;
    draw: boolean;
    winner: Player
    requiredStreak: number;

    constructor(size: number, players: Player[], requiredStreak?: number) {
        if (size < 1) return;
        
        this.grid = [];
        for (let i = 0; i < size; i++) {
            this.grid[i] = new Array(size);
        }

        this.players = players;
        this.moves = 0;
        this.draw = false;
        this.requiredStreak = (requiredStreak != undefined) ? requiredStreak : 3;
    }

    private boardIterator(rowFunc?: Function, colFunc?: Function) {
        for (let y = 0; y < this.grid.length; y++) {
            rowFunc(y);
            for (let x = 0; x < this.grid.length; x++) {
                colFunc(x, y);
            }
        }
    }

    boardString(): String {
        let board = "";
        this.boardIterator(
            () => board += "\n",
            (x, y) => board += (this.grid[y][x] === undefined ? " " : this.grid[y][x]));
        return board;
    }

    move(player: Player, pos: Tile): boolean {
        // Check move is valid.
        if (pos.x < 0 || pos.x >= this.grid.length || pos.y < 0 || pos.y >= this.grid.length) return false;
        if (this.grid[pos.x][pos.y] !== undefined) return false;
        

        // Make move.
        this.grid[pos.x][pos.y] = player.symbol;
        player.tiles.push(pos);
        this.moves++;

        // Check if move resulted in a draw.
        this.checkDraw();

        // Check if move resulted in a win.
        if (this.checkWin(player.tiles, player.tiles[0])) this.winner = player;

        return true;
    }

    private checkDraw(): boolean {
        if (this.moves >= this.grid.length**2) {
            this.draw = true;
        }
        
        return this.draw;
    }

    private checkWin(tiles: Tile[], pred: Tile, streak = 0): number {
        tiles.forEach(tile => {
            let xDiff = tile.x - pred.x;
            let yDiff = tile.y - pred.y;
            if (Math.abs(xDiff) == 1 || Math.abs(yDiff) == 1) {
                return this.checkWin(tiles.splice(tiles.indexOf(tile), 1), tile, streak++);
            }
        });

        return streak;
    }

}