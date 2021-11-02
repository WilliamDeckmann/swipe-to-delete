document.addEventListener("DOMContentLoaded", () => {

    // Element variables
    const list = document.querySelector(".List");

    // URL variablea
    let url = "https://jsonplaceholder.typicode.com/users";



    // Loop: jsonplaceholder
    for(let i = 0; i < 10; i++) {       
        axios.get(url)
        .then(response => {

            // Response variable
            var data = response.data[i];


            
            // Create: item
            let item = document.createElement("li");
            list.appendChild(item);
            item.classList.add("Item")

            
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

            

            // Touch variables
            let touchStart;
            let touchMove;
            let touchEnd

            // Width variables
            const viewWidth = (window.screen.width * 40) / 100;



            // Delete
            remove.addEventListener("click", () => {
                // mainElement.style.transform = "scale(0, 0)";
                article.style.transform = `translateX(0px)`;
                item.classList.add("animate__animated", "animate__backOutLeft");
                setTimeout(() => {item.classList.add("collapsed")}, 500);
                setTimeout(() => {item.remove()}, 500 + 500); // Wait th time it takes for all animations to run
            });

            // Touch start
            article.addEventListener("touchstart", (e) => touchStart = e.touches[0].clientX);

            // Touch move
            article.addEventListener("touchmove", (e) => {
                touchMove = Math.floor(e.touches[0].clientX);
                if(touchMove < touchStart && touchMove > touchStart - remove.offsetWidth) { // remove.offsetWidth // viewWidth
                    article.style.transform = `translateX(${touchMove - touchStart}px)`;
                };
            });

            // Touch end
            article.addEventListener("touchend", (e) => {
                touchEnd = Math.floor(e.changedTouches[0].clientX);
                if(touchEnd < touchStart - remove.offsetWidth / 2) { // remove.offsetWidth / 2  // viewWidth / 2
                    article.style.transform = `translateX(-${remove.offsetWidth}px)`;
                }else {
                    article.style.transform = `translateX(${e.target.offsetLeft})`;
                }
            });
        });   
    };
});