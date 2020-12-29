/**
<article>
  <h2>Name</h2>
  <p>Calories</p>
  <img src="" alt="FOTO"> <br>
  <ul>
    <li>ingrediente1</li>
    <li>ingrediente2</li>
  </ul>
</article>
 */
class Recipe{
  constructor(url){
    this.url=url;
    this.dataJson;
    this.response;
    fetch(new Request(this.url,{method: 'GET'}))
    .then( response => response.json())
    .then( data => {this.dataJson=data;
    console.log('datos'+data);
    console.log(this.dataJson);
  
  } )
    .catch( e => console.error( 'Something went wrong' ) );
  }
  getData(){
    console.log(this.dataJson);
  }
  
}
const pa= new Recipe('https://api.edamam.com/search?q=potato&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=paleo');
pa.getData();
function main(){
  const article = document.createElement('article');
  const p = document.createElement('p');
  const img = document.createElement('img');
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  const urlPaleo = 'https://api.edamam.com/search?q=chicken&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=paleo';
  const urlVegan = 'https://api.edamam.com/search?q=chicken&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=vegan';
  const urlLowSugar= 'https://api.edamam.com/search?q=chicken&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=low-sugar';
  const arrUrl=[urlPaleo,urlVegan,urlLowSugar];
  for (let i = 0; i < arrUrl.length; i++) {
    const requestAll = new Request(arrUrl, params);
    fetch(requestAll)
    .then( response => response.json() )
    .then( data => {

    })
    .catch( e => console.error( 'Something went wrong' ) );
  }
  
    
  /**
   * <!-- 
        name -- hits[i].recipe.label
        calories -- hits[i].recipe.calories
        ingredientes -- hits[i].recipe.ingredients[i].text
        image -- hits[i].recipe.image
        url -- hits[i].recipe.url
        -->
   */
}


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
    .then( data => console.dir( data ) )
    .catch( e => console.error( 'Something went wrong' ) );
    
}//end search




const searchIt=document.getElementsByTagName('input')[0];
searchIt.addEventListener('keypress',function(e){if(e.key==='Enter'){search(searchIt.value)}});
const button=document.getElementsByTagName('button')[0];
button.addEventListener('click',function(){search(searchIt.value)})