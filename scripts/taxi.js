const loadCategories = () => {
    const url = " https://taxi-kitchen-api.vercel.app/api/v1/categories";

    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.categories));
};

const displayCategories = (categories) => {
    console.log(categories);

    const cartCategories = document.getElementById("category-container");
    cartCategories.innerHTML = "";

    for (let category of categories) {
        const categoriesCard = document.createElement('div');
        categoriesCard.innerHTML = `
         <button
          class="btn btn-block bg-white hover:bg-yellow-100 transition shadow-sm flex items-center gap-3 justify-start rounded-xl px-4 py-6">
          <img src=${category.categoryImg} alt=""
            class="w-10 h-10 object-cover rounded-full border border-gray-200 shadow" />
          <span class="font-semibold text-gray-700">${category.categoryName}</span>
        </button>
        `;

        cartCategories.appendChild(categoriesCard);
    };

};

loadCategories()