document.addEventListener("DOMContentLoaded", () => {

    // Element variables
    const list = document.querySelector(".List");

    // Array variables
    let deletedArray = JSON.parse(localStorage.getItem("deleted"));



    // Loop: local array
    deletedArray.forEach(element => {
            
        // Create: item
        let item = document.createElement("li");
        list.appendChild(item);
        item.classList.add("Item")
        item.setAttribute("id", element.id);
        
        // Create: remove
        let remove = document.createElement("div");
        item.appendChild(remove);
        remove.classList.add("Delete")
        remove.innerHTML = `
        <i class="fas fa-skull-crossbones Skull"></i>
        `;

        // Create: article
        let article = document.createElement("article");
        item.appendChild(article);
        article.classList.add("Article")
        article.innerHTML = `
            <p class="Text">
                ${element.text}
            </p>
        `;
    });



    // Log the local storage
    console.log("Currently deleted items:");
    console.log(JSON.parse(localStorage.getItem("deleted")));
});