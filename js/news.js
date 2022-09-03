//get category list
const fetchData = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category));
}

fetchData('https://openapi.programming-hero.com/api/news/categories');

function displayCategory(data) {
    const categoryList = document.getElementById('categoryList');
    data.forEach(element => {
        //console.log(element.category_name);
        const li = document.createElement('li');
        li.classList.add('nav-item');
        const catName = `
        <a class="nav-link mx-3" href="#" onclick="newsID('${element.category_id}')">${element.category_name}</a>
        `
        li.innerHTML = catName;
        categoryList.appendChild(li);

    });
}



// Call Based on category ID
function newsID(catId) {
    //console.log(catId);
    let url = `https://openapi.programming-hero.com/api/news/category/${catId}`;
    newsInfo(url);

}

const newsInfo = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data));
}


// Display News
function displayNews(data) {
    console.log(data);
    const newsItems = document.getElementById('newsItems');
    newsItems.innerHTML = "";
    data.forEach(element => {
        const newsCard = document.createElement('div');
        newsCard.classList.add("card");
        newsCard.classList.add("mb-3");
        newsCard.classList.add("border-0");
        const news = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 p-2">
                <div class="card-body" style="max-height:300px;
                overflow: hidden !important;
                text-overflow: ellipsis;">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.details}</p>
                   <div class="d-flex">
                        <div>
                            <img src="${element.author.img}" width="20px" height="20px" class="rounded" alt="...">
                        </div>
                        <div>
                            <h6 id="name">${element.author.name ? element.author.name : "Not Found"}</h6>
                            <p id="publishDae">${element.author.published_date ? element.author.published_date : "Not Found"}
                            </p>
                        </div>
                       
                        <div class="d-flex">
                            <img  width="20px" height="20px" src="" class="rounded" alt="...">
                            <p>${element.total_view}</p>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    
        `

        newsCard.innerHTML = news;
        newsItems.appendChild(newsCard);
    });


}