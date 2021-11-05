document.addEventListener("DOMContentLoaded", () => {

    // Element variables
    const list = document.querySelector(".List");

    // Array variables
    let deletedArray = JSON.parse(localStorage.getItem("deleted"));



    // Loop: jsonplaceholder
    deletedArray.forEach(element => {

            
        // Create: item
        let item = document.createElement("li");
        list.appendChild(item);
        item.classList.add("Item")
        //item.setAttribute("id", `Item_${i}`);
        
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
                ${element.text}
            </p>
        `;
    });



    // Add event listener
    list.addEventListener("touchstart", (e) => {

        // Target element
        let target = e.target;
        let parent = e.target.parentElement;

        // Element variables
        let button = parent.querySelector(".Delete");

        // Touch variables
        let touchStart = e.touches[0].clientX;
        let touchMove;
        let touchEnd



        // Touch move
        target.addEventListener("touchmove", (e) => {
            if(target.classList == "Article") {
                touchMove = Math.floor(e.touches[0].clientX);
                if(touchMove < touchStart && touchMove > touchStart - button.offsetWidth) { // button.offsetWidth // viewWidth
                    target.style.transform = `translateX(${touchMove - touchStart}px)`;
                };
            };
        });

        // Touch end
        target.addEventListener("touchend", (e) => {
            if(target.classList == "Article") {
                touchEnd = Math.floor(e.changedTouches[0].clientX);
                if(touchEnd < touchStart - button.offsetWidth / 2) { // button.offsetWidth / 2  // viewWidth / 2
                    target.style.transform = `translateX(-${button.offsetWidth}px)`;
                }else {
                    target.style.transform = `translateX(0px)`; // ${e.target.offsetLeft}
                }
            };
        });

        // Delete
        target.addEventListener("click", () => {
            if(target.classList == "Delete") {
                // mainElement.style.transform = "scale(0, 0)";
                target.style.transform = `translateX(0px)`;
                parent.classList.add("animate__animated", "animate__backOutLeft");
                setTimeout(() => {parent.classList.add("collapsed")}, 500);
                setTimeout(() => {parent.remove()}, 500 + 500); // Wait th time it takes for all animations to run

                // Push item id to array
                //deletedArray.pop(response.data[parent.id.replace("Item_", "")].username);

                // Add to local storage
                //localStorage.setItem("Deleted", deletedArray);
                console.log(localStorage.getItem("Deleted").split(","));
            };
        });
    });



    // Log deleted array
    //console.log(localStorage.getItem("Deleted").split(","))
});