
export const title =
{
    width: 0,
    height: 0,
    background : null,
    select : 0,

    setUp : function(w, h, startGame, enterSound, menuSound)
    {
        let sound = enterSound;
        let titleMusic = menuSound;
        titleMusic.sound.autoplay = true;
        //titleMusic.play();
        this.width = w;
        this.height = h;
        console.log("setting up");
        this.background = new Image();
        this.background.src = "./img/title.png";
        let listenForEnter = function(event)
        {
            if(event.keyCode == 13)
            {
                titleMusic.stop();
                sound.play();
                window.removeEventListener('keyup',listenForEnter);
                startGame();
            }
        };
        window.addEventListener("keyup", listenForEnter);
    },

    draw : function(background)
    {
        background.drawImage(this.background,0,0);
        background.font = "68px Conv_kirby-classic";
        background.fillText("Kirby's Fruit Run",100,100);
        background.font = "30px Conv_kirby-classic";
        background.fillText("Press Enter!",300,450);
        background.font = "15px Conv_kirby-classic";
        background.fillText("By Attibar", 0,460);
        background.fillText("Sounds © Nintendo", 0, 480);
        //background.fillStyle = "#bcba3e";
        //background.fillRect(0,0,this.width,this.height);
    },

}
