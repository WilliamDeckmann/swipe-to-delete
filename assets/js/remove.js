document.addEventListener("DOMContentLoaded", () => {

    // Element variables
    const list = document.querySelector(".List");
    const removeAll = document.querySelector(".Remove-all");
    const items = document.querySelectorAll(".Item");

    // Array variables
    let deletedArray = JSON.parse(localStorage.getItem("deleted"));
 


    // SwipeFunction
    let SwipeFunction = (e) => {

        // Target element
        let parent = e.target.parentElement;

        // Element variables
        let article = parent.querySelector(".Article");
        let button = parent.querySelector(".Delete");

        // If parent is correct
        if(parent.classList == "Item") {

            // Delete
            button.onclick = () => { // "onclick" instead of "event-listener", since it only runs once!

                // User object
                let userObject = {
                    id: parent.id,
                    text: parent.querySelector(".Article .Text").textContent
                };

                // Filter
                deletedArray = deletedArray.filter((item) => userObject.id != item.id);
                
                // If local storage is empty
                if(deletedArray.length > 0) {
                    localStorage.setItem("deleted", JSON.stringify(deletedArray));
                }else{
                    localStorage.clear();
                };

                // Animate
                article.style.transform = `translateX(0px)`;
                parent.classList.add("animate__animated", "animate__backOutLeft");
                setTimeout(() => {parent.classList.add("collapsed")}, 500);
                setTimeout(() => {parent.remove()}, 500 + 500); // Wait th time it takes for all animations to run

                

                // Log the local storage
                console.log(JSON.parse(localStorage.getItem("deleted")));
            };
        };
    };
    


    // Remove all
    removeAll.addEventListener("click", () => {
        items.forEach(item => {
            item.querySelector(".Article").style.transform = `translateX(0px)`;
            item.classList.add("animate__animated", "animate__backOutLeft");
            setTimeout(() => {item.classList.add("collapsed")}, 500);
            setTimeout(() => {item.remove()}, 500 + 500); // Wait th time it takes for all animations to run
        });

        // Clear local storage
        localStorage.clear();
    });



    // Add event listener
    list.addEventListener("touchstart", (e) => {

        SwipeFunction(e);
    });
});