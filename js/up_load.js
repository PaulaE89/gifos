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
            console.log(modal);
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
                    <button class="camera_pic"><img src="./assets/camera.svg" alt=""></button>
                    <button class="take_pic">Capturar</button>
                </div>`

            const html = document.implementation.createHTMLDocument();
            html.body.innerHTML = prueba;
            console.log(html.body);
            modal.append(html.body);
            var video = document.querySelector('#video');

            console.log(video);


             video_exterior = video;
             getStreamAndRecord();
            
        })
    }


    function getStreamAndRecord() {

        navigator.mediaDevices.getUserMedia({

                audio: false,

                video: {

                    height: {
                        ideal: 330
                    },
                    width: {
                        ideal: 832
                    }

                }

            })

            .then(function (stream) {

                console.log(stream);

                video_exterior.srcObject = stream;

                video_exterior.play();

            }).catch(console.error)

        console.log("problemas con tu resolucion de camara");

    }





create_my_images();

recording();