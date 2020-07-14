import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'

/*
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value.val}
        </button>
    );
}
*/

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: props.val,
            w: props.win,
            onc: props.onClick,
        };
    }

    render() { 
            return (
                <button className="square" onClick={this.state.onc}>{this.state.val}</button>
            );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    renderSquare(i,w) {
        const sqprops = {
            value: this.state.history[i],
            win: w,
            onClick: () => this.handleClick(i),
        };
        return (
            <Square {...sqprops} />
        );
    }

    handleClick(i) {
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) { return; }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{squares: squares}]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState(
            {
                stepNumber: step,
                xIsNext: (step % 2) === 0,
            }
        );
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map( 
            (step,move) => {
                const desc = move ? 
                    'Go to move #' + move :
                    'Go to game start';
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            }
        );

        let status;
        if (winner) { status = 'Winner: ' + winner; }
        else if (this.state.stepNumber === 9) { status = 'Draw :('; }
        else { status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O'); }

        return (
            <div className="game">
                <div className="game-board">
                    <div className="board-row">
                        {this.renderSquare(0,winner)}
                        {this.renderSquare(1,winner)}
                        {this.renderSquare(2,winner)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3,winner)}
                        {this.renderSquare(4,winner)}
                        {this.renderSquare(5,winner)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6,winner)}
                        {this.renderSquare(7,winner)}
                        {this.renderSquare(8,winner)}
                    </div>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    if (squares === null) { return null; }
    const lines = [
        [0,1,2],
        [3,4,5],
        [7,6,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a],a,b,c];
        }
    }

    return null;
}