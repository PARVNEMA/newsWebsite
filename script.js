const api_key = "226e7a3980544640b0e09b693ffb3ef4";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load",()=> fetchnews("India"));
 const d=new Date()
 console.log(d);
async function fetchnews(query) {
  const res = await fetch(`${url}${query}&from=2023-11-01&sortBy=publishedAt&apiKey=${api_key}`);
  const data = await res.json();
  const articlesWithImages = data.articles.filter(article => article.urlToImage);
  // console.log(articlesWithImages);
  bindData(articlesWithImages);

}
function bindData(articles){
    const cardscontainer=document.getElementById('cards-container');
    const newscardtemplate=document.getElementById('template-news_card');

    cardscontainer.innerHTML='';
  
    articles.forEach((article) => {
        if(!article.urlToImage)return;
        const cardclone=newscardtemplate.content.cloneNode(true);
        filldata(cardclone,article);
        cardscontainer.appendChild(cardclone);
    });
    
    // return the article which doesnot containes imag
}
function filldata(cardclone,article){
  const newsimg=cardclone.querySelector('#news-img');
  const newstitle=cardclone.querySelector('#news-title');
  const newssource=cardclone.querySelector('#news-source');
  const newsdesc=cardclone.querySelector('#news-desc');

  newsimg.src=article.urlToImage;
  newstitle.innerHTML=article.title;
  newsdesc.innerHTML=article.description;
  const date=new Date(article.publishedAt).toLocaleString('en-US',{
    timeZone:"Asia/Jakarta"
  })
  newssource.innerHTML=`${article.source.name} . ${date}`

  cardclone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");
  })
}
let curSelectedNav = null;
function navitemclick(id) {
    fetchnews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
function reload(){
  window.location.reload(); 
}
 
const mobile=document.querySelector('.mobile-navbar');
const header=document.querySelector('.main-nav');
mobile.addEventListener('click',()=>Toggle());

const Toggle=()=>{
 header.classList.toggle("active");
}