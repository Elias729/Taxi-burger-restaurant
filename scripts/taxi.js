const loadCategories = () => {
  const url = " https://taxi-kitchen-api.vercel.app/api/v1/categories";


  fetch(url)
    .then(res => res.json())
    .then(data => displayCategories(data.categories));
};

let cart = [];
let total = 0;

const displayCategories = (categories) => {

  const cartCategories = document.getElementById("category-container");
  cartCategories.innerHTML = "";

  for (let category of categories) {
    const categoriesCard = document.createElement('div');
    categoriesCard.innerHTML = `
         <button id="btn-ctg-${category.id}" onclick="handelLOad(${category.id})"
          class="btn btn-block bg-white hover:bg-gray-300 transition shadow-sm flex items-center gap-3 justify-start rounded-xl px-4 py-6 btn-category">
          <img src=${category.categoryImg} alt=""
            class="w-10 h-10 object-cover rounded-full border border-gray-200 shadow" />
          <span class="font-semibold text-gray-700">${category.categoryName}</span>
        </button>
        `;

    cartCategories.appendChild(categoriesCard);
  };
};

/////////////////////

const handelLOad = (id) => {

  document.getElementById("loading-spinner").classList.remove("hidden");
  document.getElementById("food-container").classList.add("hidden");


  const url = `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;

  document.querySelectorAll(".btn-category").forEach(btn => {
    btn.classList.remove("active", "bg-gradient-to-r", "from-yellow-400", "to-orange-500", "text-white", "shadow-lg", "scale-105");
    btn.classList.add("bg-white", "text-gray-700", "hover:bg-gray-100", "transition", "duration-300", "ease-in-out");
  });

  const currentBtn = document.getElementById(`btn-ctg-${id}`);
  if (currentBtn) {
    currentBtn.classList.add("active", "bg-gradient-to-r", "from-yellow-400", "to-orange-500", "text-white", "shadow-lg", "scale-105", "border-0");
    currentBtn.classList.remove("bg-white", "hover:bg-gray-100", "text-gray-700");
  };


  fetch(url)
    .then(res => res.json())
    .then(data => displayFoods(data.foods));
};

const loadRandomData = () => {
  const url = " https://taxi-kitchen-api.vercel.app/api/v1/foods/random";

  fetch(url)
    .then(res => res.json())
    .then(data => displayFoods(data.foods));
};


const displayFoods = (foods) => {
  const foodsContainer = document.getElementById("food-container");
  foodsContainer.innerHTML = "";

  for (let food of foods) {
    const foodCard = document.createElement('div');
    foodCard.innerHTML = `
              <div class="p-5 rounded-2xl shadow-2xl backdrop-blur-sm bg-black/70 border border-gray-800 transition-transform transform hover:scale-105 duration-300">
  <img onclick="loadFoodDetails(${food.id})" 
    src="${food.foodImg}" 
    alt="${food.title}" 
    class="w-full h-48 rounded-xl object-cover cursor-pointer transition-transform duration-500 hover:scale-105 food-img"
  />
  
  <div class="flex flex-col gap-3 mt-4">
    <h1 class="text-lg md:text-xl font-bold text-gray-100 truncate food-title">${food.title}</h1>
    
    <div class="inline-block bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold w-fit">
      ${food.category}
    </div>
    
    <h2 class="text-yellow-400 font-semibold text-lg md:text-xl">
      $<span class="price food-price">${food.price}</span> BDT
    </h2>
    
    <button onclick="addtoCart(this)" class="btn btn-warning w-full mt-2 flex items-center gap-2 justify-center hover:scale-105 transition-transform duration-300">
      <i class="fa-solid fa-square-plus"></i>
      Add This Item
    </button>
  </div>
</div>

        `;

    foodsContainer.appendChild(foodCard);

  };
  document.getElementById("loading-spinner").classList.add("hidden");
  document.getElementById("food-container").classList.remove("hidden");

};


// * Modal Open 

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
  
  <h2 class="text-3xl font-bold text-white mb-2">
    ${food.title}
  </h2>
  
  <p class="text-white mb-4">
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
  `;

  document.getElementById("my_modal_5").showModal();
};


// * Time update

const updateCurrentDateTime = () => {
  const now = new Date();

  const formatted = now.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + " - " +

    now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

  document.getElementById('currentDateTime').textContent = `Viewed On: ${formatted}`;
};

updateCurrentDateTime();
setInterval(updateCurrentDateTime, 1000);


loadCategories();
loadRandomData();

const addtoCart = (btn) => {
  const card = btn.parentNode.parentNode;

  const foodTitle = card.querySelector(".food-title").innerText;
  const foodImg = card.querySelector(".food-img").src;
  const foodPrice = card.querySelector(".food-price").innerText;

  const foodPriceNum = Number(foodPrice);

  // console.log(foodTitle, foodImg, foodPriceNum);

  const selectedItem = {
    id: card.length + 1,
    quantity: 1,
    foodTitle: foodTitle,
    foodImg: foodImg,
    foodPrice: foodPriceNum,
  };

  cart.push(selectedItem);

  total = total + foodPriceNum;

  displayCart(cart)
  displayTotal(total);
}

const displayTotal = (val) => {
  document.getElementById("cart-total").innerHTML = val;
};




const displayCart = (cart) => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  for (let item of cart) {
    const newItem = document.createElement("div");
    newItem.innerHTML = `
     <div class="p-1 bg-white flex gap-3 shadow rounded-xl relative">
            <div class="img">
              <span class="hidden cart-id">${item.id}</span>
              <img
                src="${item.foodImg}"
                alt=""
                class="w-[50px] rounded-xl h-[50px] object-cover"
              />
            </div>
            <div class="flex-1">
              <h1  class="text-xs font-bold food-title">
                ${item.foodTitle}
              </h1>

              <div class="">
                <h2 class="text-yellow-600 font-semibold">
                 ${item.quantity} x $ <span class="item-price">${item.foodPrice}</span> BDT
                </h2>
                
              </div>
            </div>
            <div onclick="removeCart(this)"
              class="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
    `;

    cartContainer.append(newItem);
  }
};