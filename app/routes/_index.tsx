import type { MetaFunction } from "react-router";
import { TicTacToe } from "~/components/game/tic-tac-toe";

export const meta: MetaFunction = () => [
  { title: "XOGame" },
  { name: "description", content: "Simple 3x3 Tic Tac Toe game" },
];

export default function IndexPage() {
  return <TicTacToe />;
}
