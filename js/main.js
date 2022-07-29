var data=[];
getRecipes('pizza');

var links=document.querySelectorAll('.navbar .nav-link');
for(var i=0;i<links.length;i++)
{
    links[i].addEventListener('click',function(e)
    {
        var currentMeal=e.target.text;
        getRecipes(currentMeal)
    })
}



function getRecipes(meal)
 {
    var httpRequest=new XMLHttpRequest();
httpRequest.open('GET',`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
httpRequest.send();
httpRequest.addEventListener('readystatechange',function()
{
    if(httpRequest.readyState==4)
    {
      data=JSON.parse(httpRequest.response).recipes
      display()
    }
})

}


function display()
{
    var box=``;
    for(var i=0;i<data.length;i++)
    {
        box+=`
        <div class="col-md-3 my-3">
        <div class="recipe">
             <img src=${data[i].image_url} class='w-100 recipe-img'>
             <h4 class='my-2'>${data[i].title}</h4>
             <a href=${data[i].source_url} target="_blank"  class="btn btn-info text-white">Source</a>
             <button onclick='getRecipesDetails(${data[i].recipe_id})' data-bs-toggle="modal" data-bs-target="#exampleModal" class='btn btn-warning text-white'>Details</button>
        </div>
    </div>
        `
    }
    document.getElementById('rowData').innerHTML=box;
}

var Details;
async function getRecipesDetails(recipe_id)
{
    var response=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipe_id}`);
    Details=await response.json();
    displayDetails();
}


function displayDetails()
{
   var recipeDetailsData=`
     <img src=${Details.recipe.image_url} class='w-100 recipe-img'>
     <h4>${Details.recipe.title}</h4>
   `
document.getElementById('bodyDetail').innerHTML=recipeDetailsData;
}