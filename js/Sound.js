export default function sound(src)
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload","auto");
    this.sound.setAttribute("controls","none");
    this.sound.style.display = "none";

    this.sound.load();
    document.body.appendChild(this.sound);

    this.play = function()
    {
        const playPromise = this.sound.play();
        if(playPromise != undefined)
        {
            playPromise.then(function()
            {

            })
            .catch((error) => {console.log(error);})
        }
    }

    this.stop = function()
    {
        this.sound.pause();
        this.sound.currentTime = 0;
    }
}