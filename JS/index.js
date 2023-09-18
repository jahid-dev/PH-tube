const apiHandling = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const suggestionContainer = document.getElementById("suggestion-container");

  const suggestData = data.data;
  suggestData.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="tabs  tabs-boxed">      
  <button onclick="handlingApiContent('${element.category_id}')" class="tab text-black hover:text-white hover:bg-[#FF1F3D] ">${element.category}</button>          
  </div>

    `;
    suggestionContainer.appendChild(div);
  });
};

const handlingApiContent = async (elementID) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${elementID}`
  );
  const data = await res.json();
  const vContent = data.data;
  main = vContent;

  contentDisplay(vContent);
};

const contentDisplay = (vContent) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  const noContent = document.getElementById("no-content");
  noContent.innerHTML = "";

  if (vContent.length !== 0) {
    vContent.forEach((video) => {
      const second = video.others.posted_date;
      const hours = Math.floor(second / 3600);
      const minutes = Math.floor((second - hours * 3600) / 60);

      const div = document.createElement("span");

      div.innerHTML = `
      
      <div class="grid justify-center">
      <figure>
          <div class = "relative">
          <img class="w-72 mb-3  rounded-md h-44"  src=${
            video.thumbnail ? video.thumbnail : "image not found"
          } alt="Loading...." />
          
          <div class="absolute right-0 bottom-0 text-white mr-2 mb-2 p-1">       
          <p class="bg-[#171717] px-2 rounded-md">${
            video.others.posted_date
              ? hours + "hrs " + minutes + "mins ago"
              : ""
          } </p>
      </div>
          </div>      
      </figure>  
       <div class="flex mt-3 mb-10 gap-2">
       <div class="flex ">
       <img class="w-8 h-8 rounded-full"  src=${
         video.authors[0].profile_picture
       } alt="Loading...." />
       </div>
       <div class="flex flex-col">
       <h2 class="text-xl font-bold">${video.title}</h2>
       <h2 class="">${video.authors[0].profile_name}<span></span></h2>
       <div class="flex gap-2">
       <h2>${video.others.views} views</h2>
       <p>${
         video.authors[0].verified
           ? '<img class="w-4 mt-1.5" src="Images/verified.png" alt="">'
           : ""
       }
       </p>
       </div>
       </div>
       </div>
      </div>
      </div>
      `;

      cardContainer.appendChild(div);
    });
  } else {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="mt-10">
    <img class="text-center mx-auto " src="Images/icon.png" />
    <h3 class="font-bold text-center text-4xl">Oops!! Sorry, There is no<br> content here</h3>
    </div>
      `;
    noContent.appendChild(div);
  }
};

const sortView = () => {
  const sortedData = main.sort((a, b) => {
    const number1 = parseInt(a.others.views);
    const number2 = parseInt(b.others.views);
    return number2 - number1;
  });
  contentDisplay(sortedData);
};

handlingApiContent("1000");
apiHandling();
