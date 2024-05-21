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
                        dropdownOptoins[i].style.display = "none";
                        dropIcons[i].style.transform = "rotate(0deg)";
                    });
                }
            }
        });
    }