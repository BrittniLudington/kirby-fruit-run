import {physics} from "./physics.js";
import getRandomInt from "./math.js";

export const gordos = 
{
    existingGordos : [],
    initialChance : 10,
    image : null,

    clear : function()
    {
        this.existingGordos.length = 0;
    },
    createGordo : function(x,y)
    {
        let newGordo = {
            x : x,
            y : y,
            width : 60,
            height : 60,
            growthInterval : 0,
            growthCount : 0,
            isGrowing : true
        };
        newGordo.growthInterval = setInterval(function()
        {
            newGordo.growthCount ++;
            if(newGordo.growthCount >= 3)
            {
                newGordo.isGrowing = false;
                clearInterval(newGordo.growthInterval);
            }
        },500);
        this.existingGordos.push(newGordo);
    },

    update : function(ground,char)
    {
        for(let obj in this.existingGordos)
        {
            let f = this.existingGordos[obj];
            if(!f.isGrowing)
            {
                f.y += physics.gravity;
            
                if(f.y+f.height > ground)
                {
                    this.existingGordos.splice(obj,1);
                }

                    if(this.collide(f,char))
                    {
                        this.existingGordos.splice(obj,1);
                        char.score -= 5;
                        char.hurt.play();
                        if(char.score < 0)
                            char.score = 0;
                        setTimeout(function()
                        {
                            char.isHurt = false;
                        },500);
                        char.isHurt = true;
                        char.sprY = 4;
                        char.sprX = 0;
                    }
                
            }
        }
    },

    
    collide : function(gordo,char)
    {
        let xcol = (gordo.x <= char.x && gordo.x+gordo.width >= char.x) ||
        (gordo.x >= char.x && gordo.x <= char.x+char.width && gordo.x+gordo.width >= char.x+char.width)
        || (gordo.x >= char.x && gordo.x+gordo.width <= char.x+char.width);

        let ycol = (gordo.y <= char.y && gordo.y+gordo.height >= char.y) ||
        (gordo.y >= char.y && gordo.y+gordo.height >= char.y+char.height)
        || (gordo.y >= char.y && gordo.y+gordo.height <= char.y+char.height);

        return xcol && ycol;
    },


    draw : function(context)
    {
        for(let i = 0; i < this.existingGordos.length; i++)
        {
            let obj = this.existingGordos[i];
            //context.fillStyle = obj.color;
            //context.fillRect(obj.x,obj.y,obj.width,obj.height);
            context.drawImage(this.image,0,0,obj.width,obj.height,obj.x,obj.y,obj.width,obj.height);

        }
    }
};