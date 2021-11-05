document.addEventListener("DOMContentLoaded", () => {

    // Element variables
    const list = document.querySelector(".List");

    // URL variables
    let url = "https://jsonplaceholder.typicode.com/users";

    // Array variables
    //let userArray = [];



    // Fetch api data
    axios.get(url)
        .then(response => {

            // Loop: jsonplaceholder
            for(let i = 0; i < 10; i++) {

                // Response variable
                let data = response.data[i];


                
                // Create: item
                let item = document.createElement("li");
                list.appendChild(item);
                item.classList.add("Item")
                item.setAttribute("id", `Item_${i}`);
                
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



                //  Add to local storage
                //userArray.push(item.id);
                //localStorage.setItem("user", userArray);
            };
        });


    
    // Log local storage
    let deletedArrayParse = JSON.parse(localStorage.getItem("deleted"));
    console.log(deletedArrayParse);
    //console.log(localStorage.getItem("deleted").split(","));
});