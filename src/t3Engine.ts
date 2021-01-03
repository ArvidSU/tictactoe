const MAXPLAYERS = 5;
const MINPLAYERS = 2;

interface Tile {
    x: number;
    y: number;
}

export class Player {
    symbol: string;
    tiles: Tile[];
    name: string;

    constructor(name: string, symbol: string) {
        this.symbol = symbol;
        this.tiles = new Array<Tile>();
        this.name = name;
    }
}

export class Board {
    grid: string[][];
    players: Player[];
    moves: number;
    draw: boolean;
    winner: Player
    requiredStreak: number;
    size: number;

    constructor(size: number = 1, requiredStreak: number = 3) {

        this.size = size;
        this.generateGrid();
        this.players = [];
        this.moves = 0;
        this.draw = false;
        this.requiredStreak = requiredStreak;
    }

    generateGrid() {
        this.grid = [];
        for (let i = 0; i < this.size; i++) {
            this.grid[i] = new Array<string>(this.size);
        }
    }

    setSize(size: number) {
        if (size < 1) throw new Error("Board not big enough.");
        this.size = size;
        this.generateGrid();
    }

    setStreak(requiredStreak: number) {
        if (requiredStreak < 1) throw new Error("Board not big enough.");
        this.requiredStreak = requiredStreak;
        this.generateGrid();
    }

    nameExists(name: string): boolean {
        if (this.players.find((player) => name.toLowerCase() === player.name.toLowerCase())) return true;
        return false;        
    }

    addPlayer(player: Player) {
        if (this.players.length > MAXPLAYERS) throw new Error("Too many players.")
        if (player.name.length < 3) throw new Error("Name too short")
        if (this.nameExists(player.name)) throw new Error("Player with this name already exists.");
        
        if (player.symbol.length > 2) throw new Error("Symbol too big.")

        this.players.push(player);
    }

    removePlayer(player: Player) {
        this.players.splice(this.players.indexOf(player), 1);
    }

    changeSymbol(player: Player, newSymbol: string) {
        if (newSymbol.length > 2) throw new Error("Symbol too big.")
        this.players.forEach((player) => {if (player.symbol === newSymbol) throw new Error("Player with this symbol already exists.")});
        player.symbol = newSymbol;
    }

    changeName(player: Player, newName: string) {
        if (newName.length < 3) throw new Error("Name too short")
        if (this.nameExists(newName)) throw new Error("Player with this name already exists.");
        player.name = newName;
    }

    private boardIterator(rowFunc?: Function, colFunc?: Function) {
        for (let y = 0; y < this.grid.length; y++) {
            if (rowFunc) rowFunc(y);
            for (let x = 0; x < this.grid.length; x++) {
                if (colFunc) colFunc(x, y);
            }
        }
    }

    boardString(): string {
        let board = "";
        this.boardIterator(
            () => board += "\n",
            (x: number, y: number) => board += (this.grid[y][x] === undefined ? "-" : this.grid[y][x]));
        return board;
    }

    move(player: Player, pos: Tile) {

        if (this.players.length < MINPLAYERS) throw new Error("Not enough players.")

        // Check move is valid.
        if (pos.x < 0 || pos.x >= this.grid.length || pos.y < 0 || pos.y >= this.grid.length) throw new Error("Invalid move.");
        
        // Might not be needed?
        if (this.grid[pos.x][pos.y] !== undefined) throw new Error("This tile is busy.");
        

        // Make move.
        this.grid[pos.x][pos.y] = player.symbol;
        player.tiles.push(pos);
        this.moves++;

        // Check if move resulted in a win.
        if (this.checkWin(player.tiles, player.tiles[0]) >= this.requiredStreak) {
            this.winner = player;
            
            return;
        }
        
        // Check if move resulted in a draw.
        this.checkDraw();
    }

    // Right now only checks if board is full.
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
            if (Math.abs(xDiff) === 1 || Math.abs(yDiff) === 1) {
                return this.checkWin(tiles.splice(tiles.indexOf(tile), 1), tile, streak++);
            }
        });

        return streak;
    }

}