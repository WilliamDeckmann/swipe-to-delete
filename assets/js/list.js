document.addEventListener("DOMContentLoaded", () => {

    // Element variables
    const list = document.querySelector(".List");
    const bin = document.querySelector(".Bin");

    // URL variables
    let url = "https://jsonplaceholder.typicode.com/users";

    // Array variables
    let userArray = [];
    let deletedArray = [];



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
                <p class="Text">
                    Delete
                </p>
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
            userArray.push(data.username);
            localStorage.setItem("User", userArray);
        };



        // Add event listener
        list.addEventListener("touchstart", (e) => {

            // Target element
            let target = e.target;
            let parent = e.target.parentElement;

            // Element variables
            let remove = parent.querySelector(".Delete");
            //let remove = target;
            //let article = target;

            // Touch variables
            let touchStart = e.touches[0].clientX;
            let touchMove;
            let touchEnd


            
            // Delete
            parent.addEventListener("click", () => {
                if(target.classList == "Delete") {
                    // mainElement.style.transform = "scale(0, 0)";
                    target.style.transform = `translateX(0px)`;
                    parent.classList.add("animate__animated", "animate__backOutLeft");
                    setTimeout(() => {parent.classList.add("collapsed")}, 500);
                    setTimeout(() => {parent.remove()}, 500 + 500); // Wait th time it takes for all animations to run

                    //  Add to local storage
                    deletedArray.push(response.data[parent.id.replace("Item_", "")].username);

                    // Filter array - Made by: "Oliver Rindolt"
                    function filter(a){
                        let filtered = [];
                        a.forEach(item =>{
                            if(!filtered.includes(item)){
                                filtered.push(item);
                            };
                        });
                        return filtered;
                    };

                    // Add to local storage
                    localStorage.setItem("Deleted", filter(deletedArray));
                    console.log(localStorage.getItem("Deleted").split(","));

                    DeletedList()
                };
            });

            // Touch start
            // target.addEventListener("touchstart", (e) => touchStart = e.touches[0].clientX);

            // Touch move
            target.addEventListener("touchmove", (e) => {
                if(target.classList == "Article") {
                    touchMove = Math.floor(e.touches[0].clientX);
                    if(touchMove < touchStart && touchMove > touchStart - remove.offsetWidth) { // remove.offsetWidth // viewWidth
                        target.style.transform = `translateX(${touchMove - touchStart}px)`;
                    };
                };
            });

            // Touch end
            target.addEventListener("touchend", (e) => {
                if(target.classList == "Article") {
                    touchEnd = Math.floor(e.changedTouches[0].clientX);
                    if(touchEnd < touchStart - remove.offsetWidth / 2) { // remove.offsetWidth / 2  // viewWidth / 2
                        target.style.transform = `translateX(-${remove.offsetWidth}px)`;
                    }else {
                        target.style.transform = `translateX(0px)`; // ${e.target.offsetLeft}
                    }
                };
            });
        });
    });



    // Deleted list
    function DeletedList() {

        // Reset list
        bin.innerHTML = `
            <!-- Header -->
            <header class="Header">
                <a class="Reload" href="index.html">
                    Deleted Items
                </a>
            </header>
        `;
        
        // For each
        localStorage.getItem("Deleted").split(",").forEach(element => {
        
            // Create: item
            let item = document.createElement("li");
            bin.appendChild(item);
            item.classList.add("Item")
            //item.setAttribute("id", `Item_${i}`);
            
            // Create: remove
            let remove = document.createElement("div");
            item.appendChild(remove);
            remove.classList.add("Delete")
            remove.innerHTML = `
                <p class="Text">
                    Delete
                </p>
            `;
    
            // Create: article
            let article = document.createElement("article");
            item.appendChild(article);
            article.classList.add("Article")
            article.innerHTML = `
                <p class="Text">
                    Username: ${element}
                </p>
            `;
        });
    };

    console.log(localStorage.getItem("Deleted"))
});