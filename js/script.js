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

var button_search = document.getElementById("search-btn");



var section = document.getElementById("advice");

var trendings = document.getElementById("trendings");



var gifs = 12;
var filter;

/*calling APIS'S GIFOS */

function trending() {
    const found = fetch('http://api.giphy.com/v1/stickers/trending?api_key=pDbe98unNhbtcnfymALov2ljqZoF2Ztf&limit=' + gifs)
        .then((response) => {
            return response.json();
        }).then((response) => {

            console.log(response);
            for (var i = 0; i < 4; i++) {

                /**prueba */

               var prueba= document.createElement(id);
               console.log(prueba);

              prueba.textContent = "Paragraph changed!";

               
            

                add_images[i].src = response.data[i].images.original.url;
            }
            /*prueba */
            for (var i = 4; i < gifs; i++) {
                const cards =
                    `<div class="card_trending" data-id=${i}>
        <img src="${response.data[i].images.original.url}" class="img-thumbnail thumb m-r" >
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

function search() {

    input_search_gifs.addEventListener('keyup', (e) => {

        var new_search = e.target.value;
        filter = new_search;
        
        /**hay que revisar  solo acepta enter en buscar, hay  q colocar enter */
        if (button_search.addEventListener("click", filter_search) || button_search.addEventListener("keydown", function (e) {
                if (event.key === "enter") {

                    console.log("poraqui");
                    filter_search(new_search);

                }
            }));
    });
}


function filter_search(e) {

    fetch('http://api.giphy.com/v1/gifs/search?api_key=pDbe98unNhbtcnfymALov2ljqZoF2Ztf&limit=8&q=' + filter)
        .then((response) => {
            return response.json();
        }).then((response) => {
            delete_information();
            
            document.getElementsByName("trending_suggestion")[0].placeholder = filter;
                      
            for (var i = 0; i < response.data.length; i++) {
               
                const cards =
                    `<div class="card_trending" data-id=${i}>
        <img src="${response.data[i].images.original.url}" class="img-thumbnail thumb m-r" >
         </div>`
                const html = document.implementation.createHTMLDocument();
                html.body.innerHTML = cards;
                tendencias_list.append(html.body.children[0]);

            }
        });
}

function delete_information() {
   /* section.style.display = "none";*/

    var delete_element = document.querySelectorAll(".card_trending");

    for (var i = 0; i < delete_element.length; i++) {
        tendencias_list.removeChild(delete_element[i]);
    }
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
search();