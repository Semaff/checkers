import { useCallback, useEffect, useState } from 'react';
import { BoardModel } from './models/BoardModel';
import { PlayersEnum } from './enums/PlayersEnum';
import Board from './components/Board';
import './App.css';
import Topbar from './components/Topbar';
import WinnerModal from './components/WinnerModal';


function App() {
    const [board, setBoard] = useState<BoardModel>(new BoardModel());
    const [curPlayer, setCurPlayer] = useState<PlayersEnum>(PlayersEnum.PLAYER_ONE);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);

    /*
      Game presets
    */
    useEffect(() => {
        restartGame();

        const timer = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const restartGame = useCallback(() => {
        const newBoard = new BoardModel();
        newBoard.initBoard();
        newBoard.initCheckers();
        setBoard(newBoard);

        setCurPlayer(PlayersEnum.PLAYER_ONE);
        setIsGameOver(false);
        setTime(0);
    }, []);

    const swapPlayer = useCallback(() => {
        const newPlayer = curPlayer === PlayersEnum.PLAYER_ONE ? PlayersEnum.PLAYER_TWO : PlayersEnum.PLAYER_ONE;
        setCurPlayer(newPlayer);
        checkGameOver(newPlayer);
    }, [board, curPlayer]);

    const checkGameOver = (player: PlayersEnum) => {
        if (!board.hasMoves(player)) {
            setIsGameOver(true);
        }
    }

    return (
        <div className="App">
            <Topbar
                curPlayer={curPlayer}
                time={time}
            />

            <WinnerModal
                isHidden={!isGameOver}
                curPlayer={curPlayer === PlayersEnum.PLAYER_ONE ? PlayersEnum.PLAYER_TWO : PlayersEnum.PLAYER_ONE}
                onClick={restartGame}
            />

            <Board
                board={board}
                curPlayer={curPlayer}
                swapPlayer={swapPlayer}
            />
        </div>
    );
}

export default App;
