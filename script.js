var recipeContainer = document.getElementById("recipeContainer");
var searchInput = document.getElementById("searchInput");
var allRecipes = [];

function loadRecipes(){
  fetch("https://dummyjson.com/recipes?limit=110&skip=0")
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      console.log("Got recipes from API:", json);
      allRecipes = json.recipes || [];
      showRecipes(allRecipes);           
    })
    .catch(function(e){
    });
}

function showRecipes(recipeList){
  recipeContainer.innerHTML = "";

  if (!recipeList=== 0){
    recipeContainer.innerHTML = "<p>No recipes matches.</p>";
    return;
  }

  for (var i=0;i<recipeList.length;i++){
    var rec = recipeList[i];
    var imgUrl = rec.image ? rec.image : "https://via.placeholder.com/250x180?text=No+Image";

    var cardEl = document.createElement("div");
    cardEl.className = "recipe-card";

    var mealTxt = "";
    if(rec.mealType&&rec.mealType.length>0){
      mealTxt = rec.mealType.join(", ");
    }

    cardEl.innerHTML =
      '<img src="' + imgUrl + '" alt="' + rec.name + '" ' +
      'onerror="this.src=\'https://via.placeholder.com/250x180?text=No+Image\'">' +
      '<div class="content">' +
      "<h3>" + rec.name + "</h3>" +
      "<p><strong>Cuisine:</strong> " + (rec.cuisine || "N/A") + "</p>" +
      "<p><strong>Calories:</strong> " + (rec.caloriesPerServing || "N/A") + "</p>" +
      "<p class='rating'>Rating: " + (rec.rating || "N/A") + " ⭐ (" + (rec.reviewCount || 0) + " reviews)</p>" +
      (mealTxt ? "<p class='mealType'>" + mealTxt + "</p>" : "") +
      "</div>";
    recipeContainer.appendChild(cardEl);
  }
}

function searchRecipes(){
  var query = searchInput.value.toLowerCase();
  var matches = [];

  if (query === ""){
    showRecipes(allRecipes);
    return;
  }

  for (var i=0;i<allRecipes.length;i++){
    var rcp = allRecipes[i];
    var match = false;

    if (rcp.name&&rcp.name.toLowerCase().indexOf(query) !== -1){
      match = true;
    }
    else if (rcp.cuisine&&rcp.cuisine.toLowerCase().indexOf(query) !== -1){
      match = true;
    }
    else if (rcp.mealType){
      for (var m = 0; m < rcp.mealType.length; m++){
        if (rcp.mealType[m].toLowerCase().indexOf(query) !== -1){
          match = true;
          break;
        }
      }
    }
    if (match){
      matches.push(rcp);
    }
  }
  showRecipes(matches);
}

searchInput.addEventListener("input", searchRecipes);
loadRecipes();
