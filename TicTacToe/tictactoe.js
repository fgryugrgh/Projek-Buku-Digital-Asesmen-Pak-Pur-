
//to keep track of the x and o
let tictac = ['0', '1', '2',
              '3', '4', '5',
              '6', '7', '8']

//keep track of the turn
let turn = 'X';
let swapTrack = false;

//keep track of the score
let score = JSON.parse(localStorage.getItem('score')) || {
  X: 0,
  O: 0
}

//check all 8 combinations of winning
function checkIfSame() {
  return tictac[0] === tictac[1] && tictac[1] === tictac[2] ||
    tictac[3] === tictac[4] && tictac[4] === tictac[5] ||
    tictac[6] === tictac[7] && tictac[7] === tictac[8] ||
    tictac[0] === tictac[3] && tictac[3] === tictac[6] ||
    tictac[1] === tictac[4] && tictac[4] === tictac[7] ||
    tictac[2] === tictac[5] && tictac[5] === tictac[8] ||
    tictac[0] === tictac[4] && tictac[4] === tictac[8] ||
    tictac[6] === tictac[4] && tictac[4] === tictac[2]
}

//check if it's a draw or not so the game can actually end
function checkDraw() {
  return tictac.every(cell => cell !== `${tictac.indexOf(cell)}`);
}

//function to add the x and o when click
function click12(n) {
  //if it's X turn
  if (turn === 'X') {
    const use = document.getElementById(n);
    if (use.textContent.length !== 1) {
      use.textContent = 'x';
      turn = 'O';
      const place = n.substr(1);
      tictac[place] = 'X';
    }

    //change turn text or whatever
    const turnElement = document.getElementById('turn');
    turnElement.textContent = 'O turn';

    //check if the container met one of the win conditions
    if (checkIfSame()) {
      if (turn === 'O') {
        let overLet = document.getElementById('overlay')
        overLet.style.display = 'block';
        let overP = document.getElementById('overP')
        overP.textContent = 'X wins!';
        score.X += 1
        //send score to localStorage
        localStorage.setItem('score', JSON.stringify(score))
        //display it
        document.getElementById('score').innerText = `X:${score.X} O:${score.O}`
      }
      //if it doesn't meet the win condition, it will check for a draw
    } else if (checkDraw()) {
      let overLet = document.getElementById('overlay')
      overLet.style.display = 'block';
      let overP = document.getElementById('overP')
      overP.textContent = 'Draw!';
    }

    //if it's O turn
  } else if (turn === 'O') {
    const use = document.getElementById(n);
    if (use.textContent.length !== 1) {
      use.textContent = 'o';
      turn = 'X';
      const place = n.substr(1);
      tictac[place] = 'O';
    }

    const turnElement = document.getElementById('turn');
    turnElement.textContent = 'X turn'

    //check if the container met one of the win conditions
    if (checkIfSame()) {
      if (turn === 'X') {
        const overLet = document.getElementById('overlay')
        overLet.style.display = 'block';
        let overP = document.getElementById('overP')
        overP.textContent = 'O wins!';
        score.O += 1
        //send score to localStorage
        localStorage.setItem('score', JSON.stringify(score))
        //display it
        document.getElementById('score').innerText = `X:${score.X} O:${score.O}`
      }
      //if it doesn't meet the win condition, it will check for a draw
    } else if (checkDraw()) {
      let overLet = document.getElementById('overlay')
      overLet.style.display = 'block';
      let overP = document.getElementById('overP')
      overP.textContent = 'Draw!';
    }
  }
}

//to clear the game and overlay after finishing it
function clearOver() {
  if (swapTrack === false) {
    turn = 'X';
    const turnElement = document.getElementById('turn');
    turnElement.textContent = 'X turn'
  } else {
    turn = 'O';
    const turnElement = document.getElementById('turn');
    turnElement.textContent = 'O turn'
  }
  let overLet = document.getElementById('overlay');
  overLet.style.display = 'none';
  tictac = ['0', '1', '2',
    '3', '4', '5',
    '6', '7', '8']
  let divs = document.querySelectorAll('.c');
  divs.forEach(function (div) {
    div.innerText = '';
  });
}

//set the score at the start of the game
document.getElementById('score').innerText = `X:${score.X} O:${score.O}`

//function to reset score
function resetScore() {
  score.X = 0;
  score.O = 0;
  localStorage.setItem('score', JSON.stringify(score))
  document.getElementById('score').innerText = `X:${score.X} O:${score.O}`
}

//function to swap
function swap() {
  if (swapTrack === false) {
    turn = 'O';
    document.getElementById('swap').innerText = 'swap O => X';
    const turnElement = document.getElementById('turn');
    turnElement.textContent = 'O turn';
    swapTrack = true;
  } else if (swapTrack === true) {
    turn = 'X';
    document.getElementById('swap').innerText = 'swap X => O'
    const turnElement = document.getElementById('turn');
    turnElement.textContent = 'X turn'
    swapTrack = false;
  }
  let divs = document.querySelectorAll('.c');
  divs.forEach(function (div) {
    div.innerText = '';
  });
  tictac = ['0', '1', '2',
            '3', '4', '5',
            '6', '7', '8']
}
