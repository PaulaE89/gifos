document.getElementById("arrow_dropdown").onclick = show_hide;

var click = document.getElementById("dropdown-content");
var create_image = document.getElementById("button_create");
var section_create_video = document.getElementById("create_video");
var menu_buttons = document.getElementById("menu_buttons");
var arrow_back = document.getElementById("arrow_back");
var start_record = document.getElementById("start");
var delete_main = document.getElementsByClassName("main_create");
var delete_btn_decide = document.getElementsByClassName("button_decide");
var delete_title = document.getElementsByClassName("title_create");
var my_gifos = document.getElementById("my_gifos");

let delete_menu_btns = document.getElementsByClassName("buttons_take_pic");

var video_exterior;

var capture_pic;
var title_video;

var hour;

var minutes;
var seconds;
var miliseconds;
var stopwatch;


var pic_done;
var timekeeper;

var url;


var play;

var square;



var repeat;

var up_load_gif;


function show_hide() {

    if (click.style.display === "none") {

        click.style.display = "block";
    } else {

        click.style.display = "none";
    }
}


function create_my_images() {
    create_image.addEventListener("click", function () {

        section_create_video.style.display = "block";
        menu_buttons.style.display = "none";
        arrow_back.style.display = "block";
    })

}



function recording() {


    let modal = document.getElementById("modal");

    start_record.addEventListener("click", function () {

        delete_main[0].style.display = "none";
        delete_btn_decide[0].style.display = "none";
        delete_title[0].style.display = "none";
        my_gifos.style.display = "none";
        modal.style.height = "548px";
        modal.style.width = "860px";

        const prueba =

            `<div class="title_video">Un chequeo Antes de Empezar<img src="./assets/button3.svg" alt=""
                        class="close_video"></div>
                <video id="video" autoplay> Video Stream not availabre.</video>
                <div class="buttons_take_pic">
                    <button class="camera_pic"><img  class="camera"src="./assets/camera.svg" alt=""></button>
                    <button class="take_pic"  id="take_pic">Capturar</button>
                </div>`

        /* const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = prueba;
      
        modal.append(html.body);*/
        modal.innerHTML = prueba;
        var video = document.querySelector('#video');
        var capture = document.getElementById('take_pic');



        capture_pic = capture;

        video_exterior = video;


        getStreamAndRecord();

        /**este hay que cmbairlo deonde debe ir  
        delete_elements();*/

    })
}

function getStreamAndRecord() {

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {
                ideal: 430
            },
            width: {
                ideal: 832
            }

        }

    }).then(function (stream) {

       

        video_exterior.srcObject = stream;
        video_exterior.play();

        delete_elements();

        /*validar si va aqui*/ 
      /*  start_recording();*/

    }).catch(function (error) {
        console.log(error.message);
    })
}


function delete_elements() {

    capture_pic.addEventListener('click', function () {

        let delete_btn_camara = document.getElementsByClassName("camera_pic");
        let delete_take_pic = document.getElementsByClassName("take_pic");

 /**revisar si esto vale la pena si no dejarlo como era antes */
        
        delete_btn_camara[0].style.display="none";
        delete_take_pic[0].style.display="none";
/*
        delete_menu_btns[0].removeChild(delete_btn_camara[0]);
        delete_menu_btns[0].removeChild(delete_take_pic[0]);*/

         title_video = document.querySelectorAll('.title_video');



         var img= document.createElement("img");
         img.src='./assets/button3.svg'
     
         img.setAttribute('class','close_video');
      
     
         title_video[0].textContent = "Capturado Tu Guifo";
         title_video[0].appendChild(img);



       


        const new_menu_recording =

            `  <div class="timekeeper" id="timekeeper">
                <p class="timer"><span id="hour">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>:<span id="miliseconds">00</span></p>
            </div>
            <button class="recording"><img class="recording_image" src="./assets/recording_dark.svg"
                    alt=""></button>
            <button class="pic_done" id="pic_done">Listo</button>`

        delete_menu_btns[0].innerHTML = new_menu_recording;


        hour = document.getElementById("hour");

        minutes = document.getElementById("minutes");

        seconds = document.getElementById("seconds");

        miliseconds = document.getElementById("miliseconds");

        pic_done = document.getElementById("pic_done");
        timekeeper = document.getElementById("timekeeper");

        start_stopwatch();
      start_recording();

    })
}


