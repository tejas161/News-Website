let source = "";
if(source==="")
{
    newsGenerator();
}


var a = document.getElementById('search-btn');
var b = document.getElementById('search-news');
 
var channelNames=document.getElementById('news-names');
var search = document.getElementById('search-news');

channelNames.addEventListener('click',(e) => {
   source = e.target.innerText;
   search.value=source;
   newsGenerator();

});


a.addEventListener('click', (e) => {
    e.preventDefault();
    source = b.value;
    
    newsGenerator();

});

function newsGenerator(){

    document.body.scrollTop = document.documentElement.scrollTop = 0;
    var srcName = document.getElementById('src-name');
   


    //Initialize the news api parameters
    if (source === "") {
        source = 'India';
    }

    srcName.innerHTML = (`<span class="badge bg-secondary">Top Trending News in ${source} </span>`);
    let apiKey='7e3fb0297c31b8517c16258a59d9bc57';
    //grab the new conatiner
    let newsAccordion = document.getElementById('newsAccordion');

    //creating an ajax get request
    const xhr = new XMLHttpRequest();

      xhr.open('GET',`https://gnews.io/api/v4/search?q=${source}&token=${apiKey}`,true);

    //when response is ready
    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let articles = json.articles;
          
            let newsHtml = "";

            articles.forEach(function (element, index) {
                let news = `<div class="accordion-item">
                        <h2 class="accordion-header" id="heading${index}">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                              <b>Breaking News ${index + 1} :  </b>   ${element["title"]}
                            </button>
                        </h2>
                        <div id="collapse${index}" class="accordion-collapse collapse " aria-labelledby="heading${index}"
                            data-bs-parent="#newsAccordion">
                            <div class="accordion-body">${element["content"]}. <a href="${element['url']}"target="_blank">Read more here</a></div>
                        </div>
                    </div>`;
                newsHtml += news;
            });
            newsAccordion.innerHTML = newsHtml;
        }
        else {
            console.log('An Error Occurred');
        }
    }

    xhr.send();


};
