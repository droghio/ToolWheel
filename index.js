function update(){
    t = $("#tval").val()
    $("#t").text(t)
    $(".marker").css("left", t+"px")
}

function updateSections(){
    n = $("#nval").val()
    
    $("#circle").empty()
    
    theta = 360/n
    
    for (i=0; i < n; i++){
        $("#circle").append('<div class="line" style="-webkit-transform: rotate(' + theta*i + 'deg);"><div class="marker" style="-webkit-transform: rotate(' + -theta*i + 'deg);"></div></div>');
    }
    
    //Update newly created markers.
    update();
    resizeSections();
    
}


function resizeSections(){
    t = $("#nsize").val()
    $(".marker").css("height", t+"px")
    $(".marker").css("width", t+"px")
    $(".marker").css("margin", -t/2-1+"px")
}