document.addEventListener("DOMContentLoaded", () => {

    // Element variables
    const list = document.querySelector(".List");

    // Array variables
    let deletedArray = JSON.parse(localStorage.getItem("deleted"));
 


    // SwipeFunction
    let SwipeFunction = (e) => {

        // Target element
        let parent = e.target.parentElement;

        // Element variables
        let article = parent.querySelector(".Article");
        let button = parent.querySelector(".Delete");

        

        // Delete
        button.onclick = () => { // "onclick" instead of "event-listener", since it only runs once!

            // User object
            let userObject = {
                id: parent.id,
                text: parent.querySelector(".Article .Text").textContent
            };

            // Filter
            deletedArray = deletedArray.filter((item) => userObject.id != item.id);
            localStorage.setItem("deleted", JSON.stringify(deletedArray));

            // Animate
            article.style.transform = `translateX(0px)`;
            parent.classList.add("animate__animated", "animate__backOutLeft");
            setTimeout(() => {parent.classList.add("collapsed")}, 500);
            setTimeout(() => {parent.remove()}, 500 + 500); // Wait th time it takes for all animations to run

            

            // Log the local storage
            console.log(JSON.parse(localStorage.getItem("deleted")));
        };
    };
    


    // Add event listener
    list.addEventListener("touchstart", (e) => {

        SwipeFunction(e);
    });
});