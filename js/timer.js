
export const timer =
{
    oldFrameTimer : 0,
    oldMainFrame : 0,
    characterFps : 84,
    oldFrameWhispy : 0,
    Fps : 16,
    time : 0,

    setUp : function()
    {
        this.oldFrameTimer = Date.now();
        this.oldMainFrame = this.oldFrameTimer;
    },

    checkFrame : function()
    {
        let now = Date.now();
        let elapsed = now - this.oldFrameTimer;
        if(elapsed >= this.characterFps)
        {
            this.oldFrameTimer = now - (elapsed % this.characterFps);
            return true;
        }
        return false;
    },

    checkFrameWhispy : function()
    {
        let now = Date.now();
        let elapsed = now - this.oldFrameWhispy;
        if(elapsed >= this.characterFps)
        {
            this.oldFrameWhispy = now - (elapsed % this.characterFps);
            return true;
        }
        return false;
    },

    checkFPS : function()
    {
        let now = Date.now();
        let elapsed = now - this.oldMainFrame;
        if(elapsed >= this.Fps)
        {
            this.oldMainFrame = now - (elapsed % this.Fps);
            return true;
        }
        return false;
    },

    startTimer : function(callback)
    {
        this.time = 40; // seconds
        let interval = setInterval(function()
        {
            timer.time --;
            if(timer.time == 0)
            {
                clearInterval(interval);
                callback();
            }
        },1000);
    }
}