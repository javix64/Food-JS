function main(){  
  const urlPaleo = 'https://api.edamam.com/search?q=chicken&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=paleo';
  const urlVegan = 'https://api.edamam.com/search?q=broccoli&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=vegan';
  const urlLowSugar= 'https://api.edamam.com/search?q=tomato&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=low-sugar';
  const arrUrl=[urlPaleo,urlVegan,urlLowSugar];
  const arrSection=['paleo','vegan','low-sugar']
  for (let i = 0; i < 3; i++) {
    const requestAll = new Request(arrUrl[i],{method: 'GET'});
    fetch(requestAll)
    .then( response => response.json() )
    .then( data => {
      console.dir(data.hits);
      let hits=data.hits;
      let article;
      let p;
      let a;
      let img;
      let ul;
      let li;
      let h2;
      let section = document.getElementById(arrSection[i]);
      for (let i = 0; i < hits.length; i++) {
        //creating html
        article = document.createElement('article');
        p = document.createElement('p');
        a= document.createElement('a');
        img = document.createElement('img');
        ul = document.createElement('ul');
        h2 = document.createElement('h2');
        //appending data to html
        h2.innerText=hits[i].recipe.label;
        p.innerText=hits[i].recipe.calories;
        img.setAttribute('src',hits[i].recipe.image);
        a.setAttribute('href',hits[i].recipe.url);
        for (let i = 0; i < hits[i].recipe.ingredients.length; i++) {
          li = document.createElement('li');
          li.innerText= hits[i].recipe.ingredients[i].text
          ul.append(li);
        }
        article.append(h2);
        article.append(p);
        a.append(img);
        article.append(a);
        article.append(ul);
        //append to correctly section.
        section.append(article);
      }//end then call
    
    })
    .catch( e => console.error( 'Something went wrong' ) );
    function getData(){

    }

  }

    
  
}
main();
function search(param){
  let url = `https://api.edamam.com/search?q=${param}&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=paleo`;
  params = {
    method: 'GET'
  };
  var request = new Request( url, params );
  //we do the request with fetch
  fetch( request )
    //this is the promise, if promise is correct, it gives me a response JSON
    .then( response => response.json() )
    // it gives me the data in format JSON
    .then( data => {
      //tengo que borrar las sections y poner la section de busqueda o 'resultados'
      console.dir( data.hits );
    } )
    .catch( e => console.error( 'Something went wrong' ) );
}//end search


const searchIt=document.getElementsByTagName('input')[0];
searchIt.addEventListener('keypress',function(e){if(e.key==='Enter'){search(searchIt.value)}});
const button=document.getElementsByTagName('button')[0];
button.addEventListener('click',function(){search(searchIt.value)})