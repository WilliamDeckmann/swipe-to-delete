document.addEventListener("DOMContentLoaded", () => {

    // Element variables
    const list = document.querySelector(".List");

    // Array variables
    //let userArray = [];
    let deletedArray = [];

    

    // SwipeFunction
    let SwipeFunction = (e) => {

        // Target element
        let target = e.target;
        let parent = e.target.parentElement;
        //let id = parent.id.replace("Item_", "");

        // User object
        let userObject = {
            id: parent.id,
            text: parent.querySelector(".Article .Text").textContent
        }

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

                    list.removeEventListener("touchStart", (e) => {
                        SwipeFunction(e)
                    })
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

                // Add items to local storage
                deletedArray.push(userObject);
                localStorage.setItem("deleted", JSON.stringify(deletedArray));

                // Log local storage
                let deletedArrayParse = JSON.parse(localStorage.getItem("deleted"));
                console.log(deletedArrayParse);
                //console.log(localStorage.getItem("deleted").split(","));

                /*
                // Remove from user array
                userArray.pop(id);
                localStorage.setItem("user", userArray);
                console.log(localStorage.getItem("user").split(","))*/

                /*
                // Add to local storage
                axios.get(url)
                    .then(response => {

                        // Push item id to array
                        deletedArray.push(response.data[id.replace("Item_", "")].username);
                        
                        
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
                        localStorage.setItem("deleted", filter(deletedArray));
                        console.log(localStorage.getItem("deleted").split(","));
                    });*/
            };
        }, {once: true});
    };
    


    // Add event listener
    list.addEventListener("touchstart", (e) => {

        SwipeFunction(e);
    });
});