document.addEventListener("DOMContentLoaded", () => {

    // Element variables
    const list = document.querySelector(".List");

    // Array variables
    let deletedArray = [];

    

    // SwipeFunction
    let DeleteFunction = (e) => {

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

                // Push deleted items
                deletedArray.push(userObject); // JSON.stringify(userObject)
                localStorage.setItem("deleted", JSON.stringify(deletedArray));

                // Animate
                // mainElement.style.transform = "scale(0, 0)";
                article.style.transform = `translateX(0px)`;
                parent.classList.add("animate__animated", "animate__backOutLeft");
                setTimeout(() => {parent.classList.add("collapsed")}, 500);
                setTimeout(() => {parent.remove()}, 500 + 500); // Wait the time it takes for all animations to run

                
                
                // Log the local storage
                console.log(JSON.parse(localStorage.getItem("deleted")));
            };
        };
    };
    


    // Add event listener
    list.addEventListener("touchstart", (e) => {
        DeleteFunction(e);
    });
});