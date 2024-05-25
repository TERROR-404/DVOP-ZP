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
    main.innerHTML = `
    <form>
        <article id="left">
            <article id="top">
                <article id="topLeft">
                    <article class="selects">
                        <section class="select">
                            <label for="Region" class="dropdownName">Kraj</label>
                            <input name="Region" type=button class="dropdownButton"><i class="fa-solid fa-caret-down"></i>
                            <section class="dropdownTitle"></section>
                            <ul id="regionContent" class="dropdownContent">
                            </ul>
                        </section>
                        <section class="select">
                            <label for="Library" class="dropdownName">Knihovna</label>
                            <input name="Library" type=button class="dropdownButton">
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
                    <article class="selects">
                        <section id="isbnContainer" class="textboxContainer">
                            <label for="Isbn">ISBN</label>
                            <input id="littleTextbox" name="Isbn" type="text">
                        </section>
                        <section class="select">
                            <label for="Language" class="dropdownName">Jazyk</label>
                            <input name="Language" type=button class="dropdownButton">
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
                    <article class="selects">
                        <section id="littleTextContainer" class="textboxContainer">
                            <label for="Year">Rok vydání</label>
                            <input id="littleTextbox" name="Year" type="text">
                        </section>
                        <section id="littleTextContainer" class="textboxContainer">
                            <label for="IssueNumber">Číslo vydání</label>
                            <input id="littleTextbox" name="IssueNumber" type="text">
                        </section>
                        <section id="littleTextContainer" class="textboxContainer">
                            <label for="Pages">Počet stran</label>
                            <input id="littleTextbox" name="Pages" type="text">
                        </section>
                    </article>
                </article>
                <article id="topRight">
                    <section class="addingContainer">
                        <section class="label">Žánry</section>
                        <section class="adding">
                            <section class="addingLine">
                                <section class="genre">Horror</section>
                                <button type=button class="addingButton">-</button>
                            </section>
                            <button type=button class="addingButton" id="addingGenre">+</button>
                        </section>
                    </section>
                    <section class="addingContainer">
                        <section class="label">Autoři</section>
                        <section class="adding">
                            <section class="addingLine">
                                <section class="genre">J.K. Rowlingová</section>
                                <button type=button class="addingButton">-</button>
                            </section>
                            <button type=button class="addingButton" id="addingGenre">+</button>
                        </section>
                    </section>
                </article>
            </article>
            <article id="mid">
                <section class="textboxContainer">
                    <label for="Name">Název</label>
                    <input id="name" name="Name" type="text">
                </section>
            </article>
            <article id="down">
                <section class="descriptionContainer">
                    <label for="Description">Popis děje</label>
                    <input id="description" name="Description" type="text">
                </section>
            </article>
        </article>
        <article id="right">
        <button id="odeslatRight" type="submit">Odeslat</button>
        </article>
    </form>
    `;

    fetch("http://localhost:8080/region", {
        mode: "cors",
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        let regionDropdown = document.getElementById("regionContent");
        for (let index = 0; index < data.rows.length; index++) {
            console.log(data.rows[index].name);
            regionDropdown.innerHTML += `
            <li>${data.rows[index].name}</li>
            `
        }
    })

    document.getElementsByTagName("form")[0].style.flexDirection = "row";
    for (const iterator of document.getElementsByClassName("select")) {
        iterator.style.width = 45+"%";   
    }
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
});
addAuthor.addEventListener("click", (event)=>{
    addRemoveClick(addAuthor);
    main.innerHTML = `
    <form>
        <article class="selects">
            <section class="select">
                <label for="Region" class="dropdownName">Kraj</label>
                <input name="Region" type=button class="dropdownButton"><i class="fa-solid fa-caret-down"></i>
                <section class="dropdownTitle"></section>
                <ul id="regionContent" class="dropdownContent">
                </ul>
            </section>
            <section class="select">
                <label for="Library" class="dropdownName">Knihovna</label>
                <input name="Library" type=button class="dropdownButton">
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
            <label for="Name">Jméno</label>
            <input name="Name" type="text">
        </section>
        <button id="odeslat" type="submit">Odeslat</button>
    </form>
    `;

    fetch("http://localhost:8080/region", {
        mode: "cors",
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        let regionDropdown = document.getElementById("regionContent");
        for (let index = 0; index < data.rows.length; index++) {
            console.log(data.rows[index].name);
            regionDropdown.innerHTML += `
            <li>${data.rows[index].name}</li>
            `
        }
    })

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
});
addLibrary.addEventListener("click", (event)=>{
    addRemoveClick(addLibrary);
    main.innerHTML = `
    <form>
        <article class="selects">
            <section class="select">
                <label for="Region" class="dropdownName">Kraj</label>
                <input name="Region" type=button class="dropdownButton"><i class="fa-solid fa-caret-down"></i>
                <section class="dropdownTitle"></section>
                <ul id="regionContent" class="dropdownContent">
                </ul>
            </section>
        </article>
        <section class="textboxContainer">
            <label for="Name">Název</label>
            <input id="nameText" name="Name" type="text">
        </section>
        <section class="textboxContainer">
            <label for="Address">Adresa</label>
            <input id="addressText" name="Address" type="text">
        </section>
        <button id="odeslat" type="submit">Odeslat</button>
    </form>
    `;

    fetch("http://localhost:8080/region", {
        mode: "cors",
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        let regionDropdown = document.getElementById("regionContent");
        for (let index = 0; index < data.rows.length; index++) {
            regionDropdown.innerHTML += `
            <li>${data.rows[index].name}</li>
            `
        }
    })

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
    const submit = document.getElementById("odeslat");
    submit.addEventListener("click", ()=>{
        let data = {
            "name": document.getElementById("nameText").value,
            "address": document.getElementById("addressText").value,
            "region": document.getElementsByClassName("dropdownTitle")[0].innerText
        };
        fetch("http://localhost:8080/library", {
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "POST",
            body: JSON.stringify(data)
        })
    });
});
addGenre.addEventListener("click", (event)=>{
    addRemoveClick(addGenre);
    main.innerHTML = `
    <form>
        <article class="selects">
            <section class="select">
                <label for="Region" class="dropdownName">Kraj</label>
                <input name="Region" type=button class="dropdownButton"><i class="fa-solid fa-caret-down"></i>
                <section class="dropdownTitle"></section>
                <ul id="regionContent" class="dropdownContent">
                </ul>
            </section>
            <section class="select">
                <label for="Library" class="dropdownName">Knihovna</label>
                <input name="Library" type=button class="dropdownButton">
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
        <button id="odeslat" type="submit">Odeslat</button>
    </form>
    `;
    
    fetch("http://localhost:8080/region", {
        mode: "cors",
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        let regionDropdown = document.getElementById("regionContent");
        for (let index = 0; index < data.rows.length; index++) {
            console.log(data.rows[index].name);
            regionDropdown.innerHTML += `
            <li>${data.rows[index].name}</li>
            `
        }
    })

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
        </tbody>
    </table>
    `;
    fetch("http://localhost:8080/library", {
        mode: "cors",
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        let tableBody = document.getElementsByTagName("tbody")[0];
        for (let index = 0; index < data.rows.length; index++) {
            tableBody.innerHTML += `
            <tr>
                <th><button class="remove"><i class="fa-solid fa-trash-can"></i></button></th>
                <th>${data.rows[index].library_name}</th>
                <th>${data.rows[index].adress}</th>
                <th>${data.rows[index].region_name}</th>
            </tr>
            `
        }
    })
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
        </tbody>
    </table>
    `;

    fetch("http://localhost:8080/region", {
        mode: "cors",
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        let tableBody = document.getElementsByTagName("tbody")[0];
        for (let index = 0; index < data.rows.length; index++) {
            console.log(data.rows[index].name);
            tableBody.innerHTML += `
            <tr>
                <th><button class="remove"><i class="fa-solid fa-trash-can"></i></button></th>
                <th>${data.rows[index].name}</th>
                <th>${data.rows[index].id}</th>
                <th>${data.rows[index].name}</th>
            </tr>
            `
        }
    })
});