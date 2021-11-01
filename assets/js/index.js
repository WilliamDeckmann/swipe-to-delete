// Element variables
const deleteElement = document.querySelector(".Delete");
const articleElement = document.querySelector(".Article");

// Touch variables
let touchStart;
let touchMove;



// Delete
deleteElement.addEventListener("click", () => {

    console.log("Delete")
});

// Touch start
articleElement.addEventListener("touchstart", (e) => {

    touchStart = e.touches[0].clientX
    console.log(touchStart)

});

// Touch move
articleElement.addEventListener("touchmove", (e) => {

    touchMove = Math.floor(e.touches[0].clientX);
    console.log(touchMove)

    if(touchMove < touchStart) {
        articleElement.style.transform = `translateX(${touchMove - touchStart}px)`;
    };
});