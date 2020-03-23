document.getElementById("arrow_dropdown").onclick = show_hide;
document.getElementById("input_search_gifs").onkeyup = show_search;
document.getElementById("sailor_night").onclick = change_style;
document.getElementById("sailor_day").onclick = change_white;

var input_search_gifs = document.getElementById("input_search_gifs");
var click = document.getElementById("dropdown-content");
var show_result_gifs = document.getElementById("show_result_gifs");
var estilos = document.getElementById('estilos');
var tendencias_list = document.getElementById("tendencias");
var add_images = document.getElementsByClassName("add_image");

var button_search=document.getElementById("search-btn");
var gifs = 12;
var tendencias_count = 12;

/*calling APIS'S GIFOS */

function trending() {
    const found = fetch('http://api.giphy.com/v1/stickers/trending?api_key=pDbe98unNhbtcnfymALov2ljqZoF2Ztf&limit=' + gifs)
        .then((response) => {
            return response.json();
        }).then((response) => {

            console.log(response);
            for (var i = 0; i < 4; i++) {

                add_images[i].src = response.data[i].images.downsized_large.url;
            }
            /*prueba */
            for (var i = 4; i < gifs; i++) {
                const cards =
                    `<div class="card" data-id=${i}>
        <img src="${response.data[i].images.downsized_large.url}" class="img-thumbnail thumb m-r" >
         </div>`
                const html = document.implementation.createHTMLDocument();
                html.body.innerHTML = cards;
                tendencias_list.append(html.body.children[0]);

            }

        }).catch(error => {

            return error;
        });
}


/**Other function */

function show_hide() {

    if (click.style.display === "none") {

        click.style.display = "block";
    } else {

        click.style.display = "none";
    }

}


function prueba() {

    input_search_gifs.addEventListener('keyup', (e) => {

        var new_search = e.target.value;

        console.log(new_search);


        button_search.addEventListener("click", (e) => {

        fetch('http://api.giphy.com/v1/gifs/search?api_key=pDbe98unNhbtcnfymALov2ljqZoF2Ztf&limit=2&q=' + new_search)
        .then((respuesta) => {

            console.log(respuesta);
            return respuesta.json();

        }).then((respuesta) => {


            console.log("exito"+ " " + respuesta);

           
        });

    });
});

    


}


function show_search(e) {

    if (e.target.value.length > 2) {
        show_result_gifs.classList.add("show-list-gifs");
        input_search_gifs.addEventListener('focusout', (event) => {

            show_result_gifs.classList.remove("show-list-gifs");
        });

    } else {

        show_result_gifs.classList.remove("show-list-gifs");
    }
}

function change_style() {
    estilos.href = './css/style_nigth.css ';
}

function change_white() {

    estilos.href = './css/style.css';
}


trending();
prueba();