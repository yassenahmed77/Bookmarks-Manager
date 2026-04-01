// Global Scope Variables
let button = document.querySelector("button");
let bookmarksParent = document.querySelector(".bookmarks");
let suggestParent = document.querySelector(".suggest-parent");
let categoryInput = document.querySelector(".category");
let filterParent = document.querySelector("div.filter-categories");
let filterContent = document.querySelector("div.filter-content");
function saveBookmark() {
    // Variables
    let title = document.querySelector(".txt").value.trim();
    let url = document.querySelector(".url").value.trim();
    let category = document.querySelector(".category").value.trim();
    // Check Inputs
    if(!title || !url || !category ){
        alert("Please Fill All Fields");
        return;
    }
    // Add Bookmarks In Local Storage
    let bookmarks = JSON.parse(localStorage.getItem("bookmark")) || {};
    if(!bookmarks[category]) bookmarks[category] = [];
    if(bookmarks[category].some(b => b.url === url || b.title === title)){
        alert("This Title Or Url Exists");
        return;
    }
    bookmarks[category].push({title , url});
    localStorage.setItem("bookmark",JSON.stringify(bookmarks));
    // Empty The Form 
    document.querySelectorAll("input").forEach((input) => {
        input.value = ''
    })
    displayBookMarks();
}
button.addEventListener("click",saveBookmark);

function displayBookMarks() {
    // Clear Containers Before Add Any Bookmark
    filterParent.innerHTML = "";
    bookmarksParent.innerHTML = "";
    suggestParent.innerHTML = "";
    filterContent.innerHTML ='';
    // Get Data From Local Storage Or An Empty Obj
    let bookmarks = JSON.parse(localStorage.getItem("bookmark")) || {};
    let allBookmarksCategories = Object.keys(bookmarks);
    // Loop On Bookmarks Categories
    allBookmarksCategories.forEach((category) => {
        let bookmarksCategory = bookmarks[category];
        // Loop On Categories Data
        bookmarksCategory.forEach((bookmark,index) => {
            bookmarksParent.innerHTML += `
            <div class="bookmark">
            <div class="content">
            <span>${category}</span>
            <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
            </div>
            <button onclick="deleteBookMark('${category}',${index})">Delete</button>
            </div>
            `
        });
        suggestBookmark(category);
        filterBookmarksCategories(category);
    });
}
displayBookMarks();



function suggestBookmark(category){
    let suggest = document.createElement("span");
    suggest.textContent = category;
    suggestParent.appendChild(suggest);
    // Add The Chosen Suggest In Category Input
    suggest.addEventListener("click",(e) => {
        categoryInput.value = e.target.textContent;
        categoryInput.focus();
    });
}

function filterBookmarksCategories(category){
    // Show Categories 
    let cat = document.createElement("span");
    cat.textContent = category;
    filterParent.appendChild(cat);
    cat.addEventListener("click",() => {
        // Filtering Categories Data By Clicked Category
        let bookmarks = JSON.parse(localStorage.getItem("bookmark"));
        let categoryData = bookmarks[category];
        filterContent.innerHTML = "";
        bookmarksParent.innerHTML = "";
        categoryData.forEach((bookmark,index) =>{
            console.log(bookmark,index);
            filterContent.innerHTML += `
            <div class="filter-bookmark">
            <div class="content">
            <span class="num">${index + 1}</span>
            <a target="_blank" href="${bookmark.url}">${bookmark.title}</a>
            </div>
            <button onclick="deleteBookMark('${category}',${index})">Delete</button>
            </div>
            `;
        });
    });
}

function deleteBookMark(category,index){
    let bookmarks = JSON.parse(localStorage.getItem("bookmark"));
    bookmarks[category].splice(index,1);
    localStorage.setItem("bookmark",JSON.stringify(bookmarks));
    if(bookmarks[category].length === 0){
    delete bookmarks[category];
    }
    displayBookMarks();
}