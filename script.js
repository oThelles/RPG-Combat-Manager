function salvarAcoes(idPersonagem, checkbox) {

    let acoes = JSON.parse(localStorage.getItem("acoes")) || {};


    if (!acoes[idPersonagem]) {
        acoes[idPersonagem] = {};
    }


    acoes[idPersonagem][checkbox.dataset.action] = checkbox.checked;


    localStorage.setItem("acoes", JSON.stringify(acoes));

}





function carregarAcoes(idPersonagem, checkbox) {

    const acoes = JSON.parse(localStorage.getItem("acoes")) || {};


    if (
        acoes[idPersonagem] &&
        acoes[idPersonagem][checkbox.dataset.action]
    ) {

        checkbox.checked = true;

    }

}





function salvarStatus(idPersonagem, status, valor) {

    let dados = JSON.parse(localStorage.getItem("status")) || {};


    if (!dados[idPersonagem]) {
        dados[idPersonagem] = {};
    }


    dados[idPersonagem][status] = valor;


    localStorage.setItem("status", JSON.stringify(dados));

}





function carregarStatus(idPersonagem, status, valorPadrao) {

    const dados = JSON.parse(localStorage.getItem("status")) || {};


    if (
        dados[idPersonagem] &&
        dados[idPersonagem][status] !== undefined
    ) {

        return dados[idPersonagem][status];

    }


    return valorPadrao;

}





function limitarValor(valor) {

    if (valor < 0) {
        return 0;
    }


    return valor;

}





function criarCard(personagem) {


    const card = document.createElement("div");

    card.classList.add("box-perso");



    const vidaAtual = carregarStatus(
        personagem.id,
        "vida",
        personagem.vidaAtual
    );


    const determinacaoAtual = carregarStatus(
        personagem.id,
        "determinacao",
        personagem.determinacaoAtual
    );



    card.innerHTML = `

        <div class="desc-perso">

            <img src="${personagem.foto}" alt="${personagem.nome}">

            <p class="name-perso">
                ${personagem.nome}
            </p>

        </div>



        <div class="info-perso">

            <p>
                ❤️ PV:

                <input 
                    class="health-value"
                    type="number"
                    min="0"
                    value="${vidaAtual}"
                >

                /${personagem.vidaMax}

            </p>



            <p>
                🧠 PD:

                <input 
                    class="determination-value"
                    type="number"
                    min="0"
                    value="${determinacaoAtual}"
                >

                /${personagem.determinacaoMax}

            </p>

        </div>



        <div class="actions-perso">

            <label>
                <input 
                    type="checkbox"
                    data-action="livre"
                >
                Ação Livre
            </label>


            <label>
                <input 
                    type="checkbox"
                    data-action="movimento"
                >
                Ação Movimento
            </label>


            <label>
                <input 
                    type="checkbox"
                    data-action="padrao"
                >
                Ação Padrão
            </label>


            <label>
                <input 
                    type="checkbox"
                    data-action="reacao"
                >
                Reação
            </label>

        </div>

    `;




    const checkboxes = card.querySelectorAll(
        "input[type='checkbox']"
    );



    checkboxes.forEach(checkbox => {


        carregarAcoes(
            personagem.id,
            checkbox
        );



        checkbox.addEventListener(
            "change",
            () => {

                salvarAcoes(
                    personagem.id,
                    checkbox
                );

            }
        );


    });





    const vidaInput = card.querySelector(
        ".health-value"
    );


    const determinacaoInput = card.querySelector(
        ".determination-value"
    );





    vidaInput.addEventListener(
        "change",
        () => {

            const valor = limitarValor(
                Number(vidaInput.value)
            );


            vidaInput.value = valor;


            salvarStatus(
                personagem.id,
                "vida",
                valor
            );

        }
    );





    determinacaoInput.addEventListener(
        "change",
        () => {

            const valor = limitarValor(
                Number(determinacaoInput.value)
            );


            determinacaoInput.value = valor;


            salvarStatus(
                personagem.id,
                "determinacao",
                valor
            );

        }
    );





    return card;

}







function limparAcoes() {

    localStorage.removeItem("acoes");


    const checkboxes = document.querySelectorAll(
        ".actions-perso input[type='checkbox']"
    );


    checkboxes.forEach(checkbox => {

        checkbox.checked = false;

    });

}







async function carregarPersonagens() {


    try {


        const personagens = await buscarPersonagens();



        const timeBem = document.querySelector(
            "#team-good"
        );


        const timeMal = document.querySelector(
            "#team-bad"
        );



        personagens.forEach(personagem => {


            const card = criarCard(personagem);



            if (personagem.time === "bem") {

                timeBem.appendChild(card);

            }


            else if (personagem.time === "mal") {

                timeMal.appendChild(card);

            }


        });



    }

    catch (erro) {

        console.error(
            "Erro ao carregar personagens:",
            erro
        );

    }


}





document
    .querySelector("#clear-actions")
    .addEventListener(
        "click",
        limparAcoes
    );





carregarPersonagens();