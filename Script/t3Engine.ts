type Player = "O" | "X" | " ";

interface Tile {
    x: number;
    y: number;
}

export class Board {
    size: number;
    private board: Player[][];
    currentPlayer: Player;
    moves: number;
    draw: boolean;
    winner: Player
    requiredStreak: number;

    constructor(size: number, requiredStreak?: number) {
        if (size < 1) return;
        this.size = size;
        this.board = new Array<Array<Player>>();
        this.currentPlayer = "X";
        this.moves = 0;
        this.draw = false;
        this.winner = " ";
        this.requiredStreak = (requiredStreak != undefined) ? requiredStreak : 3;

        this.init();
    }

    private boardIterator(rowFunc?: Function, colFunc?: Function) {
        for (let y = 0; y < this.size; y++) {
            rowFunc(y);
            for (let x = 0; x < this.size; x++) {
                colFunc(x, y);
            }
        }
    }

    // Kinda stupid, 
    private init() {
        this.boardIterator(
            () => this.board.push([]),
            (x, y) => this.board[y].push(" "));
    }

    boardString(): String {
        let board = "";
        
        this.boardIterator(
            () => board += "\n",
            (x, y) => board += this.board[y][x]);
        return board;
    }

    move(at: Tile): boolean {
        // Check move is valid.
        if (at.x < 0 || at.x >= this.size || at.y < 0 || at.y >= this.size) return false;
        if (this.board[at.x][at.y] !== " ") return false;

        // Make move and set other player as current.
        this.board[at.x][at.y] = this.currentPlayer;
        this.currentPlayer = (this.currentPlayer === "X" ? this.currentPlayer = "O" : this.currentPlayer = "X");
        this.moves++;

        // Check if move resulted in a draw.
        this.checkDraw();

        // Check if move resulted in a win.
        this.checkWin(this.board, 0, {x: 0, y: 0});

        return true;
    }

    private checkDraw(): boolean {
        if (this.moves >= this.size**2) {
            this.draw = true;
        }
        
        return this.draw;
    }

    private checkWin(streak: number, pos: Tile): boolean {

        console.log("asdadsadsads");
        
        // Player wins!
        if (streak === this.requiredStreak) {
            this.winner = this.currentPlayer;
            return true
        };
        
        // Not able to get a large enough streak with remaining board.
        if (this.size + streak < this.requiredStreak) return false;
        
        if (this.board[pos.y][pos.x] == this.currentPlayer) return this.checkWin()

    }

    private longestStreak(player: Player, pos = {x: 0, y: 0}, visited?: Array<Tile>): number {

        if (this.board[pos.y][pos.x] != player) return 0

        let right = {x: pos.x + 1, y: pos.y};
        let down = {x: pos.x, y: pos.y + 1};
        let diag = {x: pos.x + 1, y: pos.y + 1};
        
        return 1 + this.longestStreak(player, );

    }
}