function start_recording() {

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then(async function (stream) {

        /* video_exterior.src=URL.createObjectURL(stream);
         video_exterior.muted=true;*/

        let recorder = RecordRTC(stream, {

            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
        });
        recorder.startRecording();

        /* const sleep = m => new Promise(r => setTimeout(r, m));
         await sleep(5000);*/
        pic_done.addEventListener("click", function () {

            clearInterval(stopwatch);

            recorder.stopRecording(function () {
                let blob = recorder.getBlob();
                url = URL.createObjectURL(blob);

                video_exterior.src =url;
                video_exterior.muted = true;

                console.log(blob);

               /* pruebaaa= invokeSaveAsDialog(blob);*/
            


            })



            


            add_timer();

        })
    }).catch(function (error) {
        console.log(error.message);
    })
}


function start_stopwatch() {


    contador_h = 0;
    contador_m = 0;
    contador_s = 0;
    contador_ml = 0;


    stopwatch = setInterval(function () {

        if (contador_ml == 60) {

            console.log(contador_ml);


            contador_ml = 0;
            contador_s++;
            seconds.innerHTML = contador_s;

            if (contador_s == 60)

            {

                console.log(contador_s) ;
                contador_s = 0;
                contador_m++;
                minutes.innerHTML = contador_m;

                if (contador_m == 60) {



                    console.log(contador_m) ;
                    contador_m = 0;
                    contador_h++;
                    hour.innerHTML = contador_h;
                }
            }
        }


        miliseconds.innerHTML = contador_ml;
        contador_ml++;


    }, 10)



 

   /* stop();*/

}


function add_timer() {

    let delete_recording = document.getElementsByClassName("recording");

    let pic_done = document.getElementsByClassName("pic_done");
    /* let timekeeper=document.getElementsByClassName("timekeeper");*/

    delete_menu_btns[0].removeChild(delete_recording[0]);
    delete_menu_btns[0].removeChild(pic_done[0]);


    title_video = document.querySelectorAll('.title_video');

    timekeeper.style.marginRight = "0";
    timekeeper.style.marginLeft = "11px";



    var img= document.createElement("img");
    img.src='./assets/button3.svg'

    img.setAttribute('class','close_video');
 

    title_video[0].textContent = "Vista Previa";
    title_video[0].appendChild(img);


    video_exterior.src =url;


    console.log(delete_menu_btns[0]);
    


    const counter_time =

        ` 
    <button class="play" id="play"><img class="play_image" src="./assets/forward.svg" alt=""></button>
    <div class="counter_time">
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
        <div class=square></div>
       
        
    </div>
    <button class="repeat" id="repeat">Repetir Captura</button>
    <button class="up_load_gif" id="up_load_gif">Subir Guifos</button> `

    delete_menu_btns[0].insertAdjacentHTML('beforeend', counter_time);
    console.log(url);

 square=document.getElementsByClassName("square");

     play=document.getElementById("play");

     repeat=document.getElementById("repeat");
     up_load_gif=document.getElementById("up_load_gif");


     play.addEventListener("click", play_guifo);

     up_load_gif.addEventListener("click", up_load);








}




function up_load(){



    video_exterior.style.display="none";

    delete_menu_btns[0].style.display="none";
    
     var img= document.createElement("img");
     img.src='./assets/button3.svg'

     img.setAttribute('class','close_video');
     title_video[0].textContent = "Subiendo Guifo";

     title_video[0].appendChild(img);

 

     const up_gifo=
    ` 

    <div id="video_no" >

    <div class="container_information">    

        <img  class="world"src="./assets/globe_img.png" alt="">
        
        <p class="first_text" >Estamos subiendo tu guifo..</p>


        <div class="counter_time_2">
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
            <div class=square_1></div>
           
            
        </div>

        <p class="time_left">Tiempo restante:38 años algunos minutos</p>


    </div>

</div>
<div class="buttons_take_pic">


    <button class="delete_gif">Cancelar</button>
</div>
</div> ` 


modal.insertAdjacentHTML('beforeend',  up_gifo);






}







function play_guifo(){


    console.log(pruebaaa);



    console.log(minutes.textContent);
    console.log(seconds.textContent);
     console.log(miliseconds.textContent);
     console.log(hour.textContent);



    console.log("wre are in play");


    var int_hour=parseInt(hour.textContent);
    var int_minutes=parseInt(minutes.textContent);
    var int_seconds=parseInt(seconds.textContent);
    var int_mili=parseInt(miliseconds.textContent);


    console.log(int_hour);
    console.log(int_minutes);
    console.log(int_seconds);
     console.log(int_mili);
  


    var total_tiempo=((int_minutes))  ;

        console.log(total_tiempo);
    for (var i = 0; i < total_tiempo; i++){


        square[i].style.backgroungcolor="red";






    }




}

/*
function stop() {

    pic_done.addEventListener("click", function () {
        clearInterval(stopwatch);

        console.log(stopwatch);

        add_timer();



    })
}
*/



create_my_images();

recording();