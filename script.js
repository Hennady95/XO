let panelButton = document.querySelectorAll('.panel');
let scoreValue = document.querySelectorAll('.counter');
let body = document.querySelector('.fiedl-body');
let projectbody = document.querySelector('.container');
let newGameBtn = document.querySelector('#newGame');
let resetScoreBtn = document.querySelector('#resetScore');

let step = 0;
let winX = 0;
let winY = 0;
const buttonValue = ['X','O'];
let x = false;
let findWinner = false;

let arr = [0,0,0,0,0,0,0,0,0]

let winState = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let circle = `<svg>
<circle cx = '45' cy = '75' r = '35' fill= 'blue'></circle>
<circle cx = '45' cy = '75' r = '25' fill= 'white'></circle>
</svg>`;

let cross = `<svg>
<line x1="75" x2="15" y1="45" y2="100" stroke="red" stroke-width="13"></line>
<line x1="75" x2="15" y1="100" y2="45" stroke="red" stroke-width="13"></line>
</svg>`;

function changeValue(num) {
    str = '';
    if(x) {
        arr[num-1] = 2;
        str = circle;
    } else {
        arr[num-1] = 1;
        str = cross;
    }
    x = !x;
    return str
}

function checkWinner() {
    let str = ''
    let backgroundImg ='';
    for(let i = 0; i < winState.length; i++) {
        if(arr[winState[i][0]] === 1 && arr[winState[i][1]] === 1 && arr[winState[i][2]] === 1) {
            str ='Winner X!!!!!!'
            findWinner = true
            winX++
            scoreValue[0].textContent = `X:  ${winX}`
            backgroundImg = 'img-won'
        } else if(arr[winState[i][0]] === 2 && arr[winState[i][1]] === 2 && arr[winState[i][2]] === 2) {
            str = 'Winner O!!!!!!'
            findWinner = true
            winY++
            scoreValue[1].textContent = `Y:  ${winY}`
            backgroundImg = 'img-won'
        }
    }
    if(step === winState.length+1  && findWinner === false) {
        str = 'Friendship won!!!!!!!'
        findWinner = true;
        backgroundImg = 'img-friendship'
    }
    if(findWinner) {
        let el = document.createElement('p')
        let img =document.createElement('img')
        let winnerCase = document.createElement('div')
        winnerCase.classList.add('case')
        img.classList.add(backgroundImg);
        el.textContent = str
        el.classList.add('winMessage')
        winnerCase.append(img)
        winnerCase.append(el)
        projectbody.append(winnerCase)
        for(let i = 0; i < panelButton.length; i++)
            panelButton[i].disabled = true;
    }
}

resetScore.addEventListener('click', (event => {
    event.preventDefault();
    winX = 0;
    winY = 0;
    scoreValue[0].textContent = `X:  ${winY}`
    scoreValue[1].textContent = `Y:  ${winY}`
}))

newGameBtn.addEventListener('click', (event) => {
    event.preventDefault();
    for(let i = 0; i < arr.length; i++) {
        panelButton[i].disabled = false;
        panelButton[i].textContent = ''
        arr[i] = 0;
    }
    if(findWinner) {
        document.querySelector('.case').remove();
    }
    findWinner = false;
    x = false;
    step = 0;
})

body.addEventListener('click',(event) => {
    event.preventDefault();
    if(event.target.classList.contains('panel'))
     {
        step++
        event.target.innerHTML = changeValue(event.target.value); 
        event.target.disabled = true;  
        checkWinner();
     }
})