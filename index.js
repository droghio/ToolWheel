

//Pass this an array of the content you want in the widget.
function updateSections(content, padding){
    
    if (!padding)
        padding = 2

    n = content.length
    theta = 2*Math.PI/n
    
    $("#tw-circle").empty()
    
    for (i=0; i < n; i++){
        $("#tw-circle").append(
            '<div class="tw-line" style="-webkit-transform: rotate(' + theta*i + 'rad);">\
                    <div class="tw-marker" style="-webkit-transform: rotate(' + -theta*i + 'rad);">\
                            <div class="tw-markerinner">' + content[i] + '</div>\
                    </div>\
            </div>'
        );
    }
    
    //Update newly created markers.
    //update();
    //resizeSections();
    //findCenter(n)

    r = Number($("#tw-circle").css("height").split("px")[0])/2
    r = r*.8
    $(".tw-marker").css({"height": r*2, width: r*2, margin: -r, left: "0px"})
    
    findCenter(n, padding)
}


function findCenter(n, padding){
    
    //I'm using half of theta since all my forumlas use theta/2.
    theta = Math.PI/n;
    r = Number($("#tw-circle").css("height").split("px")[0])/2
    
    v = {}
    m = {}
    
    cos = Math.cos;
    sin = Math.sin;
    tan = Math.tan;
    
    //Radius assumed to be one, all relative scaling.
    a = 1/cos(theta)
    
    v.x = a * sin(-theta)
    v.y = a * cos(theta)  //No negatation needed for the angle, cosine is positive in quads 1 and 4.
    
    m.x = .5*a * cos(theta)
    m.y = .5*a * sin(theta)
    
    //slope(v, m) //That's the centroid, not the incenter, oops.
    o = tan(Math.atan(slope(v, {x: 0, y: 0}))/2)
    
    //Closure has access to container's variables.
    yBi = function(x){ return o*(x-v.x) + v.y;  }
    
    center = {x:0, y:yBi(0)}
    radius = 1-center.y
    
    //The diameter is twice the radius, radius is fraction of the larger circle's radius.
    //Center is the ratio of the larger circle.
    
    t = radius*r*2-padding
    $(".tw-marker").animate({"height": t+"px", "width": t+"px", left: center.y*r+"px", "margin": -t/2-1+"px"})
    
}

function slope(p1, p2){return (p2.y - p1.y) / (p2.x - p1.x)}



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