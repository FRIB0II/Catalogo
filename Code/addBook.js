document.addEventListener("DOMContentLoaded", () => 
{
    // Botão que adiciona um novo livro.
    const buttonSend = document.querySelector("#send-data");

    // Quando ele for clicado ele realiza a operação de adição.
    buttonSend.onclick = () => {
        var mybd = "localDB";
        var name = document.querySelector("#book-name").value;
        var description = document.querySelector("#book-description").value;
        var path = document.querySelector("#book-image").value;
    
        var book = { 
            nome: name,
            descricao: description,
            caminho: path 
        };
        
        var bookList = JSON.parse(localStorage.getItem(mybd)) || [];
        bookList.push(book); // Adiciona o novo livro ao array de itens.
        localStorage.setItem(mybd, JSON.stringify(bookList)); // Atualiza o localStorage com o novo array de itens.
    
        console.log(book);
        console.log("Livro adicionado com sucesso.");

        window.location.href = "index.html";
    };
});
