document.addEventListener("DOMContentLoaded", () => {

    // Element variables
    const list = document.querySelector(".List");

    

    // SwipeFunction
    let SwipeFunction = (e) => {

        // Target element
        let parent = e.target.parentElement;
        //let parent = e.target.closest(".Item");

        // Element variables
        let article = parent.querySelector(".Article");
        let button = parent.querySelector(".Delete");

        // Touch variables
        let touchStart = e.touches[0].clientX;
        let touchMove;
        let touchEnd

        // If parent is correct
        if(parent.classList == "Item") {

            // Touch move
            article.addEventListener("touchmove", (e) => {
                touchMove = Math.floor(e.touches[0].clientX);
                if(touchMove < touchStart && touchMove > touchStart - button.offsetWidth) { // button.offsetWidth // viewWidth
                    article.style.transform = `translateX(${touchMove - touchStart}px)`;
                };
            });

            // Touch end
            article.addEventListener("touchend", (e) => {
                touchEnd = Math.floor(e.changedTouches[0].clientX);
                if(touchEnd < touchStart - button.offsetWidth / 2) { // button.offsetWidth / 2  // viewWidth / 2
                    article.style.transform = `translateX(-${button.offsetWidth}px)`;
                }else {
                    article.style.transform = `translateX(0px)`; // ${e.target.offsetLeft}
                };
            });
        };
    };
    


    // Add event listener
    list.addEventListener("touchstart", (e) => {
        SwipeFunction(e);
    });
});