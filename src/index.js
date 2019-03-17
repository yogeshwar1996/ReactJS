/**The Square component renders a single <button>*/
/**Convert Square to function component*/
function Square(props) {
    return (
        <button className="square"
                onClick={() => props.onClick()}>
            {props.value}
        </button>
    );

    /** To “remember” things, components use state.*/
    /** React components can have state by setting this.state in their constructors.*/

    /**By calling this.setState from an onClick handler in the Square’s render method, we tell React to re-render that Square whenever its <button> is clicked.
     * When you call setState in a component, React automatically updates the child components inside of it to*/

    /**Next, we need to change what happens when a Square is clicked.
     *  The Board component now maintains which squares are filled.
     *  We need to create a way for the Square to update the Board’s state.
     *  Since state is considered to be private to a component that defines it,
     *  we cannot update the Board’s state directly from Square.
     *  Instead, we’ll pass down a function from the Board to the Square,
     *  and we’ll have Square call that function when a square is clicked*/
    /**When a Square is clicked, the onClick function provided by the Board is called.
     *  Here’s a review of how this is achieved:
     *  The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
     *  When the button is clicked, React will call the onClick event handler that is defined in Square’s render()
     *  method.This event handler calls this.props.onClick().
     *  The Square’s onClick prop was specified by the Board.
     *  Since the Board passed onClick={() => this.handleClick(i)} to Square,
     *  the Square calls this.handleClick(i) when clicked.
     *  We have not defined the handleClick() method yet, so our code crashes.
     *  If you click a square now, you should see a red error screen saying something like
     *  “this.handleClick is not a function”.*/

}

/** the Board renders 9 squares*/
class Board extends React.Component {
    /**  In Board’s renderSquare method, change the code to pass a prop called value to the Square:*/
    /**the best approach is to store the game’s state in the parent Board component instead of in each Square.
     * The Board component can tell each Square what to display by passing a prop, just like we did when we passed
     * a number to each Square. To collect data from multiple children, or to have two child components communicate
     * with each other, you need to declare the shared state in their parent component instead.
     * The parent component can pass the state back down to the children by using props;
     * this keeps the child components in sync with each other and with the parent component.*/
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true
    //         /**Note how in handleClick, we call .slice() to create a copy of the squares array to modify instead of
    //          * modifying the existing array. There are generally two approaches to changing data.
    //          * The first approach is to mutate the data by directly changing the data’s values.
    //          * The second approach is to replace the data with a new copy which has the desired changes.*/
    //         /** Initialize board's state as:
    //          * [
    //          *  null, null, null,
    //          *  null, null, null,
    //          *  null, null, null*/
    //         /**set the first move to be X's*/
    //     };
    // }

    /**Set square's value to be X if isNextX and revers the state after that*/
    // handleClick(i) {
    //     /**if we mutated the squares array, implementing time travel would be very difficult.
    //      however, we used slice() to create a new copy of the squares array after every move, and treated it as immutable.*/
    //     const squares = this.state.squares.slice();
    //     /**We can now change the Board’s handleClick function to return early by ignoring a
    //      * click if someone has won the game or if a Square is already filled:This will allow us to store every past
    //      * version of the squares array, and navigate between the turns that have already happened.*/
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }
    //     squares[i] = this.state.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext,
    //     });
    // }

    renderSquare(i) {
        /** We will modify the Board to instruct each individual Square about its current value ('X', 'O', or null).
         *  We have already defined the squares array in the Board’s constructor, and we will modify the Board’s
         *  renderSquare method to read from it:*/
        return (
            /**Now we’re passing down two props from Board to Square: value and onClick.
             *  The onClick prop is a function that Square can call when clicked*/
            /**<Square
                    value={this.state.squares[i]}
                    onClick={() => this.handleClick(i)}
               />*/
        <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
    )
    }

    render() {
        /***Since the Game component is now rendering the game’s status, we can remove the corresponding code
         *  from the Board’s render method. After refactoring, the Board’s render function looks like this:*/
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = 'Winner: ' + winner;
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }

        /**In the beginning, we passed the value prop down from the Board to show numbers from 0 to 8 in every Square.
         *  In a different previous step, we replaced the numbers with an “X” mark determined by Square’s own state.
         *  This is why Square currently ignores the value prop passed to it by the Board.*/
        return (
            <div>
                {/*<div className="status">{status}</div>*/}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

//Game component renders a board with placeholder values which we’ll modify later
class Game extends React.Component {
    /**We’ll want the top-level Game component to display a list of past moves.
     *  It will need access to the history to do that, so we will place the history state in the top-level Game component.*/
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(i) {
        /**This ensures that if we “go back in time” and then make a new move from that point, we throw away all the “future” history that would now become incorrect.*/
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            /**Unlike the array push() method you might be more familiar with, the concat() method doesn’t mutate the original array, so we prefer it.*/
            history: history.concat([{squares: squares,}]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    render() {
        /**We’ll update the Game component’s render function to use the most recent history entry to determine and display the game’s status:*/
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        /**Let’s map over the history in the Game’s render method:*/
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />

                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}