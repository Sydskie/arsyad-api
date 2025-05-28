// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Modal functionality with Tailwind classes
function openModal() {
  document.getElementById("movie-modal").classList.remove("hidden");
}

function closeModalFunction() {
  document.getElementById("movie-modal").classList.add("hidden");
}

document
  .getElementById("close-modal-btn")
  .addEventListener("click", closeModalFunction);
document
  .getElementById("close-modal")
  .addEventListener("click", closeModalFunction);

// Close modal when clicking outside
document.getElementById("movie-modal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("movie-modal")) {
    closeModalFunction();
  }
});

// Movie search functions
function searchMovie() {
  $("#movie-list").html("");
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "28daa94",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;

        $.each(movies, function (i, data) {
          $("#movie-list").append(`
            <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div class="aspect-w-2 aspect-h-3">
                <img src="${data.Poster}" class="w-full h-80 object-cover" alt="${data.Title}">
              </div>
              <div class="p-4">
                <h5 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">${data.Title}</h5>
                <p class="text-sm text-gray-600 mb-3">${data.Year}</p>
                <button class="see-detail w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500" data-id="${data.imdbID}">
                  See Details
                </button>
              </div>
            </div>
          `);
        });

        $("#search-input").val("");
      } else {
        $("#movie-list").html(`
          <div class="col-span-full">
            <div class="text-center py-12">
              <div class="text-6xl text-gray-400 mb-4">🎬</div>
              <h1 class="text-2xl font-semibold text-gray-700 mb-2">Movie Not Found</h1>
              <p class="text-gray-500">${result.Error}</p>
            </div>
          </div>
        `);
      }
    },
  });
}

$("#search-button").on("click", function () {
  searchMovie();
});

$("#search-input").on("keyup", function (e) {
  if (e.which === 13) {
    searchMovie();
  }
});

$("#movie-list").on("click", ".see-detail", function () {
  openModal();

  $.ajax({
    url: "http://www.omdbapi.com",
    dataType: "json",
    type: "get",
    data: {
      apikey: "28daa94",
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $("#modal-body").html(`
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex justify-center">
              <img src="${
                movie.Poster
              }" class="rounded-lg shadow-md max-w-full h-auto" alt="${
          movie.Title
        }">
            </div>
            
            <div class="space-y-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-2xl font-bold text-gray-800 mb-4">${
                  movie.Title
                }</h3>
                
                <div class="space-y-3">
                  <div class="flex items-start">
                    <span class="inline-block w-20 text-sm font-medium text-gray-600">Released:</span>
                    <span class="text-sm text-gray-800">${movie.Released}</span>
                  </div>
                  
                  <div class="flex items-start">
                    <span class="inline-block w-20 text-sm font-medium text-gray-600">Genre:</span>
                    <span class="text-sm text-gray-800">${movie.Genre}</span>
                  </div>
                  
                  <div class="flex items-start">
                    <span class="inline-block w-20 text-sm font-medium text-gray-600">Director:</span>
                    <span class="text-sm text-gray-800">${movie.Director}</span>
                  </div>
                  
                  <div class="flex items-start">
                    <span class="inline-block w-20 text-sm font-medium text-gray-600">Actors:</span>
                    <span class="text-sm text-gray-800">${movie.Actors}</span>
                  </div>
                  
                  ${
                    movie.Plot
                      ? `
                  <div class="pt-2 border-t border-gray-200">
                    <span class="block text-sm font-medium text-gray-600 mb-2">Plot:</span>
                    <p class="text-sm text-gray-700 leading-relaxed">${movie.Plot}</p>
                  </div>
                  `
                      : ""
                  }
                  
                  ${
                    movie.imdbRating !== "N/A"
                      ? `
                  <div class="flex items-center pt-2">
                    <span class="text-sm font-medium text-gray-600 mr-2">IMDB Rating:</span>
                    <div class="flex items-center">
                      <span class="text-lg font-bold text-yellow-500">${movie.imdbRating}</span>
                      <span class="text-sm text-gray-500 ml-1">/10</span>
                    </div>
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>
          </div>
        `);
      }
    },
  });
});
