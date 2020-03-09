
document.getElementById("arrow_dropdown").onclick=show_hide;
document.getElementById("input_search_gifs").onkeypress=show_search;
document.getElementById("sailor_night").onclick=change_style;
document.getElementById("sailor_day").onclick=change_white;

var click= document.getElementById("dropdown-content");
var show_result_gifs=document.getElementById("show_result_gifs");
var estilos=document.getElementById('estilos');



function show_hide(){

    if(click.style.display==="none" ){

        click.style.display="block";
    }else{

        click.style.display="none";
    }
   
}

function show_search(){

    if(show_result_gifs.style.display==="none"){

        show_result_gifs.style.display="block";
    }else{

        show_result_gifs.style.display="none";
    }

}



function change_style(){

estilos.href='./css/style_nigth.css ';

}

function change_white(){


    estilos.href='./css/style.css'

}



