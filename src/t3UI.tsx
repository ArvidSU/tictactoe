import React, { MutableRefObject } from 'react';
import {Board, Player } from './t3Engine';
import './App.css'

type UIState = {
    size: number,
    streak: number,
    players: Player[],
    board: Board,
    currentPlayer: number
}

export class BoardUI extends React.Component {
    state: UIState = {
        size: 1,
        streak: 1,
        players: [],
        board: new Board(),
        currentPlayer: 0
    }

    nameRef = React.createRef() as MutableRefObject<HTMLInputElement>;
    symbolRef = React.createRef() as MutableRefObject<HTMLInputElement>;
    
    render() {
        return(
            <div className="Game">
                <h1>Welcome to my tic tac toe game!</h1>
                <div className="Settings" >
                    {this.boardSize()}
                    {this.requiredStreak()}
                    {this.playerList()}
                    {this.newPlayer()}
                </div>
                <div className="Info">
                    {this.currentPlayer()}
                    {this.gameStatus()}
                </div>
                <div className="Board">
                    {this.drawBoard()}
                </div>
            </div>
        )
    }

    gameStatus() {
        console.log(this.state.board.winner);
        
        if (this.state.board.winner !== undefined) {
            return this.win();
        } else if (this.state.board.draw) {
            return this.draw();
        }
    }

    // This function updates the board and runs additional functions if successful.
    updateBoard(boardFunc: Function, afterFunc?: Function[]) {
        try {
            boardFunc();
            if(afterFunc) afterFunc.forEach((func) => func());
        } catch (error) {
            alert(error)
        }
    }

    incSize() {
        let setSize = () => this.state.board.setSize(this.state.size + 1);
        let stateSize = [() => [this.setState(() => ({size: this.state.size + 1}))]];
        this.updateBoard(setSize, stateSize);
    }

    decSize() {
        let setSize = () => this.state.board.setSize(this.state.size - 1);
        let stateSize = [() => [this.setState(() => ({size: this.state.size - 1}))]];
        this.updateBoard(setSize, stateSize);
    }
    
    boardSize() {    
        return(
            <div className="Board-size" >
                <p>Board size: {this.state.size}x{this.state.size}</p>
                <button onClick={() => this.decSize()}>-</button>
                <button onClick={() => this.incSize()}>+</button>
            </div>
        )
    }

    incStreak() {
        let setStreak = () => this.state.board.setStreak(this.state.streak + 1);
        let stateStreak = [() => [this.setState(() => ({streak: this.state.streak + 1}))]];
        this.updateBoard(setStreak, stateStreak);
    }

    decStreak() {
        let setStreak = () => this.state.board.setStreak(this.state.streak - 1);
        let stateStreak = [() => [this.setState(() => ({streak: this.state.streak - 1}))]];
        this.updateBoard(setStreak, stateStreak);
    }
    
    requiredStreak() {
        return(
            <div className="Board-size" >
                <p>Required streak: {this.state.streak}</p>
                <button onClick={() => this.decStreak()}>-</button>
                <button onClick={() => this.incStreak()}>+</button>
            </div>
        )
    }

    removePlayer(player: Player) {
        let removePlayer = () => this.state.board.removePlayer(player);
        let statePlayers = [() => this.setState(() => ({players: this.state.players.splice(this.state.players.indexOf(player), 1)}))]
        this.updateBoard(removePlayer, statePlayers)
    }

    changeName(player: Player, name: string) {
        let changeName = () => this.state.board.changeName(player, name);
        let fUpdate = [() => this.forceUpdate()];
        this.updateBoard(changeName,fUpdate)
    }

    changeSymbol(player: Player, symbol: string) {
        let changeSymbol = () => this.state.board.changeSymbol(player, symbol);
        let fUpdate = [() => this.forceUpdate()];
        this.updateBoard(changeSymbol, fUpdate);
    }

    playerList() {
        return(
            <div>
                <ul>
                    {this.state.board.players.map(player =>
                        <li key={player.name} className="Player-list">
                            <input type="text" value={player.name} onChange={(e) => this.changeName(player, e.target.value)}/>
                            <input type="text" value={player.symbol} onChange={(e) => this.changeSymbol(player, e.target.value)}/>
                            <button onClick={() => this.removePlayer(player)} >Remove</button>
                        </li>
                    )}
                </ul>
            </div>
        )
    }

    addPlayer(name: string, symbol: string) {
        let newPlayer = new Player(name, symbol);
        
        let addPlayer = () => this.state.board.addPlayer(newPlayer);
        let statePlayers = () => this.setState(() => ({players: this.state.players.concat([newPlayer])}));
        let nameRef = () => this.nameRef.current.value = "";
        let symRef = () => this.symbolRef.current.value = "";

        this.updateBoard(addPlayer, [statePlayers, nameRef, symRef])
    }

    newPlayer() {
        let name = "";
        let symbol = "";
        return(
            <div>
                <input ref={this.nameRef} placeholder="Name" type="text" onChange={(e) => name = e.target.value}/>
                <input ref={this.symbolRef} placeholder="Symbol" type="text" onChange={(e) => symbol = e.target.value}/>
                <button onClick={() => {this.addPlayer(name, symbol)}}>Add</button>
            </div>
        );
    }

    handleMove(y: number, x: number) {
        let cPlayer = this.state.currentPlayer
        
        let boardMove = () => this.state.board.move(this.state.players[cPlayer], {x: x, y: y});
        let stateCurrentPlayer = () => {
            this.setState(() => ({currentPlayer: cPlayer + 1}))
            if (cPlayer + 1 === this.state.players.length) {
            this.setState(() => ({currentPlayer: 0}))
        }}

        this.updateBoard(boardMove, [stateCurrentPlayer])
    }

    renderRowTiles(row: string[], y: number) {
        let tileJSX: JSX.Element[] = [];

        for (let i = 0; i < row.length; i++) {
            const tile = row[i];
            tileJSX.push(<div key={y+i} className="Tile" onClick={() => this.handleMove(i, y)} ><p>{tile}</p></div>)
        }

        return(tileJSX);
    }

    drawBoard() {
        return(
            <div className="Board" >
                {this.state.board.grid.map((row, y) => 
                    <div key={y} className="Row" >
                        {this.renderRowTiles(row, y)}
                    </div>
                    )}
            </div>
        );
    }

    currentPlayer() {
        if (this.state.players.length < 2) {
            return(
                <div className="Current-player">
                    <h2>Add some players...</h2>
                </div>
            )
        } 

        let player = this.state.players[this.state.currentPlayer].symbol
        
        return(
            <div className="Current-player">
                <p>It's <code>{player}</code>'s turn. </p>
            </div>
        )
    }

    draw() {
        return(
            <div>
                <h2>It's a draw!</h2>
            </div>
        )
    }

    win() {
        return (
            <div>
                <h2>{this.state.board.winner.name} is the winner!</h2>
            </div>
        )
    }
}