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

var head_image = document.getElementsByClassName("head_image");


var all_cards = document.getElementsByClassName("all_cards");

var my_gifs = document.getElementsByClassName("title");





var gifs = 8;
var filter;

/*calling APIS'S GIFOS */

function trending() {
    const found = fetch('http://api.giphy.com/v1/stickers/trending?api_key=pDbe98unNhbtcnfymALov2ljqZoF2Ztf&limit=' + gifs)
        .then((response) => {
            return response.json();
        }).then((response) => {

            console.log(response);
            for (var i = 0; i < 4; i++) {

                var name_title = response.data[i].title.split("Sticker")[0];

                const cards_above =
                    `<div class="card">
              <div class="head_image">${name_title}<img src="./assets/button3.svg" alt="" class="close"></div>
              <img src="${response.data[i].images.original.url}" alt="..." class="add_image" >
              <button class="see_more">Ver más...</button>
          </div>`

                const html = document.implementation.createHTMLDocument();
                html.body.innerHTML = cards_above;
                all_cards[0].append(html.body.children[0]);

                /*revisar*/
                var see_more_btn = document.querySelectorAll('.see_more');
                var head_image = document.querySelectorAll('.head_image');

                see_more_btn.forEach(function (button, index) {
                    button.addEventListener("click", function () {
                        filter = head_image[index].textContent;
                        filter_search();
                    });


                });
            }

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

    /**hay que revisar  solo acepta enter en buscar, hay  q colocar enter */
    button_search.addEventListener("click", function () {

        var new_search = input_search_gifs.value;
        if (new_search.length == 0 || new_search == null) {
            delete_information();

            const empty =
                `<div class="card_trending" data-id=${new_search.length} >
                <p> YOU MUST WRITE SOMETHING </p>
                 </div>`
            const html = document.implementation.createHTMLDocument();
            html.body.innerHTML = empty;
            tendencias_list.append(html.body.children[0]);

        } else {
            filter = new_search
            show_result_gifs.classList.remove("show-list-gifs");
            filter_search();
        }
    });

    /**esta no hace nada revisar */
    var new_search = input_search_gifs.value;
    filter = new_search;
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
        }).catch(error => {

            return error;
        });
}

function delete_information() {

    var delete_element = document.querySelectorAll(".card_trending");

    for (var i = 0; i < delete_element.length; i++) {
        tendencias_list.removeChild(delete_element[i]);
    }
}

function show_search(e) {

    if (e.target.value.length > 2) {
        show_result_gifs.classList.add("show-list-gifs");
        button_search.style.backgroundColor = "#F7C9F3";
        button_search.style.color = "#110038 ";
        show_result_gifs.addEventListener('focusout', (event) => {


            show_result_gifs.classList.remove("show-list-gifs");
        });

    } else {

        show_result_gifs.classList.remove("show-list-gifs");
        button_search.style.backgroundColor = "";
        button_search.style.color = "";
    }
}

function change_style() {
    estilos.href = './css/style_nigth.css ';
}

function change_white() {

    estilos.href = './css/style.css';
}


function open_page() {

    my_gifs[0].addEventListener("click", function () {

        location.href = 'up_load.html';

    });



}

function trending_search() {


    let common_searchs = document.querySelectorAll('.button_search');


    console.log(common_searchs);


    common_searchs.forEach(function (button, index) {
        button.addEventListener("click", function () {


            filter = common_searchs[index].textContent;
            filter_search();
        });
    });

}

trending();
search();
open_page();
trending_search();