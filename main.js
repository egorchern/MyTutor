$(function(){
    scrl();
    
    $('#wrapper').bind("scroll", function(e){
        scrl();
    });
})


function scrl(){
    let scroll_tracked = $('.scroll_tracked');
    let range_min = $('#wrapper').scrollTop();
    let range_max = window.outerHeight + range_min;
    
    for(let i = 0; i < scroll_tracked.length; i++){
        let top = scroll_tracked[i].offsetTop;
        console.log(range_min, range_max, top)
        if (top >= range_min && top <= range_max - window.outerHeight * 0.4){
            
            $(scroll_tracked[i]).removeClass("scroll_tracked");
            $(scroll_tracked[i]).css("animation-play-state", "running");
        }
        
    }
}