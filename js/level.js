import {fruits} from "./fruits.js";
import getRandomInt from "./math.js";
import {gordos} from "./gordo.js";
import {timer} from "./timer.js";

export default function createLevel(h, w)
{
    // creates a new level
    let level = {};
    //level.background = createBackground(backgroundAddress);
    level.start = null;
    console.log("creating level");
    level.img = new Image();
    level.img.src = "./img/background.png";
    level.backImg = new Image();
    level.backImg.src = "./img/backgroundB.png";
    level.timeRunningOut = false;

    level.floor = {
        color :"#96F793",
        width : w,
        height : 50,
        y : h - 50
    };
    level.tree = {
        color : "#D5D03A",
        height: 150,
        width : w
    };
    level.whispy = {
        img : 0,
        height: h,
        width : 250,
        x : w/2 - 100,
        y : 0,
        sprX : 0,
        direction : 1
    }
    fruits.imageSheet = new Image();
    level.whispy.img = new Image();
    level.whispy.img.src = "./img/whispy-sprites.png";
    fruits.imageSheet.src = "./img/fruit-sprites.png";
    gordos.image = new Image();
    gordos.image.src = "./img/gordo-sprite.png";
    level.draw = function(context)
    {
       //context.fillStyle = this.whispy.color;
       //context.fillRect(this.whispy.x,0,this.whispy.width,this.whispy.height);
       context.drawImage(level.backImg,0,-100);
       if(timer.checkFrameWhispy())
       {
           if(level.whispy.direction > 0)
           {
                level.whispy.sprX ++;
               if(level.whispy.sprX >= 8 )
                level.whispy.direction = -1;
           }
           if(level.whispy.direction < 0)
           {
            level.whispy.sprX--;
            if(level.whispy.sprX <= 0)
                level.whispy.direction = 1;
           }
       }
        context.drawImage(level.whispy.img,level.whispy.sprX*level.whispy.width,0,level.whispy.width,level.whispy.height,level.whispy.x,level.whispy.y,level.whispy.width,level.whispy.height);
       context.drawImage(level.img,0,0);
    };
    level.update = function(player)
    {
        fruits.update(this.floor.y,player);
        gordos.update(this.floor.y,player);
    };
    level.drawFruits = function(context)
    {
        fruits.draw(context);
        gordos.draw(context);
    };
    level.begin =  function()//setInterval(function()
    {
        fruits.clear();
        gordos.clear();
        this.timeRunningOut = false;
        this.start = setInterval(function(){
            let x = getRandomInt(level.tree.width);
            let y = getRandomInt(level.tree.height);
            fruits.createFruit(x,y);
            let chance = Math.floor(Math.random()*gordos.initialChance);
            //console.log(chance);
            if(chance == 1)
            {
                x = getRandomInt(level.tree.width);
                y = getRandomInt(level.tree.height);
                gordos.createGordo(x,y);
            }
        },700);
    };

    level.extreme = function()
    {
        clearInterval(this.start);
        this.start = setInterval(function(){
            let x = getRandomInt(level.tree.width);
            let y = getRandomInt(level.tree.height);
            fruits.createFruit(x,y);
            let chance = Math.floor(Math.random()*5);
            //console.log(chance);
            if(chance == 1)
            {
                x = getRandomInt(level.tree.width);
                y = getRandomInt(level.tree.height);
                gordos.createGordo(x,y);
            }
        },300);
        level.timeRunningOut = true;
    };
    level.end = function()
    {
        console.log("clearing level");
        clearInterval(this.start);
    }
    return level;
};