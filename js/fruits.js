import {physics} from "./physics.js";
import getRandomInt from "./math.js";
export const fruits = {
    existingFruits : [],
    imageSheet : null,
    collectedFruits : [],
    fruitsOnScreen : [],
    rainInterval : 0,

    clear : function()
    {
        this.existingFruits.length = 0;
        this.collectedFruits.length = 0;
        this.fruitsOnScreen.length = 0;
    },
    createFruit : function(x, y)
    {
        let colors = [0,40,80,120]; // x values on sheet
        let newFruit = {
            x : x,
            y : y,
            width : 40,
            height : 40,
            color : colors[getRandomInt(4)],
            isGrowing : true,
            growthInterval : 0,
            growthCount : 0
        }
        newFruit.growthInterval = setInterval(function()
        {
            newFruit.growthCount ++;
            if(newFruit.growthCount >= 3)
            {
                newFruit.isGrowing = false;
                clearInterval(newFruit.growthInterval);
            }
        },500);
        this.existingFruits.push(newFruit);
        /*Function that creates a typical fruit. It takes in an x and y value for the origin point
         Fruit hangs for two seconds before falling at a constant rate*/
    },

    update : function(ground, char)
    {
        for(let obj in this.existingFruits)
        {
            let f = this.existingFruits[obj];
            if(!f.isGrowing)
            {
                f.y += physics.gravity;
            
                if(f.y+f.height > ground)
                {
                    this.existingFruits.splice(obj,1);
                }

                    if(this.collide(f,char))
                    {
                        let pushedFruit = this.existingFruits.splice(obj,1);
                        this.collectedFruits.push(pushedFruit[0]);
                        char.score++;
                        char.getFruit.play();
                        char.grabbing = true;
                        char.sprY = 3;
                        char.sprX = 0;
                        setTimeout(function()
                        {
                            char.grabbing = false;
                        },500);

                    }
                
            }
        }
    },

    rain : function()
    {
        
        this.rainInterval = setInterval(function()
        {
            let item = fruits.collectedFruits.pop();
            item.x = Math.random()*(650-550)+550;
            item.y = 50;
            fruits.fruitsOnScreen.push(item);
            if(fruits.collectedFruits.length == 0)
                clearInterval(this.rainInterval);
        },500);
    },

    endRain : function()
    {
        clearInterval(this.rainInterval);
    },

    updateResult(ground)
    {
        for(let i = 0; i < this.fruitsOnScreen.length; i++)
        {
            let fruit = this.fruitsOnScreen[i];
            fruit.y += physics.gravity;

            if(fruit.y+fruit.height > ground)
            {
                this.fruitsOnScreen.splice(fruit,1);
            }
        }
    },

    drawResult(context)
    {
        for(let obj in this.fruitsOnScreen)
        {
            let f = this.fruitsOnScreen[obj];
            //context.fillStyle = f.color;
            //context.fillRect(f.x,f.y,f.width,f.height);
            context.drawImage(this.imageSheet,f.color,0,f.width,f.height,f.x,f.y,f.width,f.height);
        }
    },

    collide : function(fruit,char)
    {
        let xcol = (fruit.x <= char.x && fruit.x+fruit.width >= char.x) ||
        (fruit.x >= char.x && fruit.x <= char.x+char.width && fruit.x+fruit.width >= char.x+char.width)
        || (fruit.x >= char.x && fruit.x+fruit.width <= char.x+char.width);

        let ycol = (fruit.y <= char.y && fruit.y+fruit.height >= char.y) ||
        (fruit.y >= char.y && fruit.y+fruit.height >= char.y+char.height)
        || (fruit.y >= char.y && fruit.y+fruit.height <= char.y+char.height);

        return xcol && ycol;
    },

    draw : function(context)
    {
        for(let obj in this.existingFruits)
        {
            let f = this.existingFruits[obj];
            //context.fillStyle = f.color;
            //context.fillRect(f.x,f.y,f.width,f.height);
            context.drawImage(this.imageSheet,f.color,0,f.width,f.height,f.x,f.y,f.width,f.height);
        }
    }
};