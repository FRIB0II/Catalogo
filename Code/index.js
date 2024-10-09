// Evento para rodar o código assim que todo o conteúdo DOM carregar.
document.addEventListener("DOMContentLoaded", () => {
  // string com o nome do banco local.
  const mybd = "localDB";
  // Container onde serão inseridos os livros.
  const containerCatalogo = document.querySelector("#card-wrapper");
  // Botão para buscar um livro.
  const buscarLivroInput = document.querySelector(".search-input");

  // Botão que vai à página que adiciona um novo livro.
  const adicionarLivro = document.querySelector("#add-book");
  // Ao clicar em adicionar um livro o usuário é redirecionado.
  adicionarLivro.onclick = () => {
    window.location.href = "addBook.html";
  };

  // Função resposável por carregar todos os livros do banco na tela.
  function loadBooks() {
    // Busca todos os livros do banco. Senão retorna um array vazio.
    const bookList = JSON.parse(localStorage.getItem(mybd)) || [];
    // Verifica o valor de bookList.
    console.log("Sou o bookList:", bookList); 
    // Verifica se bookList é um array.
    console.log("É um array?", Array.isArray(bookList));

    // Se for array mas seu tamanho é zero.
    if (Array.isArray(bookList) && bookList.length === 0)
    {
      // Limpa a tela.
      containerCatalogo.innerHTML = '';
      console.log("Nenhum livro encontrado.");
    }
    // Se for um array com valores.
    else if (Array.isArray(bookList))
    {
      // Limpa a tela.
      containerCatalogo.innerHTML = '';
      // Insere todos os livros do banco na tela.
      bookList.forEach((book, index) => {
        console.log(index);
        InsertBooksIntoContainer(book, index);
      });
    } 
    else
    {
      console.error("bookList não é um array.");
    }
  }

  // Função que insere um livro na tela.
  function InsertBooksIntoContainer(book, index) {
    // Cria um card que armazena o container do livro.
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
            <button class="crud-buttons" id="update-book" onclick="OpenModal( ${index})">Atualizar livro</button>
          </div>
          <button class="crud-buttons" id="remove-book" onclick="DeleteBook(${index})">Remover livro</button>
        </div>
      </div>
    `;

    const updateButton = card.querySelector("#update-book");
    updateButton.onclick = () => OpenModal(index);


    // Adiciona o card criado ao final do elemento.
    containerCatalogo.appendChild(card);
  }

  // Chama a função para carregar os elementos na tela.
  loadBooks();

  // Evento que ocorre quando o botão de pesquisa é clicado.
  document.querySelector("#search-book").onclick = () => {
    searchByName();
    console.log("Clicado!");
  };

  // Função busca um livro pelo nome.
  function searchByName() {
    console.log("Clicado2!");
    // Busca todos os livros do banco;
    const bookList = JSON.parse(localStorage.getItem(mybd)) || [];
    // Pega a string de busca e trasnforma em minúscula.
    const buscarLivro = buscarLivroInput.value.toLowerCase();


    if (Array.isArray(bookList) && bookList.length === 0)
    {
      containerCatalogo.innerHTML = '';
      console.log("Nenhum livro encontrado.");
    }
    else if (Array.isArray(bookList))
    {
      containerCatalogo.innerHTML = '';
      bookList.forEach((book, index) => 
      {
        var nomeLivro = book.nome.toLowerCase();
        if (nomeLivro === buscarLivro)
        {
          InsertBooksIntoContainer(book, index);
        }
      });
    } 
    else
    {
      console.error("bookList não é um array.");
    }
  }

  const removeBook = document.querySelector("#remove-book");
  removeBook.onclick = () => { 
      window.location.href = "removeBook.html";
  }

  const modal = document.querySelector(".modal-container");
  const goBack = document.querySelector("#go-back");
  const saveChanges = document.querySelector("#send-data");
  const openModal = document.querySelector("#update-book");

  goBack.addEventListener("click", () => {
    modal.style.display = "none";
  });

});

export function DeleteBook(index)
{ 
  const mybd = "localDB";
  const bookList = JSON.parse(localStorage.getItem(mybd)) || [];
  var mybook = bookList[index];

  console.log(mybook);
  console.log(bookList[index]);
  bookList.splice(index, 1);
  localStorage.setItem(mybd, JSON.stringify(bookList));
}

function OpenModal(index)
  {
    modal.style.display = "flex";

    saveChanges.addEventListener("click", (index) => {
      modal.style.display = "none";
      UpdateBook(index);
    });
  }

  function UpdateBook(index)
  { 
    let mybd = "localdb"; 

    let nameG = document.querySelector("#book-name");
    let descriptionG = document.querySelector("#book-description");
    let pathG = document.querySelector("#book-image");

    var bookList = JSON.parse(localStorage.getItem(mybd));

    var mybook = bookList[index];

    mybook.nome = nameG;
    mybook.descricao = descriptionG;
    mybook.caminho = pathG;

    loadBooks();
  }