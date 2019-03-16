/**The Square component renders a single <button>*/
class Square extends React.Component {
    /** To “remember” things, components use state.*/
    /** React components can have state by setting this.state in their constructors.*/
    constructor(props) {
        /**Note In JavaScript classes, you need to always call super when defining the constructor of a subclass. All React component classes that have a constructor should start it with a super(props) call.*/
        super(props);
        this.state = {
            value: null,
        };
    }

    /**By calling this.setState from an onClick handler in the Square’s render method, we tell React to re-render that Square whenever its <button> is clicked.
     * When you call setState in a component, React automatically updates the child components inside of it to*/
    render() {
        return (
            <button className="square"
                    onClick={() => this.setState({value: 'X'})}>
                {this.state.value}
            </button>
        );
    }
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
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        /** Initialize board's state as:
         * [
         *  null, null, null,
         *  null, null, null,
         *  null, null, null*/
        };
    }

    renderSquare(i) {
        /** We will modify the Board to instruct each individual Square about its current value ('X', 'O', or null).
         *  We have already defined the squares array in the Board’s constructor, and we will modify the Board’s
         *  renderSquare method to read from it:*/
        return <Square value={this.state.squares[i]} />;
    }

    render() {
        const status = 'Next player: X';
        /**In the beginning, we passed the value prop down from the Board to show numbers from 0 to 8 in every Square.
         *  In a different previous step, we replaced the numbers with an “X” mark determined by Square’s own state.
         *  This is why Square currently ignores the value prop passed to it by the Board.*/
        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
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
