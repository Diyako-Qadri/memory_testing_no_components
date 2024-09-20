const Rules = () => {
  return (
    <div>
      <h4 className="font-semibold underline">Rules</h4>
      <div data-testid="rules-text">
        Click a card to reveal an image. Then click another card to reveal that
        image. Your job is to remember the images and click two of the same
        cards. Good luck beating the highscore!
      </div>
      <p data-testid="good-luck">Good Luck!</p>
    </div>
  );
};

export default Rules;
