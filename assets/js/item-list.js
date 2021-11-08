document.addEventListener("DOMContentLoaded", () => {

    // Element variables
    const list = document.querySelector(".List");

    // URL variables
    let url = "https://jsonplaceholder.typicode.com/users";

    // Array variables
    let deletedArray = JSON.parse(localStorage.getItem("deleted"));

    // Id array
    let idArray = [];
    deletedArray.forEach(element => {
        idArray.push(element.id);
    });



    // Fetch api data
    axios.get(url)
        .then(response => {

            // Loop: jsonplaceholder
            for(let i = 0; i < 10; i++) {

                // Response variable
                let data = response.data[i];

                if(!data.username.includes(idArray[i])) {

                    // Create: item
                    let item = document.createElement("li");
                    list.appendChild(item);
                    item.classList.add("Item")
                    item.setAttribute("id", data.username); //`Item_${i}`
                    
                    // Create: remove
                    let remove = document.createElement("div");
                    item.appendChild(remove);
                    remove.classList.add("Delete")
                    remove.innerHTML = `
                        <i class="fas fa-trash-alt Trash"></i>
                    `;

                    // Create: article
                    let article = document.createElement("article");
                    item.appendChild(article);
                    article.classList.add("Article")
                    article.innerHTML = `
                        <p class="Text">
                            Username: ${data.username}
                        </p>
                    `;
                };
            };
        });


    
    // Log the local storage
    console.log("Currently deleted items:");
    console.log(JSON.parse(localStorage.getItem("deleted")));
});