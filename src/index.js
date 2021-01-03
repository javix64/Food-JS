//arr addEventListener;
let arrListener=[];
const arrSection=['paleo','vegan','low-sugar','search'];
function main(){  
  const urlPaleo = 'https://api.edamam.com/search?q=chicken&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=paleo&p=2';
  const urlVegan = 'https://api.edamam.com/search?q=broccoli&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=vegan';
  const urlLowSugar= 'https://api.edamam.com/search?q=tomato&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=low-sugar';
  const arrUrl=[urlPaleo,urlVegan,urlLowSugar];
  
  for (let j = 0; j < 1; j++) {
  //for (let j = 0; j < 3; j++) {
    const requestAll = new Request(arrUrl[j],{method: 'GET'});
    fetch(requestAll)
    .then( response => response.json() )
    .then( data => {
      let hits=data.hits;
      let article;
      let p;
      let a;
      let img;
      let ul;
      let li;
      let h2;
      let id;
      let buttonClick;
      let section = document.getElementById(arrSection[j]);
      for (let i = 0; i < hits.length; i++) {
        //creating html
        article = document.createElement('article');
        p = document.createElement('p');
        a= document.createElement('a');
        img = document.createElement('img');
        ul = document.createElement('ul');
        h2 = document.createElement('h2');
        buttonClick = document.createElement('button');
        
        //appending data to html
        h2.innerText=hits[i].recipe.label;
        p.innerText=hits[i].recipe.calories+" Kcal";
        img.setAttribute('src',hits[i].recipe.image);
        a.setAttribute('href',hits[i].recipe.url);
        let ingredients=hits[i].recipe.ingredients.length;
        let arrIngredients=[];
        for (const j of hits[i].recipe.ingredients) {
          arrIngredients.push(j);
        }
        for (let b = 0; b < arrIngredients.length; b++) {
          li = document.createElement('li');
          li.innerText=arrIngredients[b].text;
          ul.append(li);
        }
        article.append(h2);
        article.append(p);
        a.append(img);
        article.append(a);
        article.append(ul);
        //append to correctly section.
        section.append(article);
        //Setting id for model view.
        id=arrSection[j]+i;
        arrListener.push(id);
        article.append(buttonClick);
        buttonClick.innerText='Press to watch recipe';
        buttonClick.setAttribute('id',id.toString());
        
      }

      document.getElementById('paleo0').addEventListener('click',function() {modal.style.display = "block";})
      for (let k = 0; k < 10; k++) {
        
      }
    }//end then call
      
    )
    .catch( e => console.error( 'Something went wrong' ) );
  }
}//call function main.

function search(param){
  let url = `https://api.edamam.com/search?q=${param}&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=paleo`;
  params = {
    method: 'GET'
  };
  //hide the three categories and show only the search results.
  document.getElementById('paleo').setAttribute('style','display:none');
  document.getElementsByClassName('secH2')[0].setAttribute('style','display:none');
  document.getElementById('vegan').setAttribute('style','display:none');
  document.getElementsByClassName('secH2')[1].setAttribute('style','display:none');
  document.getElementById('low-sugar').setAttribute('style','display:none');
  document.getElementsByClassName('secH2')[2].setAttribute('style','display:none');
  var request = new Request( url, params );
  //we do the request with fetch
  fetch(request)
    .then( response => response.json() )
    .then( data => {
      let hits=data.hits;
      let article;
      let p;
      let a;
      let img;
      let ul;
      let li;
      let h2;
      let buttonClick;
      //Writing the search results in the html.
      const header = document.createElement('h2');
      header.innerText = 'Search';
      header.setAttribute('class','secH2');
      const section= document.createElement('section');
      section.setAttribute('id','search')
      document.getElementsByTagName('main')[0].append(header);
      document.getElementsByTagName('main')[0].append(section);
      for (let i = 0; i < hits.length; i++) {
        //creating html
        article = document.createElement('article');
        p = document.createElement('p');
        a= document.createElement('a');
        img = document.createElement('img');
        ul = document.createElement('ul');
        h2 = document.createElement('h2');
        buttonClick = document.createElement('button');
        //appending data to html
        h2.innerText=hits[i].recipe.label;
        p.innerText=hits[i].recipe.calories +" Kcal";
        img.setAttribute('src',hits[i].recipe.image);
        a.setAttribute('href',hits[i].recipe.url);
        console.dir(hits[i].recipe)
        let ingredients=hits[i].recipe.ingredients.length;
        let arrIngredients=[];
        for (const j of hits[i].recipe.ingredients) {
          arrIngredients.push(j);
        }
        for (let b = 0; b < arrIngredients.length; b++) {
          li = document.createElement('li');
          li.innerText=arrIngredients[b].text;
          ul.append(li);
        }
        //crear li con array

        article.append(h2);
        article.append(p);
        a.append(img);
        article.append(a);
        article.append(ul);
        //append to correctly section.
        section.append(article);
        //more information button
        buttonClick.setAttribute('id','search'+i);
        article.append(buttonClick);
        buttonClick.innerText='Press to watch recipe';
      }
    
    })
    .catch( e => console.error( 'Something went wrong' ) );
}//end search


//tengo que crear tantos eventos por cada receta exista
//despues asociarle que abra una ventana modal y muestre esa receta


// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");

//open the modal
btn.onclick = function() {modal.style.display = "block";}

//Close modal window
document.getElementsByClassName("close")[0].onclick = function() {modal.style.display = "none";};
window.onclick = function(event) {if (event.target == modal) {modal.style.display = "none";}};
document.addEventListener("keydown", function(event) {if (event.key === "Escape") {modal.style.display="none";}});

//main();

const searchIt=document.getElementsByTagName('input')[0];
searchIt.addEventListener('keypress',function(e){if(e.key==='Enter'){search(searchIt.value)}});
const button=document.getElementsByTagName('button')[0];
button.addEventListener('click',function(){search(searchIt.value)})