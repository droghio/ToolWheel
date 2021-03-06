
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//
//XXXXXX  XXX     XXX XXX XXX  XX XXX//
//XXXXXX  XXX XXX XXX     XXX X X XXX//
//XXX XX  XXX XXX XXX XXX XXX XX  XXX//
//XXX     XXX     XXX XXX XXX XXX XXX//
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//
//
//
//-------------------------------
//Handy toolwheel widget factory.
//
//Makes circles in circles, possibly in circles!
//--------------------------------

// July 1, 2014
// John Drogo



function twCircle(content, index, parentselector, size, padding, rotation){
    //Each circle has a unique data-id, and a reference to it's do part of its dom.
    //Make sure all variables are local (have the var tag).
    //There can be multiple elements all calling these functions at different times.
    
    this.content = content;
    this.innergeometry = {}
    this.index = 0
    
    this.rotation = rotation || 0;
    this.padding = padding || 3;
    
    var me = this
    var indecies = []
    $(".tw-circle").each(function(){
        if (Number($(this).attr("data-id")) >= me.index){
            indecies.push(Number($(this).attr("data-id")))
            me.index = Number($(this).attr("data-id"))+1
        }
    })
    
    //If circle does not exist create it.
    if (indecies.indexOf(index) == -1 || index === undefined || index === null){
        this.index = index || this.index;
        parentselector = parentselector || "body"
        $(parentselector).append('<div class="tw-circle" data-id="' + this.index + '"></div>')
    }

    this.r = (size/2 || (Number($(".tw-circle[data-id="+this.index+"]").css("height").split("px")[0])/2))
    this.dom = $(".tw-circle[data-id="+this.index+"]")

}


twCircle.prototype = {
    
    content: null,
    padding: null,
    innergeometry: null,
    index: null,
    
    //Pass this an array of the content you want in the widget.
    addMarkers: function (){

        if (this.padding === "undefined")
            this.padding = 2
            
        var n = this.content.length
        var theta = 2*Math.PI/n
    
        //Clear then add markers.
        $(".tw-circle[data-id="+this.index+"]").empty()
    
        for (i=0; i < n; i++){
            $(".tw-circle[data-id="+this.index+"]").append(
                '<div class="tw-line" style="-webkit-transform: rotate(' + (theta*i) + 'rad); transform: rotate(' + (theta*i) + 'rad);">\
                    <div class="tw-marker" data-count = "' + i + '" style="-webkit-transform: rotate(' + (-theta*i-(this.rotation/180*Math.PI)) + 'rad); transform: rotate(' + (-theta*i-(this.rotation/180*Math.PI)) + 'rad);">\
                        <div class="tw-markerinner">' + this.content[i] + '</div>\
                    </div>\
                </div>'
            );
        }
        
        /*
         Refering to circles and markers.
         
         Use the circle's data-id attribute in a jquery selector, or if you only have one that's easy.
         
         Each marker has a count attribute. If you haven't applied a rotation the 0th marker is
         directly right of the center, and increases clockwise around the circle.
        */
        
        //Adjust our marker's size.
        var r = this.r * .8
        $(".tw-circle[data-id="+this.index+"] .tw-marker").css({"height": r*2, width: r*2, margin: -r, left: "0px"})

        //TODO: Fix this.
        //It should auto update the sizes on size change.
        /*var me = this
        $(".tw-circle[data-id="+this.index+"]").resize(function(){
            me.r = (Number($(".tw-circle[data-id="+me.index+"]").css("height").split("px")[0])/2)
            me.updateSections()
        })*/

    },
        
        
    //Returns the center offset and the radius for the circles.
    calcMarkerGeo: function (){
        
        var n = this.content.length
        
        //I'm using half of theta since all my forumlas use theta/2.
        var theta = Math.round(Math.PI/n*1000)/1000;
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
        var o = tan(Math.atan(this.slope(v, {x: 0, y: 0}))/2)
        
        //Closure has access to container's variables.
        var yBi = function(x){ return o*(x-v.x) + v.y;  }
        
        var center = {x:0, y:yBi(0)}
        var radius = 1-center.y
        this.innergeometry = {center: center, radius: radius}

        return this.innergeometry
    },
    slope: function (p1, p2){return (p2.y - p1.y) / (p2.x - p1.x)},
        
    
    updateDOM: function(){
        $(this.dom).css({"height": this.r*2+"px", "width": this.r*2+"px"})
        
        //Firefox animation issue on showing after hide. This should be instant but it isn't.
        //$(this.dom).css({"-webkit-transform": $(this.dom).css("-webkit-transform")+" rotate(" + this.rotation + "deg)", "transform": $(this.dom).css("transform")+" rotate(" + this.rotation + "deg)"})
    },
    
    
    //Animates the markers into position.
    animateIntoPosition: function(){
        
        //The diameter is twice the radius, the variable radius is fraction of the larger circle's radius.
        //Center is the ratio of the larger circle.
        
        var r = this.r
        var n = this.content.length
        
        var t = this.innergeometry.radius*r*2-this.padding
        
        if (n-1){
            $(".tw-circle[data-id="+this.index+"] .tw-marker").stop().dequeue().animate({"height": t+"px", "width": t+"px", left: this.innergeometry.center.y*r+"px", "margin": -t/2-1+"px"})
        }
    },
    
    
    animateIn: function(callback){
        var me = this
        
        $(me.dom).css({transition: "transform 1s", "-webkit-transition": "-webkit-transform 1s"})
        me.updateDOM() //CSS updates don't seem to take hold for a couple of miliseconds.

        me.calcMarkerGeo();
        me.addMarkers()
        
        //Chrome had an odd animation glitch. Randomly the callback for the fade in would not call. To solve this I did three things.
        // 1. Set the circle to display none so the fadein animation was called.
        // 2. Moved from the file:// protocol to a simple server.
        // 3. Used the callback as below, either way works.
        
        $(me.dom).fadeIn(10).promise().done(function(){ //Those CSS delays are part of the reason for the delay here.
            $(me.dom).css({transform: "rotate(" + me.rotation + "deg)" + " scale(1)", "-webkit-transform": "rotate(" + me.rotation + "deg)" + " scale(1)"})
            $(".tw-circle[data-id="+me.index+"] .tw-marker").fadeIn(1000, function(){  me.animateIntoPosition(); if (callback){ callback(); }  })
        })

    },
    
    
    animateOut: function(callback){
        var r = this.r * .8
        var n = this.content.length
        
        var me = this
        
        //This comes first so it doesn't cancel the other animations.
        if (n-1){
            $(".tw-circle[data-id="+this.index+"] .tw-marker").stop().dequeue().animate({height: r+"px", "width": r+"px", left: 0+"px", "margin": -r/2-1+"px"})
        }
        
        $(me.dom).css({transform: "rotate(" + 0 + "deg)" + " scale(0)", "-webkit-transform": "rotate(" + 0 + "deg)" + " scale(0)"})
        $(".tw-circle[data-id="+me.index+"] .tw-marker").fadeOut(1000, function(){  $(me.dom).css("display", "none"); if (callback){ callback(); }; $(me.dom).css({transition: "transform 0s", "-webkit-transition": "-webkit-transform 0s"})})

    }

}