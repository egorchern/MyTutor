
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
        
        if (top >= range_min && top <= range_max - window.outerHeight * 0.35){
            
            $(scroll_tracked[i]).removeClass("scroll_tracked");
            setTimeout(function(){
                $(scroll_tracked[i]).css("animation-play-state", "running");
            }, 60);
            
        }
        
    }
}
let slide_show_index = 0;
let image_sources = ["Assets/feedback_1.webp", "Assets/feedback_2.webp", "Assets/feedback_3.webp"];
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

function handle_submit_form(){
    let name = $('#name').val();
    let email = $('#email').val()
    let interested_in = $('#interested_in').val();
    let comments = $('#comments').val();
    let error_text = "";
    if (name === ""){
        error_text += "\nPlease fill in the Name field";
    }
    if (email === ""){
        error_text += "\nPlease fill in the Email field";
    }
    if (interested_in === ""){
        error_text += "\nPlease selected the subject you are interested in";
    }
    if (error_text != ""){
        alert(error_text);
    }
    else{
        
        send_email(name, email, interested_in, comments);
    }
    
}
function send_email(name, email, interested_in, comments){
    
    
    Email.send({
        Host: "smtp.gmail.com", 
        Username: "egor.chernyshev.tutoring@gmail.com", 
        Password: "Crab1Rook2", 
        To: 'egor.chernyshev.tutoring@gmail.com', 
        From: "egor.chernyshev.tutoring@gmail.com", 
        Subject: "Tutoring interst", 
        Body: `
        ${name}  |
        \n${email}  |
        \n${interested_in}  |
        \n${comments}  |
        `
    });
    
}