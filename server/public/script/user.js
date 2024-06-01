const url = "http://localhost:8080/user";
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
                        Search();
                    });
                }
            }
        });
    }
})

let booksData = [];

function createBooks(books) {
    let booksHtml = document.getElementById("books");
    booksHtml.innerHTML = "";
    for (const book of books) {
        booksHtml.innerHTML += `
        <section class="book">
            <section class="bookTitle">${book.bookTitle}</section>
            <section class="bookMain">
                <section class="bookLeft">
                    <section class="bookInformation">
                        <section class="label">Autoři</section>
                        <section>${book.authors.substring(0,60)}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Jazyk</section>
                        <section>${book.bookLanguage}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">ISBN</section>
                        <section>${book.bookIsbn}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Kraj</section>
                        <section>${book.regionName}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Knihovna</section>
                        <section>${book.libraryName}</section>
                        <section class="bookAddress">${book.libraryAddress}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Žánry</section>
                        <section>${book.genres.substring(0,60)}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Rok vydání</section>
                        <section>${book.bookYear}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Číslo vydání</section>
                        <section>${book.bookIssueNumber}</section>
                    </section>
                    <section class="bookInformation">
                        <section class="label">Počet stran</section>
                        <section>${book.bookPages}</section>
                    </section>
                </section>
                <section class="bookRight">
                    <section class="label">Děj</section>
                    <section class="description">
                        ${book.bookContent}
                    </section>
                </section>
            </section>
        </section>
        `
    }
}

fetch(url+"/book", {
    mode: "cors",
    method: "GET"
})
.then(response => response.json())
.then(data => {
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
                    genres += `, ${data.genres.rows[i].genre_name}`;
                }
                else{
                    genres += data.genres.rows[i].genre_name;
                }
            }
        }
        const bookTitle = data.book.rows[index].book_name;
        const bookLanguage = data.book.rows[index].language;
        const bookIsbn = data.book.rows[index].isbn;
        const regionName = data.book.rows[index].region_name;
        const libraryName = data.book.rows[index].library_name;
        const libraryAddress = data.book.rows[index].adress;
        const bookYear = data.book.rows[index].year;
        const bookIssueNumber = data.book.rows[index].issueNumber;
        const bookPages = data.book.rows[index].pages;
        const bookContent = data.book.rows[index].content;
        let book = {
            "authors":authors,
            "genres": genres,
            "bookTitle": bookTitle,
            "bookLanguage":bookLanguage,
            "bookIsbn":bookIsbn,
            "regionName":regionName,
            "libraryName":libraryName,
            "libraryAddress":libraryAddress,
            "bookYear":bookYear,
            "bookIssueNumber":bookIssueNumber,
            "bookPages":bookPages,
            "bookContent":bookContent
        }
        booksData.push(book);
    }
    createBooks(booksData);
})

function Search() {
    let searchText = document.getElementById("searchText").value;
    let selectedRegion = (document.getElementById("selectedRegion").innerHTML.split(`<i`)[0].length == 0) ? undefined : document.getElementById("selectedRegion").innerHTML.split(` <i`)[0];
    let selectedLibrary = (document.getElementById("selectedLibrary").innerHTML.split("<i")[0].length ==0) ? undefined : document.getElementById("selectedLibrary").innerHTML.split(` <i`)[0];
    let selectedGenre = (document.getElementById("selectedGenre").innerHTML.split("<i")[0].length ==0) ? undefined : document.getElementById("selectedGenre").innerHTML.split(` <i`)[0];
    let selectedAuthor = (document.getElementById("selectedAuthor").innerHTML.split("<i")[0].length==0) ? undefined : document.getElementById("selectedAuthor").innerHTML.split(` <i`)[0];
    let selectedLanguage = (document.getElementById("selectedLanguage").innerHTML.split("<i")[0].length==0) ? undefined : document.getElementById("selectedLanguage").innerHTML.split(` <i`)[0];
    let searchBooks = [];
    for (const book of booksData) {
        if (searchText.length != 0) {
            if ((book.bookTitle == searchText)&&((selectedAuthor == undefined || book.authors.includes(selectedAuthor))&&(selectedRegion == undefined || book.regionName==selectedRegion)&&(selectedLibrary == undefined || book.libraryName==selectedLibrary)&&(selectedGenre == undefined || book.genres.includes(selectedGenre))&&(selectedLanguage == undefined || book.bookLanguage==selectedLanguage))) {
                searchBooks.push(book);
            }
        }
        else{
            if ((selectedAuthor == undefined || book.authors.includes(selectedAuthor))&&(selectedRegion == undefined || book.regionName==selectedRegion)&&(selectedLibrary == undefined || book.libraryName==selectedLibrary)&&(selectedGenre == undefined || book.genres.includes(selectedGenre))&&(selectedLanguage == undefined || book.bookLanguage==selectedLanguage)) {
                searchBooks.push(book);
            }
        }
    }
    createBooks(searchBooks);
}
let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click",()=>{
    Search();
});