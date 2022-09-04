function displayBlog() {
    const newsItems = document.getElementById('newsItems');
    newsItems.innerHTML = "";
    const totalItem = document.getElementById('totalItem');
    totalItem.innerText = "";
    newsItems.classList.remove('bg-danger', 'text-center', 'text-light');
    const questionAnswer = document.getElementById('questionAnswer');
    questionAnswer.classList.remove('d-none')

}


function redisplayNews() {
    loadNews();
    questionAnswer.classList.add('d-none')
}