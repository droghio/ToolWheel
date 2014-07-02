
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//
//XXXXXX  XXX     XXX XXX XXX  XX XXX//
//XXXXXX  XXX XXX XXX     XXX X X XXX//
//XXX XX  XXX XXX XXX XXX XXX XX  XXX//
//XXX     XXX     XXX XXX XXX XXX XXX//
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//
//
//
//-------------------------------
//Handy toolwheel widget creater.
//
//Makes circles in circles, possibly in circles!
//--------------------------------

// July 1, 2014
// John Drogo



function twCircle(content, index, parentselector, size, padding, rotation){
    this.content = content;
    this.innergeometry = {}
    this.index = 0
    
    this.rotation = rotation || 0;
    this.padding = padding || 2;
    
    me = this
    indecies = []
    $(".tw-circle").each(function(){
        if (Number($(this).attr("data-id")) >= me.index){
            indecies.push(Number($(this).attr("data-id")))
            me.index = Number($(this).attr("data-id"))+1
        }
    })
    
    //If circle does not exist create it.
    if (indecies.indexOf(index) == -1 || index === undefined){
        this.index = index || this.index;
        parentselector = parentselector || "body"
        $(parentselector).append('<div class="tw-circle" data-id="' + this.index + '"></div>')
        $(".tw-circle[data-id="+this.index+"]").css({height: size, width: size})
    }

    this.r = (size/2 || (Number($(".tw-circle[data-id="+this.index+"]").css("height").split("px")[0])/2))

}


twCircle.prototype = {
    
    content: null,
    padding: null,
    innergeometry: null,
    index: null,
    
    //Pass this an array of the content you want in the widget.
    updateSections: function (){
        
        this.r = (Number($(".tw-circle[data-id="+this.index+"]").css("height").split("px")[0])/2)
        this.dom = $(".tw-circle[data-id="+this.index+"]").css({"-webkit-transform": "rotate(" + this.rotation + "deg)"})
        
        if (this.padding === "undefined")
            this.padding = 2
            
        var n = this.content.length
        var theta = 2*Math.PI/n
            
        $(".tw-circle[data-id="+this.index+"]").empty()
        
        for (i=0; i < n; i++){
            $(".tw-circle[data-id="+this.index+"]").append(
                '<div class="tw-line" style="-webkit-transform: rotate(' + (theta*i) + 'rad);">\
                    <div class="tw-marker" style="-webkit-transform: rotate(' + (-theta*i-(this.rotation/180*Math.PI)) + 'rad);">\
                        <div class="tw-markerinner">' + this.content[i] + '</div>\
                    </div>\
                </div>'
            );
        }
        
        var r = this.r * .8
        $(".tw-circle[data-id="+this.index+"] .tw-marker").css({"height": r*2, width: r*2, margin: -r, left: "0px"})
        
        //Update newly created markers.
        //jQuery overrides the this variable with dom element.

        var me = this
        $(".tw-circle[data-id="+this.index+"] .tw-marker").fadeIn(function(){me.solveInnerCircles()})

        $(".tw-circle[data-id="+this.index+"]").resize(function(){
            me.r = (Number($(".tw-circle[data-id="+me.index+"]").css("height").split("px")[0])/2)
            me.updateSections()
        })

    },
        
        
    //Returns the center offset and the radius for the circles.
    solveInnerCircles: function (){
        
        var n = this.content.length
        
        //I'm using half of theta since all my forumlas use theta/2.
        theta = Math.PI/n;
        var r = this.r
        
        var v = {}
        var m = {}
        
        cos = Math.cos;
        sin = Math.sin;
        tan = Math.tan;
        
        //Radius assumed to be one, all relative scaling.
        var a = 1/cos(theta)
        
        v.x = a * sin(-theta)
        v.y = a * cos(theta)  //No negatation needed for the angle, cosine is positive in quads 1 and 4.
        
        //slope(v, m) //That's the centroid, not the incenter, oops.
        o = tan(Math.atan(this.slope(v, {x: 0, y: 0}))/2)
        
        //Closure has access to container's variables.
        yBi = function(x){ return o*(x-v.x) + v.y;  }
        
        var center = {x:0, y:yBi(0)}
        var radius = 1-center.y
        this.innergeometry = {center: center, radius: radius}

        this.updateCircle()

        return this.innergeometry
    },
    slope: function (p1, p2){return (p2.y - p1.y) / (p2.x - p1.x)},
        
        
    updateCircle: function(){
        
        //The diameter is twice the radius, radius is fraction of the larger circle's radius.
        //Center is the ratio of the larger circle.
        
        var r = this.r
        var n = this.content.length
        
        var t = this.innergeometry.radius*r*2-this.padding
        
        if (n-1){
            $(".tw-circle[data-id="+this.index+"] .tw-marker").animate({"height": t+"px", "width": t+"px", left: this.innergeometry.center.y*r+"px", "margin": -t/2-1+"px"})
        }
    }

}


$(document).ready(function(){
     go = 12
     circles = []
     do {
        circles[go] = new twCircle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].slice(0, go))
        circles[go].rotation = -60
        circles[go].updateSections()
        if (go){ go--}
    } while (go)
})


function resizeSections(){
    t = $("#nsize").val()
    $(".tw-marker").css("height", t+"px")
    $(".tw-marker").css("width", t+"px")
    $(".tw-marker").css("margin", -t/2-1+"px")
}


function update(){
    t = $("#tval").val()
    $("#t").text(t)
    $(".tw-marker").css("left", t+"px")
}