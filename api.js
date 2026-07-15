async function buscarPersonagens() {

    const resposta = await fetch("characters.json");

    const personagens = await resposta.json();

    return personagens;

}