/* eslint-disable no-magic-numbers */
const btnBox = document.querySelector('.next_card_box');
const btnNextCard = document.querySelector('.btn');
const conteiner = document.querySelector('.wrapper');
const zero = 0;
let index = zero, dataNext, person;

// Делаем запрос и выводим первую карточку \\
fetch('https://rickandmortyapi.com/api/character')
    .then(respon => respon.json())
    .then(data => {

        person = data.results;
        dataNext = data.info.next;
        const {id} = person[index];
        const {name} = person[index];
        const {gender} = person[index];
        const origin = person[index].origin.name;
        const {image} = person[index];
        const locationInfo = person[index].location.name;
        const {species} = person[index];
        const {status} = person[index];
        let created = person[index].created.slice(zero, -14);
        created = moment(`${created}`).fromNow(); // eslint-disable-line

        conteiner.innerHTML +=
            `
            <div class="container_card">
                <div class="card_header">

                    <div class="card_header_img">
                        <img src='${image}'>
                    </div>

                    <div class="card_header_title">
                        <h2>${name}</h2>
                        <p>id: ${id} - created ${created}</p>
                    </div>

                </div>

                <div class="card_info">
                    <div class="info_status">
                        <span>STATUS</span>
                        <p>${status}</p>
                    </div>
                    <div class="info_status">
                        <span>SPECIES</span>
                        <p>${species}</p>
                    </div>
                    <div class="info_status">
                        <span>GENDER</span>
                        <p>${gender}</p>
                    </div>
                    <div class="info_status">
                        <span>ORIGIN</span>
                        <p>${origin}</p>
                    </div>
                    <div class="info_status">
                        <span>LAST LOCATION</span>
                        <p>${locationInfo}</p>
                    </div>
                </div>

            </div>
            `;
        index++;
    });

function getNewPersone(persone) {

    for (index; index < persone.length; index++) {

        let created = persone[index].created.slice(zero, -14);

        created = moment(`${created}`).fromNow(); // eslint-disable-line

        conteiner.innerHTML +=
            `
            <div class="container_card">
                <div class="card_header">

                    <div class="card_header_img">
                        <img src='${persone[index].image}'>
                    </div>

                    <div class="card_header_title">
                        <h2>${persone[index].name}</h2>
                        <p>id: ${persone[index].id} - created ${created}</p>
                    </div>

                </div>

                <div class="card_info">
                    <div class="info_status">
                        <span>STATUS</span>
                        <p>${persone[index].status}</p>
                    </div>
                    <div class="info_status">
                        <span>SPECIES</span>
                        <p>${persone[index].species}</p>
                    </div>
                    <div class="info_status">
                        <span>GENDER</span>
                        <p>${persone[index].gender}</p>
                    </div>
                    <div class="info_status">
                        <span>ORIGIN</span>
                        <p>${persone[index].origin.name}</p>
                    </div>
                    <div class="info_status">
                        <span>LAST LOCATION</span>
                        <p>${persone[index].location.name}</p>
                    </div>
                </div>

            </div>
            `;
    }
}

function getNextPage(url) {

    fetch(`${url}`)
        .then(respon => respon.json())
        .then(data => {
            person = data.results;
            dataNext = data.info.next;
        });

}

btnNextCard.addEventListener('click', () => {
    getNewPersone(person);
    index = zero;
    if (dataNext !== '') {
        getNextPage(dataNext);
    }
    else {
        btnBox.style.display = 'none';
    }
});
