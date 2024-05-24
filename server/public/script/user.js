let dropdowns = document.getElementsByClassName("dropdownButton");
let dropdownOptoins = document.getElementsByClassName("dropdownContent");
let dropIcons = document.getElementsByClassName("fa-caret-down");
let dropTitles = document.getElementsByClassName("dropdownTitle");
for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener("click", (event) =>{
        if ( dropdownOptoins[i].style.display == "block") {
            dropdownOptoins[i].style.display = "none"
            dropdowns[i].style.border = "grey solid 2px"
            dropIcons[i].style.color = "grey";
            dropIcons[i].style.transform = "rotate(0deg)";
        }
        else{
            dropdownOptoins[i].style.display = "block";
            dropdowns[i].style.border = "#8C0000 solid 2px";
            dropIcons[i].style.color = "#8C0000";
            dropIcons[i].style.transform = "rotate(180deg)";

            for (const li of dropdownOptoins[i].children) {
                li.addEventListener("click", (event) =>{
                    dropTitles[i].innerText = li.innerText;
                    dropdownOptoins[i].style.display = "none";
                    dropIcons[i].style.transform = "rotate(0deg)";
                });
            }
        }
    });
}

fetch("http://localhost:8080/region", {
    mode: "cors",
    method: "GET"
})
.then(response => response.json())
.then(data => {
    let booksHtml = document.getElementById("books");
    for (let index = 0; index < data.rows.length; index++) {
        console.log(data.rows[index].name);
        booksHtml.innerHTML += `
        <section class="book">
            <section class="bookTitle">${data.rows[index].name}</section>
            <section class="bookMain">
                <section class="bookLeft">
                    <section class="bookInformation">
                        <section class="label">Autoři</section>
                        <section>${data.rows[index].id}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Jazyk</section>
                        <section>${data.rows[index].name}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">ISBN</section>
                        <section>${data.rows[index].id}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Kraj</section>
                        <section>${data.rows[index].name}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Knihovna</section>
                        <section>${data.rows[index].name}</section>
                        <section class="bookAddress">${data.rows[index].id}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Žánry</section>
                        <section>${data.rows[index].name}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Rok vydání</section>
                        <section>${data.rows[index].id}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Číslo vydání</section>
                        <section>${data.rows[index].id}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Počet stran</section>
                        <section>${data.rows[index].id}</section>
                    </section>
                </section>
                <section class="bookRight">
                    <section class="label">Děj</section>
                    <section class="description">
                        ${data.rows[index].name}
                    </section>
                </section>
            </section>
        </section>
        `
    }
})