
export const camera = 
{
    x : 0,
    y : 0,
    width : 0,
    height : 0,
    limit : 50,

    set : function(w, h)
    {
        this.width = w;
        this.height = h;
    },

    position : function(nx,ny)
    {
        this.x = nx;
        this.y = ny;
    }
};