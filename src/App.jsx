import { useState } from 'react';
import './App.css';

const App = () => {
  const [generatedPoints, setGeneratedPoints] = useState([]);

  // Player states declaration
  const [player1Name, setPlayer1Name] = useState('');
  const [player1Level, setPlayer1Level] = useState(1);
  const [player2Name, setPlayer2Name] = useState('');
  const [player2Level, setPlayer2Level] = useState(1);

  // Function that manage Player 1
  const handlePlayer1NameChange = (event) => {
    setPlayer1Name(event.target.value);
  };
  const handlePlayer1LevelChange = (event) => {
    setPlayer1Level(event.target.value);
  };

  // Function that manage Player 1
  const handlePlayer2NameChange = (event) => {
    setPlayer2Name(event.target.value);
  };
  const handlePlayer2LevelChange = (event) => {
    setPlayer2Level(event.target.value);
  };

  // Results
  const [pointList, setPointList] = useState([]);

  // Submit function with preventDefault to deny default action of the form
  const handleSubmit = async (event) => {
    event.preventDefault();

    const generatedPoints = [];
    let player1Score = 0;
    let player2Score = 0;

    // Loop that creates points dpending on the player level
    for (let i = 0; i < 150; i++) {
      const player1Point = Math.random() * player1Level;
      const player2Point = Math.random() * player2Level;

      let pointWinner = '';

      if (player1Point > player2Point) {
        pointWinner = 'player1';
        player1Score++;
      } else {
        pointWinner = 'player2';
        player2Score++;
      }
      generatedPoints.push({ pointNumber: i + 1, winner: pointWinner });
    }

    setGeneratedPoints(generatedPoints);
    setPointList(generatedPoints);
    console.log(' -------> SUBMIT : OK ! <-------')
  };

  // Async function for the fetch
  const handleScoreSubmit = async () => {

    const response = await fetch('http://localhost:3000/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pointList: generatedPoints,
        player1: player1Name,
        player2: player2Name
      }),
    });

    const result = await response.json();
    console.log('Résultat final :', result);
  }

  return (
    <>
      <h1 className='main-title'>Test 2 WeCount - Tennis 🎾</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label className='player__infos player1__infos'>
            Joueur 1 :
            <input
              className='player__name'
              type="text"
              value={player1Name}
              onChange={handlePlayer1NameChange}
            />
            <input
              className='player__level'
              type="number"
              min="1"
              max="10"
              value={player1Level}
              onChange={handlePlayer1LevelChange}
            />
          </label>
          <label className='player__infos player2__infos'>
            Joueur 2 :
            <input
              className='player__name'
              type="text"
              value={player2Name}
              onChange={handlePlayer2NameChange}
            />
            <input
              className='player__level'
              type="number"
              min="1"
              max="10"
              value={player2Level}
              onChange={handlePlayer2LevelChange}
            />
          </label>
          <button
            className='form__button'
            type='submit'
          >
            Jouer le match ! 🎾
          </button>
        </form>
        {pointList.length > 0 && (
          <div className='points'>
            <h2 className='pointslist__title'>Liste des points</h2>
            <p className='pointslist__info'>Pour envoyer les points et obtenir les résultats, cliquez sur le bouton à la suite des listes.</p>
            <ul className='pointslist'>
              {pointList.map((point) => (
                <li key={point.pointNumber}>
                  <span className='points__span'>Point {point.pointNumber} :</span> remporté par {point.winner === 'player1' ? `[${player1Name}]` : `[${player2Name}]`}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          className='score__button'
          onClick={handleScoreSubmit}
        >
          Otenir le score final !
        </button>
      </div>
    </>
  )
}

export default App
