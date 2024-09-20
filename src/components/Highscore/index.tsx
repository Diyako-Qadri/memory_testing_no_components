'use client';
import { useState } from 'react';

type Highscoretype = {
  updateNewHighscore: (name: string) => void;
};
const Highscore = ({ updateNewHighscore }: Highscoretype) => {
  const [inputName, setInputName] = useState<string>('');

  const handleUserNameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleClick = () => {
    localStorage.setItem('name', inputName);
    updateNewHighscore(inputName);
  };
  return (
    <div
      data-testid="highscore-popup"
      className=" p-12 flex justify-center items-center"
    >
      <div className=" fixed top-[25%] flex flex-col p-12 items-center   bg-slate-200 text-center">
        <h2 className="mb-3 text-2xl">New Highscore!</h2>
        <input
       
          onChange={handleUserNameUpdate}
          data-testid="input"
          className="w-[80%] mb-3"
          placeholder="Enter your name..."
          value={inputName}
        />
        <button
          onClick={handleClick}
          data-testid="highscore-button"
          className="bg-blue-900/30 px-10 "
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Highscore;
