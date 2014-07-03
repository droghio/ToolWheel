
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


$(document).ready(function(){
     go = 12
     circles = []
     do {
        circles[go] = new twCircle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].slice(0, go))
        circles[go].rotation = -60
        circles[go].animateIn()
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