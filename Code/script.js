const mybd = "localBD";

function AddBook() {
    // Busca os valores.
    var nomeDoLivro = document.querySelector("#book-name").value;
    var descricao = document.querySelector("#book-description").value;
    var caminho = document.querySelector("#book-image").value;

    var itens = JSON.parse(localStorage.getItem(mybd)) || [];
    var livro = { nomeDoLivro, descricao, caminho };
    
    itens.push(livro); // Adiciona o novo livro ao array de itens.
    localStorage.setItem(mybd, JSON.stringify(itens)); // Atualiza o localStorage com o novo array de itens.
    
    console.log(livro);
    console.log("Boa.");
}
