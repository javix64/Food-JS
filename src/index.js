//arr addEventListener;
let arrListener=[];
const arrSection=['paleo','vegan','low-sugar'];
function main(){  
  const urlPaleo = 'https://api.edamam.com/search?q=chicken&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=paleo';
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
        
      }//finish loop

      
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
      }//finish loop
      
      //new loop for modals recipes
      //for every recipe, create a modal

      for (let i = 0; i < 10; i++) {
        //creating modal
        let modal=document.createElement('div');
        modal.setAttribute('class','modal');
        modal.setAttribute('id','modal-search'+i);
        let modalContent= document.createElement('div');
        modalContent.setAttribute('class','modal-content');
        let close=document.createElement('span');
        close.setAttribute('class','close');
        close.innerHTML="&times;";

        let titleRecipe=document.createElement('h2');
        titleRecipe.innerText=data.hits[i].recipe.label;

        //appending to modal
        
        modal.append(modalContent);
        modalContent.append(close);
        modalContent.append(titleRecipe);
        document.body.append(modal);

        //adding events open and close
        document.getElementById('search'+i).addEventListener('click',function() {document.getElementById('modal-search'+i).style.display = "block";});
        document.getElementsByClassName("close")[i].onclick = function() {document.getElementById('modal-search'+i).style.display = "none";};
        window.addEventListener('click',
        function(e){if(e.target==document.getElementById('modal-search'+i)){document.getElementById('modal-search'+i).style.display='none'}});
        document.addEventListener("keydown", function(event) {if (event.key === "Escape") {document.getElementById('modal-search'+i).style.display="none";}});

      }
      //creating modals for every recipe;
    })
    .catch( e => console.error( 'Something went wrong' ) );
}//end search


//tengo que crear tantos eventos por cada receta exista
//despues asociarle que abra una ventana modal y muestre esa receta


//main();

const searchIt=document.getElementsByTagName('input')[0];
searchIt.addEventListener('keypress',function(e){if(e.key==='Enter'){search(searchIt.value)}});
const button=document.getElementsByTagName('button')[0];
button.addEventListener('click',function(){search(searchIt.value)});

function prueba(){
  fetch(new Request('https://api.edamam.com/search?q=chicken&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068'))
  .then(response => response.json())
  .then(data =>{console.dir(data.hits[0].recipe)});
}
prueba();