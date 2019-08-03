import {fruits} from "./fruits.js";
export default function createCPU(h)
{
    let cpu = {};
    cpu.color = "#FFA500";
    cpu.width = 70;
    cpu.height = 70;
    cpu.x = 100;
    cpu.y = h-cpu.height;
    cpu.speed = 7;
    cpu.score = 0;
    cpu.grabbing = false;

    cpu.draw = function(context)
    {
        context.fillStyle = this.color;
        context.fillRect(cpu.x,cpu.y,cpu.width,cpu.height);
    };

    cpu.update = function(maxX)
    {
        if(!this.grabbing)
        {
            let fruitArray = fruits.existingFruits;
            let distance = {length : 1000, f : null};
            function getDistance(fruit,d)
            {
                let a = cpu.x - (fruit.x+fruit.width);
                let b = cpu.y - (fruit.y + fruit.height);
    
                let c = Math.sqrt(a * a + b * b);
    
                if(c < d.length)
                {
                    return {length : c, f : fruit};
                }
                return d;
            };
            for(let i = 0; i < fruitArray.length; i++)
            {
                distance = getDistance(fruitArray[i],distance);
            }
            if(distance.f != null)
            {
                if(distance.f.x < this.x)
                {
                    this.x -= this.speed;
                }
                if(distance.f.x > this.x)
                {
                    this.x += this.speed;
                }
            }
        }
        
    };

    return cpu;
};