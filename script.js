//  JavaScript code Verticle left sliding

//when profilecontainer div of navar is clicked
document.addEventListener('DOMContentLoaded', function () {
    const teammembers = document.getElementById('teammembers-slider');
    const profilecontainer = document.getElementById('profilecontainer');
    const dimmedBackground = document.getElementById('dimmedBackground');

    profilecontainer.addEventListener('click', function () {
        if (teammembers.style.right === '0px') {
            teammembers.style.right = '-360px'; // Slide out
            dimmedBackground.style.display = 'none';
        } else {
            teammembers.style.right = '0px'; // Slide in
            dimmedBackground.style.display = 'block';
        }
    });

    dimmedBackground.addEventListener('click', function() {
        teammembers.style.right = '-360px'; // Slide out
        dimmedBackground.style.display = 'none';
    });
});



function changeSlide(index) {
    const items = document.querySelectorAll('.nav-slider-item');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// when < button is clicked
function slideLeft(index) {
    const items = document.querySelectorAll('.nav-slider-item');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });

}
//when > button is clicked
function slideRight(index) {
    const items = document.querySelectorAll('.nav-slider-item');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

//adding list
document.addEventListener('DOMContentLoaded', function () {
    const membersList = document.querySelector('.members-list');

    // Loop to add 10 list items
    for (let i = 0; i <= 7; i++) {
        const listItem = document.createElement('li');
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
