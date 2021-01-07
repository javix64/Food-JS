//arr addEventListener;
let arrListener=[];
const arrSection=['paleo','vegan','low-sugar'];
function main(){  
  const urlPaleo = 'https://api.edamam.com/search?q=chicken&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=paleo';
  const urlVegan = 'https://api.edamam.com/search?q=broccoli&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=vegan';
  const urlLowSugar= 'https://api.edamam.com/search?q=tomato&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068&Health=low-sugar';
  const arrUrl=[urlPaleo,urlVegan,urlLowSugar];
  
  for (let j = 0; j < 3; j++) {
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
        const calories=Math.round(hits[i].recipe.calories * 10)/10;
        p.innerText=calories +" Kcal";
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

      for (let a = 0; a < 3; a++) {
        let kind=['modal-paleo','modal-vegan','modal-lowSugar'];
        
        for (let i = 0; i < 10; i++) {
          //creating modal
          
          
          let modal=document.createElement('div');
          modal.setAttribute('class','modal');
          
          modal.setAttribute('id',kind[a]+i);
          let modalContent= document.createElement('div');
          modalContent.setAttribute('class','modal-content');
          let close=document.createElement('span');
          close.setAttribute('class','close');
          close.innerHTML="&times;";
          let container= document.createElement('div');
          container.setAttribute('class','container');
  
          //title
          let titleRecipe=document.createElement('h2');
          titleRecipe.innerText=data.hits[i].recipe.label;
  
          //image
          let imageRecipe=document.createElement('img');
          imageRecipe.setAttribute('src',data.hits[i].recipe.image);
  
          // Time, calories, weight
          let pTime = document.createElement('p');
          let pCalories = document.createElement('p');
          let pWeight = document.createElement('p');
          pTime.innerText="Total time: "+round(data.hits[i].recipe.totalTime);
          pCalories.innerText="Calories: "+round(data.hits[i].recipe.calories);
          pWeight.innerText="Weight: " + round(data.hits[i].recipe.totalWeight);
          
          //ingredients
          let liIngredient;
          let ulIngredients = document.createElement('ul');
          ulIngredients.setAttribute('class','ingredients');
          let arrIngredients=[];
          for (const j of data.hits[i].recipe.ingredients) {
            arrIngredients.push(j);
          }
          let h3Ingredient= document.createElement('h3');
          h3Ingredient.innerText="Ingredients";
          ulIngredients.append(h3Ingredient);
          
          for (let b = 0; b < arrIngredients.length; b++) {
            liIngredient = document.createElement('li');
            liIngredient.innerText=arrIngredients[b].text;
            ulIngredients.append(liIngredient);
          }
  
          //Diet labels
          let divDietLabels= document.createElement('div');
          divDietLabels.setAttribute('class','diet-labels');
          let liDietLabels;
          let ulDietLabels = document.createElement('ul');
          let arrDietLabels=[];
  
          for (const j of data.hits[i].recipe.dietLabels) {
            arrDietLabels.push(j);
          }        
          let h3DietLabels= document.createElement('h3');
          h3DietLabels.innerText="Diet labels";
          ulDietLabels.append(h3DietLabels);
  
          for (let b = 0; b < arrDietLabels.length; b++) {
            liDietLabels = document.createElement('li');
            liDietLabels.innerText=arrDietLabels[b];
            ulDietLabels.append(liDietLabels);
          }
  
          //Health labels;
          let divHealthLabels= document.createElement('div');
          divHealthLabels.setAttribute('class','health-labels');
          let liHealthLabels;
          let ulHealthLabels = document.createElement('ul');
          let arrHealthLabels=[];
  
          for (const j of data.hits[i].recipe.healthLabels) {
            arrHealthLabels.push(j);
          }
          let h3HealthLabels= document.createElement('h3');
          h3HealthLabels.innerText="Health labels";
          ulHealthLabels.append(h3HealthLabels);
  
          for (let b = 0; b < arrHealthLabels.length; b++) {
            liHealthLabels = document.createElement('li');
            liHealthLabels.innerText=arrHealthLabels[b];
            ulHealthLabels.append(liHealthLabels);
          }
          //appending to modal
          document.body.append(modal);
          modal.append(modalContent);
          modalContent.append(close);
          modalContent.append(container);
  
          container.append(titleRecipe);
          container.append(imageRecipe);
          container.append(pTime);
          container.append(pCalories);
          container.append(pWeight);
  
          container.append(ulIngredients);
          container.append(ul);
  
          divDietLabels.append(ulDietLabels);
          container.append(divDietLabels);
  
          divHealthLabels.append(ulHealthLabels);
          container.append(divHealthLabels);
  
          //adding events open and close
          document.getElementById(arrSection[a]+i).addEventListener('click',function() {document.getElementById(kind[a]+i).style.display = "block";});
          document.getElementsByClassName("close")[i].onclick = function() {document.getElementById(kind[a]+i).style.display = "none";};
          window.addEventListener('click',
          function(e){if(e.target==document.getElementById(kind[a]+i)){document.getElementById(kind[a]+i).style.display='none'}});
          document.addEventListener("keydown", function(event) {if (event.key === "Escape") {document.getElementById(kind[a]+i).style.display="none";}});
  
        }
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
        const calories=Math.round(hits[i].recipe.calories * 10)/10;
        p.innerText=calories +" Kcal";
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
        let container= document.createElement('div');
        container.setAttribute('class','container');

        //title
        let titleRecipe=document.createElement('h2');
        titleRecipe.innerText=data.hits[i].recipe.label;

        //image
        let imageRecipe=document.createElement('img');
        imageRecipe.setAttribute('src',data.hits[i].recipe.image);

        // Time, calories, weight
        let pTime = document.createElement('p');
        let pCalories = document.createElement('p');
        let pWeight = document.createElement('p');
        pTime.innerText="Total time: "+round(data.hits[i].recipe.totalTime);
        pCalories.innerText="Calories: "+round(data.hits[i].recipe.calories);
        pWeight.innerText="Weight: " + round(data.hits[i].recipe.totalWeight);
        
        //ingredients
        let liIngredient;
        let ulIngredients = document.createElement('ul');
        ulIngredients.setAttribute('class','ingredients');
        let arrIngredients=[];
        for (const j of data.hits[i].recipe.ingredients) {
          arrIngredients.push(j);
        }
        let h3Ingredient= document.createElement('h3');
        h3Ingredient.innerText="Ingredients";
        ulIngredients.append(h3Ingredient);
        
        for (let b = 0; b < arrIngredients.length; b++) {
          liIngredient = document.createElement('li');
          liIngredient.innerText=arrIngredients[b].text;
          ulIngredients.append(liIngredient);
        }

        //Diet labels
        let divDietLabels= document.createElement('div');
        divDietLabels.setAttribute('class','diet-labels');
        let liDietLabels;
        let ulDietLabels = document.createElement('ul');
        let arrDietLabels=[];

        for (const j of data.hits[i].recipe.dietLabels) {
          arrDietLabels.push(j);
        }        
        let h3DietLabels= document.createElement('h3');
        h3DietLabels.innerText="Diet labels";
        ulDietLabels.append(h3DietLabels);

        for (let b = 0; b < arrDietLabels.length; b++) {
          liDietLabels = document.createElement('li');
          liDietLabels.innerText=arrDietLabels[b];
          ulDietLabels.append(liDietLabels);
        }

        //Health labels;
        let divHealthLabels= document.createElement('div');
        divHealthLabels.setAttribute('class','health-labels');
        let liHealthLabels;
        let ulHealthLabels = document.createElement('ul');
        let arrHealthLabels=[];

        for (const j of data.hits[i].recipe.healthLabels) {
          arrHealthLabels.push(j);
        }        
        let h3HealthLabels= document.createElement('h3');
        h3HealthLabels.innerText="Health labels";
        ulHealthLabels.append(h3HealthLabels);

        for (let b = 0; b < arrHealthLabels.length; b++) {
          liHealthLabels = document.createElement('li');
          liHealthLabels.innerText=arrHealthLabels[b];
          ulHealthLabels.append(liHealthLabels);
        }

        //total Daily and total Nutrients
        /*
        let divtotalDaily= document.createElement('div');
        divtotalDaily.setAttribute('class','total-daily');
        let litotalDaily;
        let ultotalDaily = document.createElement('ul');
        let arrtotalDaily=[];
        console.log(data.hits[i].recipe.totalDaily[0]);
        let nutrients= ['ENERC_KCAL', 'SUGAR', 'FAT' ,'FASAT', 'CA', 'MG', 'NA', 'K']
        let dailyNutrients=[];
        for (let i = 0; i < nutrients.length; i++) {
          dailyNutrients.push('data.hits[i].recipe.totalDaily.'+nutrients[i]);
        }
        for (const j of dailyNutrients) {
          arrtotalDaily.push(j);
        }
        console.log(arrtotalDaily);
        let h3totalDaily= document.createElement('h3');
        h3totalDaily.innerText="Health labels";
        ultotalDaily.append(h3totalDaily);

        for (let b = 0; b < arrtotalDaily.length; b++) {
          litotalDaily = document.createElement('li');
          litotalDaily.innerText=arrtotalDaily[b].label+round(arrtotalDaily[b].quantity)+arrtotalDaily[b].unit;
          ultotalDaily.append(litotalDaily);
        }
          */

        //appending to modal
        document.body.append(modal);
        modal.append(modalContent);
        modalContent.append(close);
        modalContent.append(container);

        container.append(titleRecipe);
        container.append(imageRecipe);
        container.append(pTime);
        container.append(pCalories);
        container.append(pWeight);

        container.append(ulIngredients);
        container.append(ul);

        divDietLabels.append(ulDietLabels);
        container.append(divDietLabels);

        divHealthLabels.append(ulHealthLabels);
        container.append(divHealthLabels);

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

main();

//function to round the decimals.
function round(p){
  return Math.round(p * 10)/10;
}

const searchIt=document.getElementsByTagName('input')[0];
searchIt.addEventListener('keypress',function(e){if(e.key==='Enter'){search(searchIt.value)}});
const button=document.getElementsByTagName('button')[0];
button.addEventListener('click',function(){search(searchIt.value)});
