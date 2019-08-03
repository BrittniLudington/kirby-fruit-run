import {controls} from "./controls.js";
import {timer} from "./timer.js";
import sound from "./Sound.js";

export const player =
{
    color : "#FFFF33",
    width : 70,
    height : 70,
    sprWidth : 100,
    sprHeight : 100,
    sprColor : "#F793D9",
    x : 0,
    y : 0,

    run : 10,
    sprite : 0,
    sprX : 1,
    sprY : 0,
    score : 0,
    grabbing : false,
    isHurt : false,
    hurt : 0,
    getFruit : 0,

    setUp : function(w,h)
    {
        this.getFruit = new sound("./audio/getFruit.wav");
        this.hurt = new sound("./audio/hurt.wav");
        this.sprite = new Image();
        this.sprite.src = "./img/kirby-basket-sprites.png";
        this.x = 100;
        this.y = h-this.height;
        //this.sprite.src = "./img/kirby-sprite.png";
    },

    restart : function(h)
    {
        this.x = 100;
        this.y = h - this.height;
        this.score = 0;
    },

    draw : function(context)
    {
        // REMINDER: left/right = 150 px. Idle = 100px
        let w = 150;

        if(timer.checkFrame())
        {
            this.sprX++;
            if(this.sprX >= 8)
                this.sprX = 1;
            if(this.sprX >= 6 && (this.grabbing || this.isHurt))
            {
                this.sprX = 0;
            }
        }

            if(this.sprY == 2)
            {
                w = 100;
                this.sprX = 0;
            }
            if(!controls.anyKeyPressed() && !this.grabbing && !this.isHurt)
            {
                this.sprX = 0;
                this.sprY = 2;
                w = 100;
            }
            if(this.grabbing || this.isHurt)
            {
                w = 100;
            }
        /*context.fillStyle = this.sprColor;
        context.fillRect(this.x-15,this.y-30,this.sprWidth,this.sprHeight);

        */
       let xloc = this.x-15;
        if(this.sprY == 1)
        {
            xloc = this.x - 70;
        }

        context.drawImage(this.sprite,this.sprX*w,this.sprY*100,w,100,xloc,this.y,w,100);

    },
    

    update : function(maxX)
    {

        if(!this.grabbing && !this.isHurt)
        {
            if(controls.keyPressed(37) || controls.keyPressed(65)) // left
            {
                this.sprY = 1;
                this.x -= this.run;
            }
            else if(controls.keyPressed(39) || controls.keyPressed(68)) // right
            {
                this.sprY = 0;
                this.x += this.run;
            }
            else
            {
                this.sprY = 2;
            }

        }

        this.checkBoundaries(maxX);
    },

    checkBoundaries : function(maxX)
    {
        if(this.x < 0)
            this.x = 0;
        if(this.x+this.width > maxX)
            this.x = maxX - this.width;
    },

    endAnimation : function()
    {
        this.sprX = 1;
        this.sprY = 2;

        this.x = 175;
        this.y = 260;
    },

    endDraw : function(context)
    {
        context.drawImage(this.sprite,this.sprX*100,this.sprY*100,100,100,this.x,this.y,100,100);
    }

};