//constants of the game

let inputDir={x:0,y:0}
const foodsound=new Audio('music/food.mp3');
const gameoversound=new Audio('music/gameover.mp3')
const movesound=new Audio('music/move.mp3')

let speed=10;
let lasttime=0;
let score=0;
let snakearr=[{
    x:6,y:7
}]
food={ x:13,y:15};

//game functions
function main(ctime){
   window.requestAnimationFrame(main);
   if((ctime-lasttime)/1000 < 1/speed) return;
   lasttime=ctime;
   gameEngine();
}
function iscollide(snake){
    for (let index = 1; index < snakearr.length; index++) {
        if(snake[index].x===snake[0].x && snake[index].y===snake[0].y)
            return true;
    }
    if(snake[0].x>=18 || snake[0].x<0 || snake[0].y>=18 || snake[0].y<0)
        return true;

    return false;
}

function gameEngine(){
   
    if(iscollide(snakearr))
    {
         gameoversound.play();
         inputDir={x:0,y:0};
         alert("Game Over Press any key to restart")
         snakearr=[{x:13,y:15}];
         score=0;
    }

    //to eat the food
    if(snakearr[0].x===food.x && snakearr[0].y===food.y)
    {
        foodsound.play();
        score++;
        speed+=1;
        scorebox.innerHTML="Score : "+score;
        snakearr.unshift({x:snakearr[0].x+inputDir.x,y:snakearr[0].y+inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }

    //moving the snake
    for (let i = snakearr.length-2; i >=0; i--) {
        snakearr[i+1]={...snakearr[i]}
    }
    snakearr[0].x+=inputDir.x;
    snakearr[0].y+=inputDir.y;


    //display the snake
    board.innerHTML="";
    snakearr.forEach((e,i) => {
    snakeElement=document.createElement('div');
    snakeElement.style.gridRowStart=e.y;
    snakeElement.style.gridColumnStart=e.x;
    
    if(i===0)
    {
        snakeElement.classList.add('head')
    }
    else{
        snakeElement.classList.add('snake')
    }
    board.appendChild(snakeElement);
    });

    //display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
    
}


//game logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp"||"W":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown"||"s":
            inputDir.x=0;
            inputDir.y=1;
            break;
        
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})