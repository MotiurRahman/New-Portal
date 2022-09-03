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
        <a class="nav-link mx-3" href="#" onclick="newID(${element.category_id})">${element.category_name}</a>
        `
        li.innerHTML = catName;
        categoryList.appendChild(li);

    });
}


const newsInfo = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data));
}

function newID(catId) {
    let url = `https://openapi.programming-hero.com/api/news/category/${catId}`;
    newsInfo(url);
    console.log(catId);
}

function displayNews(data) {
    console.log(data);
    const newsItems = document.getElementById('newsItems');
    const news = `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="..." class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural
                    lead-in to
                    additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    </div>
</div>
    `

}