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

var video_exterior;

var capture_pic;


var hour; 

var minutes;
var seconds ;
var miliseconds;
var stopwatch;


var pic_done;


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

        /**este hay que cmbairlo deonde debe ir  */
       delete_elements();

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

        console.log(stream);

        video_exterior.srcObject = stream;
        video_exterior.play();

    }).catch(function (error) {
        console.log(error.message);
    })
}


function delete_elements() {

    capture_pic.addEventListener('click', function () {

        let delete_btn_camara = document.getElementsByClassName("camera_pic");
        let delete_take_pic = document.getElementsByClassName("take_pic");
        let delete_menu_btns = document.getElementsByClassName("buttons_take_pic");
        delete_menu_btns[0].removeChild(delete_btn_camara[0]);
        delete_menu_btns[0].removeChild(delete_take_pic[0]);

        var title_video = document.querySelectorAll('.title_video');

        title_video[0].textContent = "Capturado Tu Guifo";


        const new_menu_recording =

            `  <div class="timekeeper">
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

         pic_done=document.getElementById("pic_done");
       
        start_stopwatch();
        start_recording();






})
}








 function start_recording(){




    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then(async function(stream) {



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

        stop();

    
        recorder.stopRecording(function() {
            let blob = recorder.getBlob();
            var url=URL.createObjectURL(blob);

            video_exterior.src=url;
            video_exterior.muted=true;
            invokeSaveAsDialog(blob);
        }).catch(function (error) {
            console.log(error.message);
        })
    });







 }





function start_stopwatch(){

  
    
    contador_h = 0;
    contador_m = 0;
    contador_s = 0;
    contador_ml = 0;

       
    stopwatch= setInterval(function () {


        


            if (contador_ml == 60) {
                contador_ml = 0;
                contador_s++;
                seconds.innerHTML = contador_s;

                if (contador_s == 60)

                {
                    contador_s = 0;
                    contador_m++;
                    minutes.innerHTML = contador_m;

                    if (contador_m == 60) {

                        contador_m = 0;
                        contador_h++;
                        hour.innerHTML = contador_h;
                    }
                }
            }

         
            miliseconds.innerHTML = contador_ml;
            contador_ml++;

    

        }, 10)


       
}



function stop(){

    pic_done.addEventListener("click", function(){

        clearInterval(stopwatch);


     console.log(video_exterior);


    })




}



create_my_images();

recording();