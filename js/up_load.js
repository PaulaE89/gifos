document.getElementById("arrow_dropdown").onclick = show_hide;



var click = document.getElementById("dropdown-content");
var create_image=document.getElementById("button_create");


var section_create_video=document.getElementById("create_video");
var menu_buttons=document.getElementById("menu_buttons");
var arrow_back=document.getElementById("arrow_back");

var start_record=document.getElementById("start");

var delete_main= document.getElementsByClassName("main_create");

var delete_btn_decide=document.getElementsByClassName("button_decide");

function show_hide() {

    if (click.style.display === "none") {

        click.style.display = "block";
    } else {

        click.style.display = "none";
    }
}


function create_my_images(){


create_image.addEventListener("click",function(){
    console.log("i think work");
    section_create_video.style.display="block";
    menu_buttons.style.display="none";
    arrow_back.style.display="block";



})

}



function recording(){



     delete_main.style.display="none";
 delete_btn_decide.style.display="none";


    
}

create_my_images();

