import { DeleteBook } from "./index.js";

document.addEventListener("DOMContentLoaded", () => 
{   
    // Botão que remove um livro.
    const removeBook = document.querySelector("#confirm-button");
    const keepBook = document.querySelector("#denied-button");
    
    keepBook.onclick = () =>
    {   
        window.location.href = "index.html#card-wrapper"
    }

    removeBook.onclick = () => {
        DeleteBook();
        window.location.href = "index.html";
    };
});    