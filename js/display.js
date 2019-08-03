export const display = 
{
    text : "",

    update : function(score)
    {
        this.text = "Score: " + score;
    },

    draw : function(context, time)
    {
        // score
        context.fillStyle = "#000000";
        context.font = "24px Conv_kirby-classic";
        context.fillText(this.text,0,50);

        // timer
        context.fillText(time,750,50);
    },

    drawCount : function(count,context)
    {
        context.fillStyle = "#000000";
        context.font = "60px Conv_kirby-classic";
        context.fillText(count,410,250);
    }
}