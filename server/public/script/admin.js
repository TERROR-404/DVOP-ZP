let addBook = document.getElementById("addBook");
let addAuthor = document.getElementById("addAuthor");
let addLibrary = document.getElementById("addLibrary");
let addGenre = document.getElementById("addGenre");
let removeBook = document.getElementById("removeBook");
let removeAuthor = document.getElementById("removeAuthor");
let removeLibrary = document.getElementById("removeLibrary");
let removeGenre = document.getElementById("removeGenre");
let main = document.getElementsByTagName("main")[0];
const url = "http://localhost:8080";

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
                            <button name="Region" type=button class="dropdownButton"><i class="fa-solid fa-caret-down"></i></button>
                            <ul id="regionContent" class="dropdownContent">
                            </ul>
                        </section>
                        <section class="select">
                            <label for="Library" class="dropdownName">Knihovna</label>
                            <button name="Library" type=button class="dropdownButton"><i class="fa-solid fa-caret-down"></i></button>
                            <ul id="libContent" class="dropdownContent">
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
                            <button name="Language" type=button class="dropdownButton"><i class="fa-solid fa-caret-down"></i></button>
                            <ul id="languageContent" class="dropdownContent">
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
        <button id="odeslatRight" type="button">Odeslat</button>
        </article>
    </form>
    `;

    // jazyky generovány pomocí https://chatgpt.com/share/05d6c0bd-8146-4313-8a8e-ad02e93838bd
    const languages = [
        'Abkhaz',
        'Abenaki',
        'Afrikaans',
        'Akan',
        'Albanian',
        'Amharic',
        'Arabic',
        'Armenian',
        'Aymara',
        'Azerbaijani',
        'Bambara',
        'Bashkir',
        'Basque',
        'Belarusian',
        'Bengali',
        'Bhojpuri',
        'Bislama',
        'Bosnian',
        'Breton',
        'Bulgarian',
        'Burmese',
        'Catalan',
        'Cebuano',
        'Chamorro',
        'Chechen',
        'Cherokee',
        'Chichewa',
        'Chinese',
        'Chuvash',
        'Cornish',
        'Corsican',
        'Croatian',
        'Czech',
        'Danish',
        'Dari',
        'Dholuo',
        'Dinka',
        'Divehi',
        'Dutch',
        'Dzongkha',
        'English',
        'Esperanto',
        'Estonian',
        'Ewe',
        'Faroese',
        'Fijian',
        'Filipino',
        'Finnish',
        'French',
        'Galician',
        'Georgian',
        'German',
        'Greek',
        'Greenlandic',
        'Guarani',
        'Gujarati',
        'Haitian Creole',
        'Hausa',
        'Hawaiian',
        'Hebrew',
        'Hindi',
        'Hmong',
        'Hungarian',
        'Icelandic',
        'Igbo',
        'Indonesian',
        'Irish',
        'Italian',
        'Japanese',
        'Javanese',
        'Kannada',
        'Kazakh',
        'Khmer',
        'Kinyarwanda',
        'Komi',
        'Korean',
        'Kurdish',
        'Kyrgyz',
        'Lao',
        'Latin',
        'Latvian',
        'Lithuanian',
        'Luxembourgish',
        'Macedonian',
        'Malagasy',
        'Malay',
        'Malayalam',
        'Maltese',
        'Maori',
        'Marathi',
        'Mongolian',
        'Nahuatl',
        'Navajo',
        'Nepali',
        'Norwegian',
        'Ojibwa',
        'Oromo',
        'Pashto',
        'Persian',
        'Polish',
        'Portuguese',
        'Punjabi',
        'Quechua',
        'Romanian',
        'Russian',
        'Samoan',
        'Sanskrit',
        'Serbian',
        'Sesotho',
        'Shona',
        'Sindhi',
        'Sinhala',
        'Slovak',
        'Slovenian',
        'Somali',
        'Spanish',
        'Sundanese',
        'Swahili',
        'Swedish',
        'Tajik',
        'Tamil',
        'Tatar',
        'Telugu',
        'Thai',
        'Tibetan',
        'Tigrinya',
        'Tok Pisin',
        'Tongan',
        'Tswana',
        'Turkish',
        'Turkmen',
        'Twi',
        'Ukrainian',
        'Urdu',
        'Uzbek',
        'Vietnamese',
        'Welsh',
        'Wolof',
        'Xhosa',
        'Yiddish',
        'Yoruba',
        'Zulu'
    ];
    let languageDropdown = document.getElementById("languageContent");
    for (let index = 0; index < languages.length; index++) {
        languageDropdown.innerHTML += `
        <li>${languages[index]}</li>
        `
    }
      
    let regionDropdown = document.getElementById("regionContent");
    fetch(url+"/region", {
        mode: "cors",
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        for (let index = 0; index < data.rows.length; index++) {
            regionDropdown.innerHTML += `
            <li>${data.rows[index].name}</li>
            `
        }
    }).then(data => {
        let dropdowns = document.getElementsByClassName("dropdownButton");
        let dropdownOptoins = document.getElementsByClassName("dropdownContent");
        let dropIcons = document.getElementsByClassName("fa-caret-down");
        let libContent = document.getElementById("libContent");
        for (let li of regionDropdown.children) {
            li.addEventListener("click",()=>{
                libContent.innerHTML="";
                dropdowns[1].innerHTML = `<i class="fa-solid fa-caret-down"></i>`;
                libContent.style.display = "none";
                dropIcons[1].style.transform = "rotate(0deg)";
                fetch(url+`/region/${li.innerText}/library`, {
                    mode: "cors",
                    method: "GET"
                })
                .then(response => response.json())
                .then(data => {
                    for (let index = 0; index < data.rows.length; index++) {
                        libContent.innerHTML += `
                        <li>${data.rows[index].name}</li>
                        `
                    }
                    for (const li of libContent.children) {
                        li.addEventListener("click", (event) =>{
                            dropdowns[1].innerHTML = `${li.innerText} <i class="fa-solid fa-caret-down"></i>`;
                            libContent.style.display = "none";
                            dropIcons[1].style.transform = "rotate(0deg)";
                        });
                    }
                })
            });
        }
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
                            dropdowns[i].innerHTML = `${li.innerText} <i class="fa-solid fa-caret-down"></i>`;
                            dropdowns[i].style.justifyContent = "space-between";
                            dropdownOptoins[i].style.display = "none";
                            dropIcons[i].style.transform = "rotate(0deg)";
                        });
                    }
                }
            });
        }
    })

    document.getElementsByTagName("form")[0].style.flexDirection = "row";
    for (const iterator of document.getElementsByClassName("select")) {
        iterator.style.width = 45+"%";   
    }
});
addAuthor.addEventListener("click", (event)=>{
    addRemoveClick(addAuthor);
    main.innerHTML = `
    <form>
        <section class="textboxContainer">
            <label for="Name">Jméno</label>
            <input id="nameText" name="Name" type="text">
        </section>
        <button id="odeslat" type="button">Odeslat</button>
    </form>
    `;

    const submit = document.getElementById("odeslat");
    submit.addEventListener("click", ()=>{
        let data = {
            "name": document.getElementById("nameText").value,
        };
        fetch(url+"/author", {
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "POST",
            body: JSON.stringify(data)
        }).then(()=>{
            document.getElementById("nameText").value = "";
        })
    });

});
addLibrary.addEventListener("click", (event)=>{
    addRemoveClick(addLibrary);
    main.innerHTML = `
    <form>
        <article class="selects">
            <section class="select">
                <label for="Region" class="dropdownName">Kraj</label>
                <button name="Region" type=button class="dropdownButton"><i class="fa-solid fa-caret-down"></i></button>
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
        <button id="odeslat" type="button">Odeslat</button>
    </form>
    `;

    fetch(url+"/region", {
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
    }).then(data => {
        let dropdowns = document.getElementsByClassName("dropdownButton");
        let dropdownOptoins = document.getElementsByClassName("dropdownContent");
        let dropIcons = document.getElementsByClassName("fa-caret-down");
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
                            dropdowns[i].innerHTML = `${li.innerText} <i class="fa-solid fa-caret-down"></i>`;
                            dropdowns[i].style.justifyContent = "space-between";
                            dropdownOptoins[i].style.display = "none";
                            dropIcons[i].style.transform = "rotate(0deg)";
                        });
                    }
                }
            });
        }
    })

    const submit = document.getElementById("odeslat");
    submit.addEventListener("click", ()=>{
        let data = {
            "name": document.getElementById("nameText").value,
            "address": document.getElementById("addressText").value,
            "region": document.getElementsByClassName("dropdownButton")[0].innerHTML.split(" ")[0]
        };
        console.log(document.getElementsByClassName("dropdownButton")[0].innerHTML.split(" ")[0]);
        fetch(url+"/library", {
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "POST",
            body: JSON.stringify(data)
        }).then(()=>{
            document.getElementById("nameText").value = "";
            document.getElementById("addressText").value = "";
            document.getElementsByClassName("dropdownButton")[0].innerHTML = `<i class="fa-solid fa-caret-down"></i>`;
            document.getElementsByClassName("dropdownButton")[0].style.justifyContent = "flex-end";
        })
    });
});
addGenre.addEventListener("click", (event)=>{
    addRemoveClick(addGenre);
    main.innerHTML = `
    <form>
        <section class="textboxContainer">
            <label for="Name">Název</label>
            <input id="nameText" name="Name" type="text">
        </section>
        <button id="odeslat" type="button">Odeslat</button>
    </form>
    `;

    const submit = document.getElementById("odeslat");
    submit.addEventListener("click", ()=>{
        let data = {
            "name": document.getElementById("nameText").value,
        };
        fetch(url+"/genre", {
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(()=>{
            document.getElementById("nameText").value = "";
        })
    });
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
                <th>Autoři</th>
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
                <th>J.K. Rowlingová, J.R.R. Tolkien, Terry PratchettJ.K. Rowlingová, J.R.R. Tolkien, Terry Pratchett</th>
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
    let rows = document.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        rows[i].style.height = "150px";        
    }
});
removeAuthor.addEventListener("click", (event)=>{
    addRemoveClick(removeAuthor);
    main.innerHTML = `
    <table>
        <thead>
            <tr>
                <th>Smazat</th>
                <th>Jméno</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;

    fetch(url+"/author", {
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
                <th class="nameText">${data.rows[index].name}</th>
            </tr>
            `
        }
    })
    .then(()=>{
        let removeButtons = document.getElementsByClassName("remove");
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener("click",() =>{
                const path = document.getElementsByClassName("nameText")[i].innerText;
                fetch(url+"/author/"+path , {
                    mode: "cors",
                    method: "DELETE",
                })
                .then(()=>{
                    document.getElementsByTagName("tbody")[0].removeChild(document.getElementsByTagName("tbody")[0].children[i]);
                })
            })
        }
    })
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
    fetch(url+"/library", {
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
                <th class="libraryNameText">${data.rows[index].library_name}</th>
                <th class="addressNameText">${data.rows[index].adress}</th>
                <th class="regionNameText">${data.rows[index].region_name}</th>
            </tr>
            `
        }
    })
    .then(()=>{
        let removeButtons = document.getElementsByClassName("remove");
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener("click",() =>{
                const path = `${document.getElementsByClassName("libraryNameText")[i].innerText}_${document.getElementsByClassName("addressNameText")[i].innerText}_${document.getElementsByClassName("regionNameText")[i].innerText}`;
                fetch(url+"/library/"+path , {
                    mode: "cors",
                    method: "DELETE",
                })
                .then(()=>{
                    document.getElementsByTagName("tbody")[0].removeChild(document.getElementsByTagName("tbody")[0].children[i]);
                })
            })
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
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;

    fetch(url+"/genre", {
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
                <th class="nameText">${data.rows[index].name}</th>
            </tr>
            `
        }
    })
    .then(()=>{
        let removeButtons = document.getElementsByClassName("remove");
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener("click",() =>{
                const path = document.getElementsByClassName("nameText")[i].innerText;
                fetch(url+"/genre/"+path , {
                    mode: "cors",
                    method: "DELETE",
                })
                .then(()=>{
                    document.getElementsByTagName("tbody")[0].removeChild(document.getElementsByTagName("tbody")[0].children[i]);
                })
            })
        }
    })
});