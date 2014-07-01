function update(){
    t = $("#tval").val()
    $("#t").text(t)
    $(".marker").css("left", t+"px")
}

function updateSections(){
    n = $("#nval").val()
    
    $("#circle").empty()
    
    theta = 2*Math.PI/n
    
    for (i=0; i < n; i++){
        $("#circle").append(
            '<div class="line" style="-webkit-transform: rotate(' + theta*i + 'rad);">\
                    <div class="marker" style="-webkit-transform: rotate(' + -theta*i + 'rad);">\
                            <div class="markerinner"></div>\
                    </div>\
            </div>'
        );
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


function findCenter(n){
    theta = 2*Math.PI/n;
}

function slope(p1, p2){return (p2[1] - p1[1]) / (p2[0] - p1[0])}