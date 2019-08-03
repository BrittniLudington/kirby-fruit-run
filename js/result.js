import {fruits} from "./fruits.js";

export const result = 
{
    background : 0,
    music : 0,

    setUp : function(song)
    {
        this.music = song;
        this.background = new Image();
        this.background.src = "./img/resultBackground.png";
    },

    update : function(ground)
    {
        fruits.updateResult(ground);

    },

    startRain : function(startGame)
    {
        fruits.rain();
        let listenForEnter = function(event)
        {
            if(event.keyCode == 13)
            {
                result.music.stop();
                window.removeEventListener('keyup',listenForEnter);
                fruits.endRain();
                startGame();
            }
        };
        window.addEventListener("keyup", listenForEnter);
    },

    draw : function(context)
    {
        context.drawImage(this.background,0,0);

    },

    drawScore(context,score)
    {
        fruits.drawResult(context);
        context.font = "40px Conv_kirby-classic";
        context.fillStyle = "#ffffff";

        context.fillText("RESULTS: ",600,100);
        context.fillText(score,650,150);

        context.fillText("Play Again? Press Enter",200,400);
    }
}