const score =document.querySelector('.score');
const gameArea = document.querySelector('.game-area');
const startScreen = document.querySelector('.start-screen');
const keys ={
    ArrowDown:false,
    ArrowUp:false,
    ArrowLeft:false,
    ArrowRight:false,
}
const player ={speed:5,score:0};
const road = gameArea.getBoundingClientRect();

function randomColor(){
    function c(){
    const hex = Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substr(-2);
    }
    return '#' + c()+c()+c();
}

function isColided(car,enemy){
    const carRect = car.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
    return !(
        (carRect.bottom < enemyRect.top) ||
        (carRect.top > enemyRect.bottom) ||
        (carRect.right < enemyRect.left) ||
        (carRect.left > enemyRect.right) 
    );
}

function moveLines(){
    const lines = document.querySelectorAll('.line');
    lines.forEach(line =>{
        if(line.y > 650){
            line.y -=650;
        }
        line.y += player.speed;
        line.style.top=line.y+'px';
    });
}
function moveEnemy(car){
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach(enemy =>{
       if( isColided(car,enemy)){
           console.log('Hit');
           endGame();
       }
        if(enemy.y > 1500){
            enemy.y = -600;
            enemy.style.left = Math.floor(Math.random()*300) + 'px';
        }
        enemy.y += player.speed;
        enemy.style.top=enemy.y+'px';
    });
}

function playGame(){
    const car = document.querySelector('.car');
    moveLines();
    moveEnemy(car);

    if(player.start){
        if(keys.ArrowDown && player.y > 10){player.y -= player.speed}
        if(keys.ArrowUp && player.y < 500){player.y += player.speed}
        if(keys.ArrowLeft && player.x >0){player.x -= player.speed}
        if(keys.ArrowRight && player.x < 350){player.x += player.speed}
        car.style.left = player.x+'px';
        car.style.bottom = player.y +'px';

        window.requestAnimationFrame(playGame);
        player.score ++ ;
        score.textContent = 'Score : ' +player.score;
    }
}

function pressOff (event){
    event.preventDefault();
    keys[event.key] = false ;
}
function pressOn (event){
    event.preventDefault();
    keys[event.key] = true ;
}
function endGame(){
    player.start =false;
    startScreen.classList.remove('hide');
    score.innerText = "Game Over the Score was " + player.score;
}
function start(){
    gameArea.innerHTML = '';
    player.score = 0;
    player.start = true;
    startScreen.classList.add('hide');
    gameArea.classList.remove('hide');

    for(let i =0 ; i< 5 ; i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.y = i*150;
        line.style.top = (i*150) + 'px';
        gameArea.appendChild(line);
    }
    window.requestAnimationFrame(playGame);
    const car = document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);
    player.y = car.offsetTop;
    player.x = car.offsetLeft;

    for(let i =0 ; i< 3 ; i++){
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = ((i+1)*600)*-1;
        enemy.style.top = enemy.y+'px';
        enemy.style.left = Math.floor(Math.random()*300) + 'px';
        enemy.style.backgroundColor = randomColor();
        gameArea.appendChild(enemy);
    }
    console.log(player);
}

startScreen.addEventListener('click',start);
document.addEventListener('keydown',pressOn);
document.addEventListener('keyup',pressOff);