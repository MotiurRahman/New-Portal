const spinnerItem = document.getElementById('spinnerItem');

//get category list
const fetchData = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => {

            document.getElementById('headerContent').innerHTML = "";
            document.getElementById('headerContent').innerHTML = `Error: ${error}:Please try again`;
            console.error('There was an error!', error);
        });
}

fetchData('https://openapi.programming-hero.com/api/news/categories');

const displayCategory = (data) => {
    const categoryList = document.getElementById('categoryList');
    data.forEach(element => {

        //console.log(element.category_name);
        const li = document.createElement('li');
        li.classList.add('nav-item');
        const catName = `
        <a class="nav-link mx-3" href="#" onclick="newsID('${element.category_id}','${element.category_name}')">${element.category_name}</a>
        `
        li.innerHTML = catName;
        categoryList.appendChild(li);

    });
}



// Call Based on category ID
const newsID = (catId, catname) => {
    // console.log("catId", catId);
    // console.log("catname", catname);
    spinnerItem.classList.remove('d-none');
    let url = `https://openapi.programming-hero.com/api/news/category/${catId}`;
    newsInfo(url, catname);

}

// Fetch news data
const newsInfo = (url, catname) => {
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data, catname))
        .catch(error => {
            document.getElementById('mainContet').innerHTML = "";
            document.getElementById('mainContet').innerHTML = `Error: ${error}:Please try again`;
            console.error('There was an error!', error);

        });
}


//Initial loading
const loadNews = () => {
    spinnerItem.classList.remove('d-none');
    newsInfo("https://openapi.programming-hero.com/api/news/category/01");
}
loadNews();


// Display News
const displayNews = (data, catname) => {
    console.log(data);

    //short based on total view
    data.sort(function (view1, view2) { return view2.total_view - view1.total_view });
    questionAnswer.classList.add('d-none')
    const totalItem = document.getElementById('totalItem');


    totalItem.innerText = "";
    totalItem.innerText = `${data.length} Items found for category ${catname ? catname : "Home"}`;


    const newsItems = document.getElementById('newsItems');
    newsItems.innerHTML = "";
    if (data.length == 0) {
        spinnerItem.classList.add('d-none');
        newsItems.innerText = "No News Found.";
        newsItems.classList.add('bg-danger', 'text-center', 'text-light', 'p-4');

    } else {
        newsItems.classList.remove('bg-danger', 'text-center', 'text-light');
    }
    data.forEach(element => {
        const newsCard = document.createElement('div');
        newsCard.classList.add("card");
        newsCard.classList.add("mb-3");
        newsCard.classList.add("border-0");
        const news = `
        <div class="row g-0">
            <div class="col-md-4 col-12 p-2">
                <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 col-12">
            <div class="d-flex flex-column" style="max-height:300px;">
                    <article class="p-2">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.details.slice(0, 400)}</p>
                    </article>
                   <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center flex-fill">
                        <div class="align-items-center">
                            <img src="${element.author.img}" width="20px" height="20px" class="rounded" alt="...">
                        </div>
                        <div class="align-items-center mx-2" style="">
                            <h6 class="m-0 p-0" id="name">${element.author.name ? element.author.name : "Not Found"}</h6>
                        </div>
                      </div>                     
                      <div class="align-items-center d-flex flex-row flex-fill">
                           <p class="m-0 p-0"><i class="fa-regular fa-eye"></i><p>
                            <p class="m-0 p-0 px-2">${element.total_view ? element.total_view : 0}</p>
                        </div>

                        <div class="align-items-center flex-fill">
                          <button class="btn btn-info" onclick="moreDetails('${element._id}')" data-bs-toggle="modal" data-bs-target="#moreDetailsModal"><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    
        `

        newsCard.innerHTML = news;
        newsItems.appendChild(newsCard);
        spinnerItem.classList.add('d-none');
    });



}

const moreDetails = (news_id) => {
    //console.log(news_id);
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
        .then(res => res.json())
        .then(data => displayModal(data.data[0]));
}


//Display Modal
const displayModal = (data) => {
    const moreDetailsModalLabel = document.getElementById('moreDetailsModalLabel');
    const moreDetailsModalBoday = document.getElementById('moreDetailsModalBoday');
    moreDetailsModalLabel.innerText = `Title: ${data.title}`;
    moreDetailsModalBoday.innerText = data.details;
}