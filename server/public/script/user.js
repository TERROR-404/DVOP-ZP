const url = "http://localhost:8080";
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

let genreDropdown = document.getElementById("genreContent");
fetch(url+"/genre", {
    mode: "cors",
    method: "GET"
})
.then(response => response.json())
.then(data => {
    for (let index = 0; index < data.rows.length; index++) {
        genreDropdown.innerHTML += `
        <li>${data.rows[index].name}</li>
        `
    }
})

let authorDropdown = document.getElementById("authorContent");
fetch(url+"/author", {
    mode: "cors",
    method: "GET"
})
.then(response => response.json())
.then(data => {
    for (let index = 0; index < data.rows.length; index++) {
        authorDropdown.innerHTML += `
        <li>${data.rows[index].name}</li>
        `
    }
})

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
})
.then(() => {
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

let booksData = {};

fetch(url+"/book", {
    mode: "cors",
    method: "GET"
})
.then(response => response.json())
.then(data => {
    booksData = data;
    let booksHtml = document.getElementById("books");
    for (let index = 0; index < data.book.rows.length; index++) {
        let authors = "";
        for (let i = 0; i < data.authors.rows.length; i++) {
            if (data.authors.rows[i].isbn == data.book.rows[index].isbn) {
                if (authors.length != 0) {
                    authors += `, ${data.authors.rows[i].author_name}`;
                }
                else{
                    authors += data.authors.rows[i].author_name;
                }
            }
        }
        let genres = "";
        for (let i = 0; i < data.genres.rows.length; i++) {
            if (data.genres.rows[i].isbn == data.book.rows[index].isbn) {
                if (genres.length != 0) {
                    genres += `, ${data.genres.rows[i].author_name}`;
                }
                else{
                    genres += data.genres.rows[i].author_name;
                }
            }
        }
        booksHtml.innerHTML += `
        <section class="book">
            <section class="bookTitle">${data.book.rows[index].book_name}</section>
            <section class="bookMain">
                <section class="bookLeft">
                    <section class="bookInformation">
                        <section class="label">Autoři</section>
                        <section>${authors.substring(0,60)}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Jazyk</section>
                        <section>${data.book.rows[index].language}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">ISBN</section>
                        <section>${data.book.rows[index].isbn}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Kraj</section>
                        <section>${data.book.rows[index].region_name}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Knihovna</section>
                        <section>${data.book.rows[index].library_name}</section>
                        <section class="bookAddress">${data.book.rows[index].adress}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Žánry</section>
                        <section>${genres.substring(0,60)}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Rok vydání</section>
                        <section>${data.book.rows[index].year}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Číslo vydání</section>
                        <section>${data.book.rows[index].issueNumber}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Počet stran</section>
                        <section>${data.book.rows[index].pages}</section>
                    </section>
                </section>
                <section class="bookRight">
                    <section class="label">Děj</section>
                    <section class="description">
                        ${data.book.rows[index].content}
                    </section>
                </section>
            </section>
        </section>
        `
    }
})