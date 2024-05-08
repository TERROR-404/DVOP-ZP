let addBook = document.getElementById("addBook");
let addAuthor = document.getElementById("addAuthor");
let addLibrary = document.getElementById("addLibrary");
let addGenre = document.getElementById("addGenre");
let removeBook = document.getElementById("removeBook");
let removeAuthor = document.getElementById("removeAuthor");
let removeLibrary = document.getElementById("removeLibrary");
let removeGenre = document.getElementById("removeGenre");
let main = document.getElementsByTagName("main")[0];

function addRemoveClick(clickedElement) {
    for (const item of document.getElementsByClassName("addRemoveButton")) {
        item.style.color = "black"
        item.style.backgroundColor = "white"; 
    }
    clickedElement.style.color = "white"
    clickedElement.style.backgroundColor = "#8C0000";
};

addBook.addEventListener("click", (event)=>{
    addRemoveClick(addBook);
    main.innerHTML = ``;
});
addAuthor.addEventListener("click", (event)=>{
    addRemoveClick(addAuthor);
});
addLibrary.addEventListener("click", (event)=>{
    addRemoveClick(addLibrary);
});
addGenre.addEventListener("click", (event)=>{
    addRemoveClick(addGenre);
    main.innerHTML = `
    <form>
        <article class="selects">
            <section class="select">
                <label for"Library" class="dropdownName">Knihovna</label>
                <input name="Library" type=button class="dropdownButton"><i class="fa-solid fa-caret-down"></i>
                <section class="dropdownTitle"></section>
                <ul class="dropdownContent">
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                    <li>Link 3</li>
                </ul>
            </section>
            <section class="select">
                <label for="Region" class="dropdownName">Knihovna</label>
                <input name="Region" type=button class="dropdownButton">
                <section class="dropdownTitle"></section>
                <i class="fa-solid fa-caret-down"></i>
                <ul class="dropdownContent">
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                    <li>Link 3</li>
                </ul>
            </section>
        </article>
        <section class="textboxContainer">
            <label for="Name">Název</label>
            <input name="Name" type="text">
        </section>
        <input type="submit">
    </form>
    `;
    let dropdowns = document.getElementsByClassName("dropdownButton");
    let dropdownOptoins = document.getElementsByClassName("dropdownContent");
    let dropIcons = document.getElementsByClassName("fa-caret-down");
    let dropTitles = document.getElementsByClassName("dropdownTitle");
    for (const i in dropdowns) {
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
                    });
                }
            }
        });
    }
});
removeBook.addEventListener("click", (event)=>{
    addRemoveClick(removeBook);
    main.innerHTML = `
    <table>
        <thead>
            <tr>
                <th>Smazat</th>
                <th>Název</th>
                <th>ISBN</th>
                <th>Knihovna</th>
                <th>Autor</th>
                <th>Jazyk</th>
                <th>Vydání</th>
                <th>Rok vydání</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th><button class="remove"><i class="fa-solid fa-trash-can"></i></button></th>
                <th>Harry potter a kámen mudrců</th>
                <th>1234-1234-1234-1234</th>
                <th>Městská knihovna v Praze - Smíchov</th>
                <th>J.K. Rowlingová</th>
                <th>Čeština</th>
                <th>1</th>
                <th>1993</th>
            </tr>
            <tr>
                <th><button class="remove"><i class="fa-solid fa-trash-can"></i></button></th>
                <th>Stopařův průvodce galaxií</th>
                <th>1234-1234-1234-1234</th>
                <th>Městská knihovna v Praze - Smíchov</th>
                <th>Terry Patchet</th>
                <th>Angličtina</th>
                <th>3</th>
                <th>1978</th>
            </tr>
        </tbody>
    </table>
    `;
});
removeAuthor.addEventListener("click", (event)=>{
    addRemoveClick(removeAuthor);
    main.innerHTML = `
    <table>
        <thead>
            <tr>
                <th>Smazat</th>
                <th>Jméno</th>
                <th>Knihovna</th>
                <th>Kraj</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th><button class="remove"><i class="fa-solid fa-trash-can"></i></button></th>
                <th>J.K. Rowlingová</th>
                <th>Městská knihovna v Praze - Smíchov</th>
                <th>Praha</th>
            </tr>
            <tr>
                <th><button class="remove"><i class="fa-solid fa-trash-can"></i></button></th>
                <th>J.R.R. Tolkien</th>
                <th>Městská knihovna v Praze - Smíchov</th>
                <th>Praha</th>
            </tr>
        </tbody>
    </table>
    `;
});
removeLibrary.addEventListener("click", (event)=>{
    addRemoveClick(removeLibrary);
    main.innerHTML = `
    <table>
        <thead>
            <tr>
                <th>Smazat</th>
                <th>Název</th>
                <th>Adresa</th>
                <th>Kraj</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th><button class="remove"><i class="fa-solid fa-trash-can"></i></button></th>
                <th>Městská knihovna v Praze - Smíchov</th>
                <th>nám. 14. října 83/15, 150 00 Praha 5-Smíchov</th>
                <th>Praha</th>
            </tr>
            <tr>
                <th><button class="remove"><i class="fa-solid fa-trash-can"></i></button></th>
                <th>Městská knihovna v Praze - Smíchov</th>
                <th>nám. 14. října 83/15, 150 00 Praha 5-Smíchov</th>
                <th>Praha</th>
            </tr>
        </tbody>
    </table>
    `;
});
removeGenre.addEventListener("click", (event)=>{
    addRemoveClick(removeGenre);
    main.innerHTML = `
    <table>
        <thead>
            <tr>
                <th>Smazat</th>
                <th>Název</th>
                <th>Knihovna</th>
                <th>Kraj</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th><button class="remove"><i class="fa-solid fa-trash-can"></i></button></th>
                <th>Fantasy</th>
                <th>Městská knihovna v Praze - Smíchov</th>
                <th>Praha</th>
            </tr>
            <tr>
                <th><button class="remove"><i class="fa-solid fa-trash-can"></i></button></th>
                <th>Sci-fi</th>
                <th>Městská knihovna v Praze - Smíchov</th>
                <th>Praha</th>
            </tr>
        </tbody>
    </table>
    `;
});