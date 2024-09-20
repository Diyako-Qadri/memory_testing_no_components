
type newGameProps = {
    updateFunction: () => void;
}
const NewGameBtn = ({updateFunction}: newGameProps) => {
    return (
      <button data-testid="new-game-btn" className="text-red-500/60 h-[34px] my-auto border-[1px] rounded-[5px]  border-red-500/40 px-6  bg-gray-800/60" onClick={updateFunction}>New Game</button>
    )
};

export default NewGameBtn
