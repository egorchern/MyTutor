$(function(){
    scrl();
    
    $('#wrapper').bind("scroll", function(e){
        scrl();
    });
    load_slideshow("my-slide-show");

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
let slide_show_index = 0;
let image_sources = ["Assets/feedback_1.PNG"];
function load_slideshow(id){
    $(`#${id} > .slide-show-image-container > img`).attr("src", image_sources[slide_show_index]);
    for (let i = 0; i < image_sources.length;i++){
        $(`#${id} > .slide-show-dots-container`).append(`
        <div class='slide-show-dot' data-index='${i}'>
        </div>
        `)
    }
    $(`#${id} > .slide-show-dots-container > .slide-show-dot:first-child`).addClass("slide-show-dot-active");
    $(`#${id} .right-slide-btn`).bind("click", function(e){
        if(slide_show_index < image_sources.length - 1){
            slide_show_index += 1;
            $(`#${id} > .slide-show-image-container > img`).attr("src", image_sources[slide_show_index]);
            $(`#${id} > .slide-show-dots-container > .slide-show-dot`).removeClass("slide-show-dot-active");
            $(`#${id} > .slide-show-dots-container > .slide-show-dot:nth-child(${slide_show_index + 1})`).addClass("slide-show-dot-active");
        }
    });
    $(`#${id} .left-slide-btn`).bind("click", function(e){
        if(slide_show_index > 0){
            slide_show_index -= 1;
            $(`#${id} > .slide-show-image-container > img`).attr("src", image_sources[slide_show_index]);
            $(`#${id} > .slide-show-dots-container > .slide-show-dot`).removeClass("slide-show-dot-active");
            $(`#${id} > .slide-show-dots-container > .slide-show-dot:nth-child(${slide_show_index + 1})`).addClass("slide-show-dot-active");
        }
    });
    $(`#${id} > .slide-show-dots-container > .slide-show-dot`).bind("click", function(e){
        let index = Number(this.dataset.index);
        slide_show_index = index;
        $(`#${id} > .slide-show-image-container > img`).attr("src", image_sources[slide_show_index]);
        $(`#${id} > .slide-show-dots-container > .slide-show-dot`).removeClass("slide-show-dot-active");
        $(`#${id} > .slide-show-dots-container > .slide-show-dot:nth-child(${slide_show_index + 1})`).addClass("slide-show-dot-active");
    })

}