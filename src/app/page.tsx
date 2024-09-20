'use client';

import Highscore from '@/components/Highscore';
import NewGameBtn from '@/components/NewGameBtn';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const shuffleImages = () => {
  const cardImages = ['car', 'cabin', 'cow', 'flower', 'guitar', 'pineapple'];
  let duplicatedImages = [...cardImages, ...cardImages];
  return duplicatedImages.sort(() => Math.random() - 0.5);
};

export default function Home() {
  const [cardImg, setCardImg] = useState<string[]>(shuffleImages() || []);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [findedCard, setFindedCard] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [highScoreName, setHighScoreName] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const checkCards = () => {
      const [first, second] = flippedCards;
      if (cardImg[first] === cardImg[second]) {
        setFindedCard([...findedCard, ...flippedCards]);
      } 
        setFlippedCards([]);
      
    };

    if (flippedCards.length === 2) {
      setTimeout(() => {
        checkCards();
      }, 700);
    }
  }, [cardImg, flippedCards, findedCard]);

  useEffect(() => {
    const savedScore = localStorage.getItem('Highscore');
    const savedName = localStorage.getItem('HighScoreName');

    if (savedScore) {
      setHighScore(JSON.parse(savedScore));
    }

    if (savedName) {
      setHighScoreName(JSON.parse(savedName));
    }
  }, []);

  useEffect(() => {
    if (
      findedCard.length === cardImg.length &&
      (highScore === 0 || moves < highScore)
    ) {
      setShowPopup(true);
    }
  }, [findedCard, moves, highScore]);

  const handleHighscore = (name: string) => {
    setHighScoreName(name);
    setHighScore(moves);

    localStorage.setItem('Highscore', JSON.stringify(moves));
    localStorage.setItem('HighScoreName', JSON.stringify(name));

    setShowPopup(false);
  };

  const flipCardHandle = (index: number) => {
    if (!flippedCards.includes(index) && flippedCards.length < 2) {
      setFlippedCards([...flippedCards, index]);
      if (!findedCard.includes(index)) {
        setMoves(moves + 1);
      }
    }
  };
  const newGame = () => {
    setCardImg(shuffleImages());
    setFindedCard([]);
    setFlippedCards([]);
    setMoves(0);
  };

  return (
    <main>
      <div className="grid p-8 sm:p-20  grid-cols-4 gap-6 w-wull md:max-w-[700px] m-auto">
        {cardImg.map((card, index) => (
          <div
            key={index}
            data-testid="card"
            className={`flex justify-center cursor-pointer border-[1px] border-red-500/40 items-center bg-blue-200/40 transform w-full h-[90px] sm:w-28 sm:h-28 text-[4rem] transition-transform duration-400 font-thin ${
              flippedCards.includes(index) || findedCard.includes(index)
                ? 'rotate-180'
                : ''
            }`}
            onClick={() => flipCardHandle(index)}
          >
            {flippedCards.includes(index) || findedCard.includes(index) ? (
              <Image
                data-testid="card-image"
                src={`/${card}.svg`}
                alt={card}
                fill
                className="rotate-180 p-2"
              />
            ) : (
              '?'
            )}
          </div>
        ))}
        <div className="col-span-4   flex border-[1px] py-6 border-red-500/40 justify-around bg-blue-200/40 p-4">
          <div className="flex flex-col text-center">
            <span className="text-xl">Moves:</span>
            <span data-testid="moves" className="text-red-900 text-2xl">
              {moves}
            </span>
          </div>
          <NewGameBtn updateFunction={newGame} />
          <div className="flex flex-col text-center">
            <span className="text-xl">Highscore:</span>
            <div>
              <span
                data-testid="highscore-name"
                className="text-red-900 text-2xl px-2"
              >
                {highScoreName ? `${highScoreName + ':'}` : ''}
              </span>
              <span data-testid="highscore" className="text-green-600 text-2xl">
                {highScore}
              </span>
            </div>
          </div>
        </div>
      </div>
      {showPopup ? <Highscore updateNewHighscore={handleHighscore} /> : null}
    </main>
  );
}
