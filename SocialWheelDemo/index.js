
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//
//XXXXXX  XXX     XXX XXX XXX  XX XXX//
//XXXXXX  XXX XXX XXX     XXX X X XXX//
//XXX XX  XXX XXX XXX XXX XXX XX  XXX//
//XXX     XXX     XXX XXX XXX XXX XXX//
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX//
//
//
//-------------------------------
//TWCircle demo.
//
//Makes a ton of them, even one that looks like a clock.
//--------------------------------

// July 1, 2014
// John Drogo


images = ["fb", "tumblr", "pin", "twit"]
colors = ["rgb(60, 90, 150)", "rgb(74, 74, 74)", "rgb(202, 36, 45)", "rgb(97, 170, 219)"]

content = []

for (index=0; index < images.length; index++){
    content[index] = "<img class='badge' src='images/" + images[index] + ".png'></img>"
}

$(document).ready(function(){
     var go = 1
    circles = []
     do {
        circles[go] = new twCircle(content)
        circles[go].rotation = 45
        circles[go].padding = 8
        circles[go].r = 80
        circles[go].animateIn()
        if (go){ go--}
    } while (go)

    $(".tw-marker").off()
    $(".tw-marker").mouseover(function(event){ highlight($(event.target).children().children(".badge")) })
    $(".tw-marker").mouseout(function(event){ unh($(event.target).children().children(".badge")) })
})


function highlight(object){
    var name = digestPath($(object).attr("src"))
    $(object).attr("src", name.path+name.name+"Alt"+name.ext)
    $(".tw-circle").stop().dequeue().animate({"background-color": colors[Number($(object).parent().parent().attr("data-count"))]})
}

//Unhighlight an image.
function unh(object){
    var name = digestPath($(object).attr("src"))
    name.name = name.name.substring(0, name.name.length-3)
    $(object).attr("src", name.path+name.name+name.ext)
}


function digestPath(name){
    //Strips out the actual filename from the path, and slices the extension.
    //Only works for Unix style paths.
    
    //Filename including extension.
    var filename = name.split("/").reverse()[0]
    fileparts = filename.split(".")
    
    var retunvalue = {}
    retunvalue.name = fileparts[0]
    
    //Don't forget the period!
    retunvalue.ext = "." + fileparts[1]
    retunvalue.path = name.substring(0, name.length-retunvalue.name.length-retunvalue.ext.length)
    
    return retunvalue;
}
