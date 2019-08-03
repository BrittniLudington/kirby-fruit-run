import {controls} from "./controls.js";
import createLevel from "./level.js";
import {player} from "./player.js";
import {timer} from "./timer.js";
import {title} from "./title.js";
import {display} from "./display.js";
import Sound from "./Sound.js";
import {result} from "./result.js";

let mainCanvas;
let mainContext;
let ground;
let groundContext;
let displayCanvas;
let displayContext;
let testLevel;
let animation;

let location = 0; 
let allPlayers = [];
let music;
let countSound;
/*
    0 = title screen
    1 = character select
    2 = game
    3 = winner
    4 = instructions
    -1 = inbetween
*/


function setUp()
{
    let titleMusic = new Sound("./audio/titleScreen.mp3");
    let enterMusic = new Sound("./audio/enter.wav");
    mainCanvas = document.getElementById("playerCanvas");

    mainContext = mainCanvas.getContext("2d");
    ground = document.getElementById("groundCanvas");
    groundContext = ground.getContext("2d");

    mainCanvas.width = 800;
    mainCanvas.height = 500;
    ground.width = 800;
    ground.height = 500;
    displayCanvas.width = 800;
    displayCanvas.height = 500;
    music = new Sound("./audio/Bump.mp3");
    countSound = new Sound("./audio/countdown.wav");
    mainContext.imageSmoothingEnabled = false;
    title.setUp(mainCanvas.width,mainCanvas.height,startGame,enterMusic , titleMusic);
    result.setUp(new Sound("./audio/results.mp3"));
    testLevel = createLevel(ground.height,ground.width);
    player.setUp(0,testLevel.floor.y);

    //startGame();
}

function startGame()
{
    mainContext.clearRect(0,0,mainCanvas.width,mainCanvas.height);
    groundContext.clearRect(0,0,ground.width,ground.height);
    //window.cancelAnimationFrame(animation);
    location = -1;
    player.restart(testLevel.floor.y);
    displayContext.clearRect(0,0,mainCanvas.width,mainCanvas.height);
    groundContext.fillStyle = "	#7CFC00";
    //groundContext.fillRect(0,0,mainCanvas.width,mainCanvas.height);
    testLevel.draw(groundContext);

    //allPlayers.push(player);
    //allPlayers.push(createCPU(testLevel.floor.y));
    let count = 3;
    
    let interval = setInterval(function()
    {
        countSound.play();
        displayContext.clearRect(0,0,displayCanvas.width,displayCanvas.height);
        display.drawCount(count,displayContext);
        console.log(count);
        if(count <= 0)
        {
            displayContext.clearRect(0,0,displayCanvas.width,displayCanvas.height);
            clearInterval(interval);
            controls.set();
            testLevel.begin();
            timer.startTimer(endGame);
            location = 2;
            music.play();
            //requestAnimationFrame(draw);
        }
        count--;

    },1000);

    
}

function endGame()
{
    console.log("END");
    testLevel.end();
    groundContext.clearRect(0,0,ground.width,ground.height);
    music.stop();
    result.draw(groundContext);
    result.music.play();
    result.startRain(startGame);
    location = 3;
}

function draw()
{
    if(location == -1)
    {
        testLevel.draw(groundContext);
        player.draw(mainContext);
    }
    if(location == 0)
    {
        title.draw(displayContext);
    }
    if(location == 2)
    {

            player.update(mainCanvas.width);
            display.update(player.score);
        
        testLevel.update(player);

        if(timer.checkFPS())
        {
            groundContext.clearRect(0,0,ground.width,ground.height);
            testLevel.draw(groundContext);
            mainContext.clearRect(0,0,mainCanvas.width,mainCanvas.height);
            displayContext.clearRect(0,0,displayCanvas.width,displayCanvas.height);
            display.draw(displayContext,timer.time);

            player.draw(mainContext);
            testLevel.drawFruits(mainContext);
        }

        if(timer.time <= 10 && !testLevel.timeRunningOut)
        {
            testLevel.extreme();
        }

    //renderTest();
    }
    if(location == 3)
    {
        mainContext.clearRect(0,0,mainCanvas.width,mainCanvas.height);
        displayContext.clearRect(0,0,displayCanvas.width,displayCanvas.height);
        player.endAnimation();
        result.update(mainCanvas.height);
        if(timer.checkFPS())
        {
            player.endDraw(mainContext);
            result.drawScore(displayContext,player.score);
        }

    }
    requestAnimationFrame(draw);
}

function loading()
{
    displayContext.fillStyle = "#000000";
    displayContext.font = "24px Ariel";
    displayContext.fillText("LOADING...",100,100);
}

function begin()
{
    displayCanvas = document.getElementById("displayCanvas");
    displayContext = displayCanvas.getContext("2d");
    let promise = new Promise(function(resolve,reject)
    {
        setUp();
        animation = requestAnimationFrame(draw);

    })
    .then(function(value)
    {
        console.log("hello");
        //animation = requestAnimationFrame(draw);

    });
    loading();

}

begin();
