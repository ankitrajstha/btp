//  JavaScript code Verticle left sliding when profilecontainer div of navar is clicked
document.addEventListener("DOMContentLoaded", function () {
  const teammembers = document.getElementById("teammembers-slider");
  const profilecontainer = document.getElementById("profilecontainer");
  const dimmedBackground = document.getElementById("dimmedBackground");

  profilecontainer.addEventListener("click", function () {
    if (teammembers.style.right === "0px") {
      teammembers.style.right = "-360px"; // Slide out
      dimmedBackground.style.display = "none";
    } else {
      teammembers.style.right = "0px"; // Slide in
      dimmedBackground.style.display = "block";
    }
  });

  dimmedBackground.addEventListener("click", function () {
    teammembers.style.right = "-360px"; // Slide out
    dimmedBackground.style.display = "none";
  });
});

function changeSlide(target) {
  document
    .querySelector(".navbar-slider .selected")
    .classList.remove("selected");
  target.classList.add("selected");
}

function slider(direction) {
  const parent = document.querySelector(".navbar-slider");
  let current = parent.querySelector(".selected");
  current.classList.remove("selected");

  if (direction === "right") {
    if (!current.nextElementSibling) {
      current = parent.firstElementChild;
      current.classList.add("selected");
      current.scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });
    } else {
      current.nextElementSibling.classList.add("selected");
      current.nextElementSibling.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  } else {
    if (!current.previousElementSibling) {
      current = parent.lastElementChild;
      current.classList.add("selected");
      current.scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });
    } else {
      current.previousElementSibling.classList.add("selected");
      current.previousElementSibling.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }
}

//adding list
document.addEventListener("DOMContentLoaded", function () {
  const membersList = document.querySelector(".members-list");

  for (let i = 0; i <= 7; i++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <div><img src="assets/profile.png" alt="Member Image"></div> 
            <div class="nav-slider-name">
                <p>John Doe</p>
                <span>Associate Project Manager</span>
            </div>
        `;
    membersList.appendChild(listItem);
  }
});
