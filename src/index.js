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
    renderSquare(i) {
        return <Square value={i}/>;
    }

    render() {
        const status = 'Next player: X';

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
