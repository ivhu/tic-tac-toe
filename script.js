const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;
  return { getBoard };
};

const Cell = () => {
  const btn = document.createElement('button');
  btn.classList.add('cell');
  const boardDiv = document.querySelector('.board');
  boardDiv.appendChild(btn);

  const addToken = (token) => (btn.textContent = token);
  const getToken = () => btn.textContent;
  const getBtn = () => btn;

  return { getBtn, addToken, getToken };
};

const Player = (name, token) => {
  return { name, token };
};

const GameController = (playerOne, playerTwo) => {
  const players = [playerOne, playerTwo];

  let currentPlayer = players[0];

  const getCurrentPlayer = () => currentPlayer;

  const switchCurrentPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const board = Gameboard();
  const getBoard = () => board.getBoard();

  return { getBoard, getCurrentPlayer, switchCurrentPlayer };
};

const DisplayController = (playerOne, playerTwo) => {
  const game = GameController(playerOne, playerTwo);

  const turnDiv = document.querySelector('.turn');
  turnDiv.textContent = `${game.getCurrentPlayer().name}'s turn`;
  console.log(turnDiv.textContent);

  const gb = game.getBoard();

  let gameOver = false;
  let draw = false;

  const disableAllBtns = () => {
    gb.forEach((row) => {
      row.forEach((cell) => {
        cell.getBtn().disabled = true;
      });
    });
  };

  let highlight;

  const checkWinCon = () => {
    if (
      gb[0][0].getBtn().disabled &&
      gb[0][1].getBtn().disabled &&
      gb[0][2].getBtn().disabled
    ) {
      if (
        gb[0][0].getToken() === gb[0][1].getToken() &&
        gb[0][1].getToken() === gb[0][2].getToken()
      ) {
        gameOver = true;
        disableAllBtns();
        gb[0][0].getBtn().style.backgroundColor = highlight;
        gb[0][1].getBtn().style.backgroundColor = highlight;
        gb[0][2].getBtn().style.backgroundColor = highlight;
        return;
      }
    }
    if (
      gb[1][0].getBtn().disabled &&
      gb[1][1].getBtn().disabled &&
      gb[1][2].getBtn().disabled
    ) {
      if (
        gb[1][0].getToken() === gb[1][1].getToken() &&
        gb[1][1].getToken() === gb[1][2].getToken()
      ) {
        gameOver = true;
        disableAllBtns();
        gb[1][0].getBtn().style.backgroundColor = highlight;
        gb[1][1].getBtn().style.backgroundColor = highlight;
        gb[1][2].getBtn().style.backgroundColor = highlight;
        return;
      }
    }
    if (
      gb[2][0].getBtn().disabled &&
      gb[2][1].getBtn().disabled &&
      gb[2][2].getBtn().disabled
    ) {
      if (
        gb[2][0].getToken() === gb[2][1].getToken() &&
        gb[2][1].getToken() === gb[2][2].getToken()
      ) {
        gameOver = true;
        disableAllBtns();
        gb[2][0].getBtn().style.backgroundColor = highlight;
        gb[2][1].getBtn().style.backgroundColor = highlight;
        gb[2][2].getBtn().style.backgroundColor = highlight;
        return;
      }
    }
    if (
      gb[0][0].getBtn().disabled &&
      gb[1][0].getBtn().disabled &&
      gb[2][0].getBtn().disabled
    ) {
      if (
        gb[0][0].getToken() === gb[1][0].getToken() &&
        gb[1][0].getToken() === gb[2][0].getToken()
      ) {
        gameOver = true;
        disableAllBtns();
        gb[0][0].getBtn().style.backgroundColor = highlight;
        gb[1][0].getBtn().style.backgroundColor = highlight;
        gb[2][0].getBtn().style.backgroundColor = highlight;
        return;
      }
    }
    if (
      gb[0][1].getBtn().disabled &&
      gb[1][1].getBtn().disabled &&
      gb[2][1].getBtn().disabled
    ) {
      if (
        gb[0][1].getToken() === gb[1][1].getToken() &&
        gb[1][1].getToken() === gb[2][1].getToken()
      ) {
        gameOver = true;
        disableAllBtns();
        gb[0][1].getBtn().style.backgroundColor = highlight;
        gb[1][1].getBtn().style.backgroundColor = highlight;
        gb[2][1].getBtn().style.backgroundColor = highlight;
        return;
      }
    }
    if (
      gb[0][2].getBtn().disabled &&
      gb[1][2].getBtn().disabled &&
      gb[2][2].getBtn().disabled
    ) {
      if (
        gb[0][2].getToken() === gb[1][2].getToken() &&
        gb[1][2].getToken() === gb[2][2].getToken()
      ) {
        gameOver = true;
        disableAllBtns();
        gb[0][2].getBtn().style.backgroundColor = highlight;
        gb[1][2].getBtn().style.backgroundColor = highlight;
        gb[2][2].getBtn().style.backgroundColor = highlight;
        return;
      }
    }
    if (
      gb[0][0].getBtn().disabled &&
      gb[1][1].getBtn().disabled &&
      gb[2][2].getBtn().disabled
    ) {
      if (
        gb[0][0].getToken() === gb[1][1].getToken() &&
        gb[1][1].getToken() === gb[2][2].getToken()
      ) {
        gameOver = true;
        disableAllBtns();
        gb[0][0].getBtn().style.backgroundColor = highlight;
        gb[1][1].getBtn().style.backgroundColor = highlight;
        gb[2][2].getBtn().style.backgroundColor = highlight;
        return;
      }
    }
    if (
      gb[0][2].getBtn().disabled &&
      gb[1][1].getBtn().disabled &&
      gb[2][0].getBtn().disabled
    ) {
      if (
        gb[0][2].getToken() === gb[1][1].getToken() &&
        gb[1][1].getToken() === gb[2][0].getToken()
      ) {
        gameOver = true;
        disableAllBtns();
        gb[0][2].getBtn().style.backgroundColor = highlight;
        gb[1][1].getBtn().style.backgroundColor = highlight;
        gb[2][0].getBtn().style.backgroundColor = highlight;
        return;
      }
    }
    for (let cell of document.getElementsByClassName('cell')) {
      if (!cell.disabled) {
        return;
      }
    }
    gameOver = true;
    draw = true;
  };

  const aiMove = () => {
    let validMoves = [];
    for (let cell of document.getElementsByClassName('cell')) {
      if (!cell.disabled) {
        validMoves.push(cell);
      }
    }
    let randomBtn = validMoves[Math.floor(Math.random() * validMoves.length)];
    randomBtn.textContent = game.getCurrentPlayer().token;
    randomBtn.disabled = true;
  };

  if (playerOne.name === 'AI') {
    aiMove();
    game.switchCurrentPlayer();
    turnDiv.textContent = `${game.getCurrentPlayer().name}'s turn`;
    console.log(turnDiv.textContent);
  }

  gb.forEach((row) => {
    row.forEach((cell) => {
      cell.getBtn().addEventListener('click', () => {
        cell.addToken(game.getCurrentPlayer().token);
        cell.getBtn().disabled = true;

        highlight = '#d9f99d';
        checkWinCon();

        const turnDiv = document.querySelector('.turn');
        if (gameOver) {
          if (!draw) {
            turnDiv.textContent = `${game.getCurrentPlayer().name} wins!`;
          } else {
            turnDiv.textContent = "It's a draw.";
          }
        } else {
          game.switchCurrentPlayer();
          turnDiv.textContent = `${game.getCurrentPlayer().name}'s turn`;
          console.log(turnDiv.textContent);

          aiMove();
          highlight = '#fca5a5';
          checkWinCon();

          if (gameOver) {
            if (!draw) {
              turnDiv.textContent = `${game.getCurrentPlayer().name} wins!`;
            } else {
              turnDiv.textContent = "It's a draw.";
            }
          } else {
            game.switchCurrentPlayer();
            turnDiv.textContent = `${game.getCurrentPlayer().name}'s turn`;
            console.log(turnDiv.textContent);
          }
        }
      });
    });
  });
};

window.onload = function () {
  document.querySelector('.play').click();
};

// document.getElementById('token').addEventListener('change', () => {
//     document.querySelector('.play').click();
// });

document.querySelector('.play').addEventListener('click', () => {
  document.querySelector('.turn').innerHTML = '';
  document.querySelector('.board').innerHTML = '';

  let name = document.getElementById('name').value;
  let token = document.getElementById('token').value;

  let playerOne;
  let playerTwo;

  if (token === 'X') {
    playerOne = Player(name, token);
    playerTwo = Player('AI', 'O');
  } else {
    playerOne = Player('AI', 'X');
    playerTwo = Player(name, token);
  }

  if (name !== '') {
    DisplayController(playerOne, playerTwo);
  } else {
    DisplayController('', '');
    document.querySelector('.turn').innerHTML = '';
    for (let cell of document.getElementsByClassName('cell')) {
      cell.disabled = true;
    }
  }
});
