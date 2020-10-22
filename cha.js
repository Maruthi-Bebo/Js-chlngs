//challenge 1

function ageInDays(){
    var birthYear=prompt("what year were you born?");
    var days= (2020-birthYear)*365;
    var h1=document.createElement('h1');
    let ans=document.createTextNode('You are ' + days+ ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(ans);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

//challenge 2

function geneCat(){
    let image=document.createElement('img');
    let div=document.getElementById('flexDiv');
    image.src = "img/cat.gif";
    div.appendChild(image);
}
//challenge 3
function rpsGame(yourChoice){
    var humanChoice, compChoice;
    humanChoice=yourChoice.id;
    compChoice=randomChoice(randInt());
    result=decideWinner(humanChoice,compChoice);
    message= finalMessage(result);
    rpsFrontEnd(humanChoice, compChoice,  message);

}
function randInt(){
    return Math.floor(Math.random()*3);
}
function randomChoice(number){
    return ['rock', 'paper', 'scissor'][number];
}
function decideWinner(myChoice, deviceChoice){
    var rpsDataBase = {
        'rock' : {'scissor':1, 'rock':0.5, 'paper':0},
        'paper' : {'rock':1, 'paper':0.5, 'scissor':0},
        'scissor' : {'paper':1, 'scissor':0.5, 'rock':0},
    };
    var youScore=rpsDataBase[myChoice][deviceChoice];
    var compScore=rpsDataBase[deviceChoice][myChoice];
    return [youScore, compScore];
}
function finalMessage([first, second]){
    if (first===0){
        return {'message':'You Lost!', 'color':'red'};
    }else if(first===0.5){
        return {'message': 'You tied!', 'color':'Yellow'};
    }else {
        return {'message': 'You Won!', 'color': 'Green'};
    }
}

function rpsFrontEnd(humanImg, compImg, text){
    var imgDataBase ={
        'rock' : document.getElementById('rock').src,
        'paper' : document.getElementById('paper').src,
        'scissor' : document.getElementById('scissor').src,
    };
    //lets remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv=document.createElement('div');
    var compDiv=document.createElement('div');
    var textDiv=document.createElement('div');

    humanDiv.innerHTML="<img src='"+ imgDataBase[humanImg] + "' width='150' height='150' style='box-shadow:0px 10px 40px rgba(37, 50, 233, 1)'>"
    textDiv.innerHTML="<h1 style='color:"+ text['color'] + "; padding:30px; font-size:60px' >"+ text['message'] + "</h1>"
    compDiv.innerHTML="<img src='"+ imgDataBase[compImg] + "' width='150' height='150' style='box-shadow:0px 10px 40px rgba(243, 38, 24, 1)'>"
    document.getElementById('rps-flex-id').appendChild(humanDiv);
    document.getElementById('rps-flex-id').appendChild(textDiv);
    document.getElementById('rps-flex-id').appendChild(compDiv);
}

//Challenge 4
var all_buttons=document.getElementsByTagName('button'); // to get a length 

var copyAllButtons=[];
for ( let i=0; i<all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}


function buttonColorChange(buttonThingy){
    if (buttonThingy.value === 'red'){
        buttonRed();
    }else if (buttonThingy.value === 'green'){
        buttonGreen();
    }else if (buttonThingy.value === 'reset'){
        buttonReset();
    }else if (buttonThingy.value === 'random'){
        buttonRandom();
    } 
}

function buttonRed(){
    for (let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    for (let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonReset(){
    for (let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonRandom(){
    var color=['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    var num=Math.floor(Math.random()*4);
    for (let i=0; i<all_buttons.length; i++){
        var num=Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(color[num]);
}
}

//challege 5

let blackjackGame ={
    'you': {'scoreSpan':'#your-score', 'div': '#your-box', 'score':0},
    'dealer': {'scoreSpan':'#dealer-score', 'div': '#dealer-box', 'score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsmap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':1},
    'wins': 0,
    'losses': 0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
    'hitDeal': false,
};
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound= new Audio('sounds/swish.m4a');
const winSound= new Audio('sounds/cash.mp3');
const loseSound= new Audio('sounds/aww.mp3');

document.querySelector('#hit-button').addEventListener('click', blackjackHit);
document.querySelector('#stand-button').addEventListener('click', dealerLogic);
document.querySelector('#deal-button').addEventListener('click', blackjackDeal);


function blackjackHit(){
    if (blackjackGame['isStand'] === false){
        blackjackGame['hitDeal']=true;
        let card=randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){  
    blackjackGame['isStand']=true;
    blackjackGame['hitDeal']=false;

    while (DEALER['score'] < 17 && blackjackGame['isStand'] === true){
        let card=randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    if (DEALER['score']>=17){
        blackjackGame['turnsOver']=true;
        showResult(computeWinner());  
    }

}

function showCard(card, activePlayer){
    if (activePlayer['score']<=21){
        let cardImg=document.createElement('img');
        let pic='img/'+card+'.png'
        cardImg.src=pic;
        document.querySelector(activePlayer['div']).appendChild(cardImg);
        hitSound.play();
    }

}

function blackjackDeal(){
    if (blackjackGame['turnsOver'] === true && blackjackGame['hitDeal']===false){
        let yourCards = document.querySelector('#your-box').querySelectorAll('img');
        let dealerCards = document.querySelector('#dealer-box').querySelectorAll('img');
        for (let i=0; i<yourCards.length; i++){
            yourCards[i].remove();
        }
        for (let i=0; i<dealerCards.length; i++){
            dealerCards[i].remove();
        }

        blackjackGame['isStand']=false;
        
        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#your-score').textContent= 0;
        document.querySelector('#dealer-score').textContent= 0;
        document.querySelector('#your-score').style.color = 'white';
        document.querySelector('#dealer-score').style.color='white';

        document.querySelector('#blackjack-result').textContent="Let's Play" ;
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['hitDeal']=false;
        blackjackGame['isStand']=false;
        blackjackGame['turnsOver']=false;

    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card,activePlayer){
    activePlayer['score'] += blackjackGame['cardsmap'][card];
}

function showScore(activePlayer){
    if(activePlayer['score'] >21){
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

// compute Winner
function computeWinner(){
    let winner;
    if (YOU['score']<=21){
        if(YOU['score'] > DEALER['score'] || DEALER['score']>21){
            blackjackGame['wins']++;
            winner = YOU;
        }else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        }else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
    }else if(YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['losses']++;
        winner=DEALER;
    }else if(YOU['score']>21 && DEALER['score']>21){
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner){
    if(blackjackGame['turnsOver']===true){
        if(winner===YOU){
            msg='You Won!';
            msgColor='green';
            winSound.play();
        }else if(winner===DEALER){
            msg='You lost!';
            msgColor='red';
            loseSound.play();
        }else{
            msg='You drew!';
            msgColor='black';
        }
        document.querySelector('#blackjack-result').textContent = msg;
        document.querySelector('#blackjack-result').style.color = msgColor;

        document.querySelector('#wins').textContent= blackjackGame['wins'];
        document.querySelector('#losses').textContent= blackjackGame['losses'];
        document.querySelector('#draws').textContent= blackjackGame['draws'];
    }
}

