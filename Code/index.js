document.addEventListener("DOMContentLoaded", () => {
  const mybd = "localDB";
  const containerCatalogo = document.querySelector("#card-wrapper");
  const adicionarLivro = document.querySelector("#add-book");

  adicionarLivro.onclick = () => {
    window.location.href = "addBook.html";
  };

  function loadBooks() {
    const bookList = JSON.parse(localStorage.getItem(mybd)) || [];
    console.log("Sou o bookList:", bookList); // Verifica o valor de bookList
    console.log("É um array?", Array.isArray(bookList)); // Verifica se bookList é um array
    
    if (Array.isArray(bookList) && bookList.length === 0) {
      containerCatalogo.innerHTML = '';
      console.log("Nenhum livro encontrado.");
    } else if (Array.isArray(bookList)) {
      containerCatalogo.innerHTML = '';
      bookList.forEach((book, index) => {
        InsertBooksIntoContainer(book, index);
      });
    } else {
      console.error("bookList não é um array.");
    }
  }

  function InsertBooksIntoContainer(book, index) {
    const card = document.createElement("div");
    console.log(book.caminho);
    card.innerHTML = `
      <div class="card-item">
        <img src="${book.caminho}" alt="${book.nome}" >
        <div class="card-content">
          <h3>${book.nome}</h3>
          <p>${book.descricao}</p>
          <div class="buttons">
            <button class="crud-buttons" id="get-book">Emprestar livro.</button>
            <button class="crud-buttons" id="update-book" onclick="UpdateBook(${index})">Atualizar livro</button>
          </div>
          <button class="crud-buttons" id="remove-book" onclick="DeleteBook(${index})">Remover livro</button>
        </div>
      </div>
    `;
    containerCatalogo.appendChild(card);
  }

  loadBooks();
});
