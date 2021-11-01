// Element variables
const deleteElement = document.querySelector(".Delete");
const articleElement = document.querySelector(".Article");
const viewWidth = (window.screen.width * 40) / 100;

// Touch variables
let touchStart;
let touchMove;
let touchEnd



// Delete
deleteElement.addEventListener("click", () => {
    console.log("Delete")
});

// Touch start
articleElement.addEventListener("touchstart", (e) => touchStart = e.touches[0].clientX);

// Touch move
articleElement.addEventListener("touchmove", (e) => {
    touchMove = Math.floor(e.touches[0].clientX);
    if(touchMove < touchStart && touchMove > touchStart - viewWidth) { // deleteElement.offsetWidth
        articleElement.style.transform = `translateX(${touchMove - touchStart}px)`;
    };
});

// Touch end
articleElement.addEventListener("touchend", (e) => {
    touchEnd = Math.floor(e.changedTouches[0].clientX);
    if(touchEnd < touchStart - viewWidth / 2) { // deleteElement.offsetWidth / 2
        articleElement.style.transform = `translateX(-${viewWidth}px)`;
    }else {
        articleElement.style.transform = `translateX(${e.target.offsetLeft})`;
    }
});