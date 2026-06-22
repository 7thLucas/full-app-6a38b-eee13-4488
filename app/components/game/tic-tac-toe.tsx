import { useState, useCallback } from "react";
import { useConfigurables } from "~/modules/configurables";

type Player = "X" | "O";
type Cell = Player | null;
type Board = Cell[];

const WINNING_LINES: [number, number, number, number, number][] = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

function calculateWinner(board: Cell[]): { winner: Player; line: number[] } | null {
  for (const [a, b, c, d, e] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d] && board[a] === board[e]) {
      return { winner: board[a] as Player, line: [a, b, c, d, e] };
    }
  }
  return null;
}

function isDraw(board: Cell[]): boolean {
  return board.every((cell) => cell !== null);
}

interface ScoreState {
  X: number;
  O: number;
  draws: number;
}

export function TicTacToe() {
  const { config, loading } = useConfigurables();

  const [board, setBoard] = useState<Board>(Array(25).fill(null) as Cell[]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [scores, setScores] = useState<ScoreState>({ X: 0, O: 0, draws: 0 });
  const [gameOver, setGameOver] = useState(false);

  const winnerResult = calculateWinner(board);
  const draw = !winnerResult && isDraw(board);
  const winningLine = winnerResult?.line ?? [];

  const gameTitle = config?.gameTitle ?? "XOGame";
  const gameSubtitle = config?.gameSubtitle ?? "Classic 5x5 Tic Tac Toe";
  const playerXLabel = config?.playerXLabel ?? "Player X";
  const playerOLabel = config?.playerOLabel ?? "Player O";
  const resetButtonLabel = config?.resetButtonLabel ?? "New Game";
  const showScoreboard = config?.showScoreboard ?? true;

  const handleCellClick = useCallback(
    (index: number) => {
      if (board[index] || winnerResult || draw) return;

      const newBoard = [...board] as Cell[];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const result = calculateWinner(newBoard);
      const nowDraw = !result && isDraw(newBoard);

      if (result) {
        setScores((prev) => ({ ...prev, [result.winner]: prev[result.winner] + 1 }));
        setGameOver(true);
      } else if (nowDraw) {
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
        setGameOver(true);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    },
    [board, currentPlayer, winnerResult, draw]
  );

  const handleReset = useCallback(() => {
    setBoard(Array(25).fill(null) as Cell[]);
    setCurrentPlayer("X");
    setGameOver(false);
  }, []);

  const getStatusMessage = () => {
    if (winnerResult) {
      const label = winnerResult.winner === "X" ? playerXLabel : playerOLabel;
      return `${label} wins!`;
    }
    if (draw) return "It's a draw!";
    const label = currentPlayer === "X" ? playerXLabel : playerOLabel;
    return `${label}'s turn`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-2">
          {gameTitle}
        </h1>
        {gameSubtitle ? (
          <p className="text-muted-foreground text-base sm:text-lg">{gameSubtitle}</p>
        ) : null}
      </div>

      {/* Scoreboard */}
      {showScoreboard && (
        <div className="flex items-center gap-4 mb-8">
          <div className="flex flex-col items-center px-5 py-3 rounded-xl bg-card border border-border shadow-sm min-w-[80px]">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
              {playerXLabel}
            </span>
            <span className="text-3xl font-bold text-primary">{scores.X}</span>
          </div>
          <div className="flex flex-col items-center px-4 py-3 rounded-xl bg-muted border border-border min-w-[60px]">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
              Draw
            </span>
            <span className="text-3xl font-bold text-muted-foreground">{scores.draws}</span>
          </div>
          <div className="flex flex-col items-center px-5 py-3 rounded-xl bg-card border border-border shadow-sm min-w-[80px]">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
              {playerOLabel}
            </span>
            <span className="text-3xl font-bold text-accent-foreground">{scores.O}</span>
          </div>
        </div>
      )}

      {/* Status message */}
      <div className="mb-6">
        <span
          className={`inline-block px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
            winnerResult
              ? "bg-primary text-primary-foreground border-primary"
              : draw
              ? "bg-muted text-muted-foreground border-border"
              : "bg-secondary text-secondary-foreground border-border"
          }`}
        >
          {getStatusMessage()}
        </span>
      </div>

      {/* Game board */}
      <div className="bg-card rounded-2xl shadow-lg border border-border p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {board.map((cell, index) => {
            const isWinningCell = winningLine.includes(index);
            return (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                disabled={!!cell || !!winnerResult || draw}
                className={`
                  w-14 h-14 sm:w-16 sm:h-16
                  flex items-center justify-center
                  rounded-xl border-2 text-2xl sm:text-3xl font-bold
                  transition-all duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                  ${
                    isWinningCell
                      ? "bg-accent border-primary"
                      : cell
                      ? "bg-secondary border-border cursor-default"
                      : "bg-background border-border hover:bg-accent hover:border-primary cursor-pointer"
                  }
                  ${!cell && !winnerResult && !draw ? "active:scale-95" : ""}
                `}
                aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ""}`}
              >
                {cell === "X" && (
                  <span className="text-primary select-none">{cell}</span>
                )}
                {cell === "O" && (
                  <span className="text-accent-foreground select-none">{cell}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={handleReset}
        className="
          px-8 py-3 rounded-xl text-base font-semibold
          bg-primary text-primary-foreground
          hover:opacity-90 active:scale-95
          transition-all duration-150
          focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          shadow-sm
        "
      >
        {resetButtonLabel}
      </button>
    </div>
  );
}
