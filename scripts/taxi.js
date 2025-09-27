const loadCategories = () => {
    const url = " https://taxi-kitchen-api.vercel.app/api/v1/categories";

    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.categories));
};

const handelLOad = (id) => {
    const url = `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoods(data.foods));
}

const loadRandomData = () => {
    const url = " https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoods(data.foods));
}

/* Modal Open  */

const loadFoodDetails = (id) => {
    const url = `https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => displayDetails(data.details));
};

const displayDetails = (food) => {
    const detailsContainer = document.getElementById("details_container");
    detailsContainer.innerHTML = "";

    const ecode = food.video.split("v=")[1] || food.video.split("/").pop();
    console.log("Video code:", ecode);

    detailsContainer.innerHTML = `
   <img src="${food.foodImg}" 
       alt="${food.title}" 
       class="w-full h-64 object-cover rounded-xl mb-6 shadow-md">
  
  <h2 class="text-3xl font-bold text-gray-900 mb-2">
    ${food.title}
  </h2>
  
  <p class="text-gray-600 mb-4">
    Category: <span class="font-semibold">${food.category}</span> | 
    Origin: <span class="font-semibold">${food.area}</span>
  </p>
  
  <p class="text-xl font-semibold text-indigo-600 mb-6">
    Price: $${food.price}
  </p>

  <div class="aspect-video rounded-xl overflow-hidden shadow-lg mb-6">
    <iframe 
      src="https://www.youtube.com/embed/${food.video.split("v=")[1]}"
      class="w-full h-full"
      allowfullscreen>
    </iframe>
  </div>

  <p class="text-sm text-gray-500">
  Published: ${food.send_at ? new Date(food.send_at).toLocaleDateString() : "N/A"}
</p>

  `;

    document.getElementById("my_modal_5").showModal();
};


const displayFoods = (foods) => {
    const foodsContainer = document.getElementById("food-container");
    foodsContainer.innerHTML = "";

    for (let food of foods) {
        const foodCard = document.createElement('div');
        foodCard.innerHTML = `
                <div onclick="loadFoodDetails(${food.id})" class="p-5 bg-white flex flex-col gap-4 shadow-md rounded-2xl transition hover:shadow-lg">
          <img src=${food.foodImg} alt=""
            class="w-full rounded-xl h-48 object-cover" />
          <div class="flex flex-col gap-2">
            <h1 class="text-lg font-bold">${food.title} </h1>
            <div class="badge badge-warning w-fit">${food.category}</div>
            <h2 class="text-yellow-600 font-semibold text-lg">
              $ <span class="price">${food.price}</span> BDT
            </h2>
            <button class="btn btn-warning w-full mt-2 flex items-center gap-2 justify-center">
              <i class="fa-solid fa-square-plus"></i>
              Add This Item
            </button>
          </div>
        </div>
        `;

        foodsContainer.appendChild(foodCard);

    }

}

const displayCategories = (categories) => {

    const cartCategories = document.getElementById("category-container");
    cartCategories.innerHTML = "";

    for (let category of categories) {
        const categoriesCard = document.createElement('div');
        categoriesCard.innerHTML = `
         <button onclick="handelLOad(${category.id})"
          class="btn btn-block bg-white hover:bg-yellow-100 transition shadow-sm flex items-center gap-3 justify-start rounded-xl px-4 py-6">
          <img src=${category.categoryImg} alt=""
            class="w-10 h-10 object-cover rounded-full border border-gray-200 shadow" />
          <span class="font-semibold text-gray-700">${category.categoryName}</span>
        </button>
        `;

        cartCategories.appendChild(categoriesCard);
    };

};

loadCategories();
loadRandomData();