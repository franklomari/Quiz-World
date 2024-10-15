document.addEventListener("DOMContentLoaded", () => {
  const welcomeSection = document.querySelector(".Welcome-section");
  const nextBtn = document.getElementById("nextBtn");

  window.onload = function () {
    let loader = document.querySelector(".loader");
    let loaderContainer = document.querySelector(".loader-container");
    welcomeSection.style.display = "none";
    loader.classList.add("loader");

    setTimeout(function () {
      loader.style.display = "none";
      loaderContainer.style.display = "none";
      welcomeSection.style.display = "block";
    }, 3000);
  };

  nextBtn.addEventListener("click", () => {
    window.location.href = "Quiz_setup.html";
  });
});
