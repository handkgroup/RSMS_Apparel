document.addEventListener("DOMContentLoaded", function() {

    var signupLink = document.querySelector(".signuppage a");
    var popup = document.getElementById("signup-popup");
    var closePopupButton = document.querySelector(".close-popup");
    var closeButton = document.querySelector(".signuppage button");
    var signupPage = document.querySelector(".signuppage");

    if (signupLink && popup && closePopupButton && closeButton && signupPage) {
        signupLink.addEventListener("click", function(event) {
            event.preventDefault();
            popup.style.display = "flex";
        });

        closePopupButton.addEventListener("click", function() {
            popup.style.display = "none";
        });

        window.addEventListener("click", function(event) {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });

        closeButton.addEventListener("click", function() {
            signupPage.style.display = "none";
        });
    } else {
        console.error('One or more signup elements not found.');
    }

    const signInBtn = document.getElementById("signIn");
    const signUpBtn = document.getElementById("signUp");
    const container = document.querySelector(".container");

    if (signInBtn && signUpBtn && container) {
        signInBtn.addEventListener("click", () => {
            container.classList.remove("right-panel-active");
        });

        signUpBtn.addEventListener("click", () => {
            container.classList.add("right-panel-active");
        });
    } else {
        console.error('Sign in/sign up elements or container not found.');
    }


    const slides = document.querySelectorAll('.right-slide');
    const slider = document.querySelector('.right-slider');
    const timerInner = document.querySelector('.timer-inner');
    const slideCount = slides.length;
    const intervalTime = 3000; 
    const timerDuration = 3000; 

    let currentIndex = 0;
    let timer;

    if (slider && timerInner) {
        function showNextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function startTimer() {
            clearInterval(timer);
            timer = setInterval(() => {
                showNextSlide();
                resetTimer();
            }, intervalTime);
        }

        function resetTimer() {
            timerInner.style.transition = 'none'; 
            timerInner.style.width = '0%'; 
            
            void timerInner.offsetWidth; 
            timerInner.style.transition = `width ${timerDuration}ms linear`; 
            timerInner.style.width = '100%'; 
        }

        function startSlider() {
            startTimer(); 
        }

        startSlider();
    } else {
        console.error('Slider or timer elements not found.');
    }

   
    const names = Array(10).fill("Alex K.");
    const ratings = Array(10).fill(5);
    const reviews = Array(10).fill("Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and styles.");

    function createStars(rating) {
        let stars = '';
        for (let i = 0; i < rating; i++) {
            stars += '★';
        }
        return stars;
    }

    function generateReviewHTML(name, rating, review) {
        return `
            <div class="slide">
                <div class="stars"><p>${createStars(rating)}</p></div>
                <div><strong>${name}</strong></div>
                <div><h5>${review}</h5></div>
            </div>
        `;
    }

    const reviewSlider = document.getElementById('reviewSlider');
    if (reviewSlider) {
        names.forEach((name, index) => {
            const rating = ratings[index];
            const review = reviews[index];
            reviewSlider.innerHTML += generateReviewHTML(name, rating, review);
        });

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                reviewSlider.scrollBy({ left: -300, behavior: 'smooth' });
            });

            nextBtn.addEventListener('click', () => {
                reviewSlider.scrollBy({ left: 300, behavior: 'smooth' });
            });
        } else {
            console.error('Previous/Next buttons not found.');
        }
    } else {
        console.error('Review slider not found.');
    }
});

function togglePopup() {
    document.getElementById("popup-1").classList.toggle("active");
}

document.querySelectorAll('.dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const submenu = this.nextElementSibling;
        const isVisible = submenu.style.display === 'block';
        document.querySelectorAll('.main-dropdown-menu').forEach(menu => menu.style.display = 'none');
        submenu.style.display = isVisible ? 'none' : 'block';

        
        const arrow = this.querySelector('.arrow');
        if (arrow) {
            arrow.style.transform = submenu.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';
        }
        
       
        this.classList.toggle('active');
    });
});

document.querySelectorAll('.submenu-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const submenu = this.nextElementSibling;
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        
        
        const arrow = this.querySelector('.arrow');
        if (arrow) {
            arrow.style.transform = submenu.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';
        }
        
        
        this.classList.toggle('active');
    });
});


document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav_bar')) {
        document.querySelectorAll('.main-dropdown-menu, .submenu-dropdown-menu').forEach(menu => menu.style.display = 'none');
    }
});
const searchInput = document.getElementById('search');
const clearBtn = document.getElementById('clear-btn');


function updateClearButton() {
    if (searchInput.value || document.activeElement === searchInput) {
        clearBtn.style.display = 'block'; 
    } else {
        clearBtn.style.display = 'none'; 
    }
}


searchInput.addEventListener('input', updateClearButton); 
searchInput.addEventListener('focus', updateClearButton); 


clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    updateClearButton(); 
    searchInput.focus(); 
});


document.addEventListener('click', function(event) {
    if (event.target !== searchInput) {
        updateClearButton();
    }
});

// Function to handle tab switching
function openPage(pageName, elmnt, color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
        tablinks[i].classList.remove('active');
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.classList.add('active');
}

// Initialize and render reviews
document.addEventListener('DOMContentLoaded', function() {
    const reviews = [
        { author: "Alex K.", rating: "★★★★★", text: "Great product!", date: getRandomDate(-30) },
        { author: "Jamie L.", rating: "★★★★", text: "Good quality, but delivery was slow.", date: getRandomDate(-10) },
        { author: "Chris M.", rating: "★★★", text: "Average experience.", date: getRandomDate(-7) },
        { author: "Taylor R.", rating: "★★★★★", text: "Exceeded my expectations!", date: getRandomDate(-60) },
        { author: "Morgan T.", rating: "★★★★", text: "Very satisfied with the purchase.", date: getRandomDate(-90) },
        { author: "Jordan S.", rating: "★★★", text: "Product is fine but packaging was poor.", date: getRandomDate(-365) },
        { author: "Jamie W.", rating: "★★★★★", text: "Best purchase ever!", date: getRandomDate(-5) },
        { author: "Pat A.", rating: "★★★", text: "It’s okay, not great.", date: getRandomDate(-20) },
        { author: "Casey B.", rating: "★★★★", text: "Pretty good, would buy again.", date: getRandomDate(-45) },
        { author: "Sam C.", rating: "★★", text: "Not what I expected.", date: getRandomDate(-2) },
        { author: "Taylor M.", rating: "★★★★", text: "Good value for the price.", date: getRandomDate(-15) },
        { author: "Jordan F.", rating: "★★★★★", text: "Love it, highly recommend!", date: getRandomDate(-8) },
        { author: "Alex S.", rating: "★★", text: "Disappointed with the quality.", date: getRandomDate(-50) },
        { author: "Morgan B.", rating: "★★★★", text: "Solid product, happy with it.", date: getRandomDate(-75) },
        { author: "Casey D.", rating: "★★★", text: "Meh, it’s okay.", date: getRandomDate(-12) },
        { author: "Sam P.", rating: "★★★★★", text: "Amazing product, worth every penny.", date: getRandomDate(-1) },
        { author: "Jamie K.", rating: "★★★★", text: "Very good, but room for improvement.", date: getRandomDate(-90) }
    ];

    function getRandomDate(daysBack) {
        let today = new Date();
        let randomDate = new Date(today.setDate(today.getDate() - Math.floor(Math.random() * daysBack)));
        return randomDate;
    }

    let reviewCount = reviews.length;
    let reviewsToShow = 6;
    let reviewsSection = document.getElementById("reviewsSection");
    let reviewCountElement = document.getElementById("reviewCount");
    let loadMoreBtn = document.getElementById("loadMoreBtn");
    let reviewPopup = document.getElementById("reviewPopup");
    let openReviewFormBtn = document.getElementById("openReviewFormBtn");
    let closePopup = document.querySelector(".review-popup .close");
    let dropdownBtn = document.querySelector(".dropdown-btn");
    let dropdownContent = document.querySelector(".dropdown-content");

    function renderReviews(start, end) {
        reviewsSection.innerHTML = '';
        for (let i = start; i < end && i < reviews.length; i++) {
            let review = reviews[i];
            let reviewElement = document.createElement("div");
            reviewElement.className = "review";
            reviewElement.innerHTML = `
                <div class="review-header">
                    <span class="review-rating">${review.rating}</span>
                    <span class="review-author">${review.author}</span>
                </div>
                <p>${review.text}</p>
                <p class="review-date">${review.date.toLocaleDateString()} ${review.date.toLocaleTimeString()}</p>
            `;
            reviewsSection.appendChild(reviewElement);
        }
        if (end >= reviews.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    function addReview(author, rating, text) {
        reviews.push({ author, rating, text, date: new Date() });
        reviewCount++;
        reviewCountElement.textContent = `(${reviewCount})`;
        localStorage.setItem('reviews', JSON.stringify(reviews));
        renderReviews(0, reviewsToShow);
    }

    function loadReviews() {
        let reviewsFromStorage = localStorage.getItem('reviews');
        if (reviewsFromStorage) {
            reviews.push(...JSON.parse(reviewsFromStorage));
            reviewCount = reviews.length;
            reviewCountElement.textContent = `(${reviewCount})`;
        }
        renderReviews(0, reviewsToShow);
    }

    function sortReviews(order) {
        switch (order) {
            case 'newest':
                reviews.sort((a, b) => b.date - a.date);
                break;
            case 'oldest':
                reviews.sort((a, b) => a.date - b.date);
                break;
            case 'week':
                let oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                reviews = reviews.filter(review => review.date >= oneWeekAgo);
                break;
            case 'month':
                let oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                reviews = reviews.filter(review => review.date >= oneMonthAgo);
                break;
            case 'year':
                let oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                reviews = reviews.filter(review => review.date >= oneYearAgo);
                break;
        }
        renderReviews(0, reviewsToShow);
    }

    // Initialize
    loadReviews();

    document.getElementById("reviewFormPopup").addEventListener('submit', function (event) {
        event.preventDefault();
        let rating = parseFloat(document.getElementById("reviewRatingPopup").value);
        let ratingStars = '★'.repeat(Math.round(rating * 2));
        addReview('Anonymous', ratingStars, document.getElementById("reviewTextPopup").value);
        document.getElementById("reviewTextPopup").value = '';
        reviewPopup.style.display = "none";
    });

    loadMoreBtn.addEventListener('click', function () {
        reviewsToShow += 6;
        renderReviews(0, reviewsToShow);
    });

    if (openReviewFormBtn) {
        openReviewFormBtn.addEventListener('click', function () {
            reviewPopup.style.display = "block";
        });
    }

    if (closePopup) {
        closePopup.addEventListener('click', function () {
            reviewPopup.style.display = "none";
        });
    }

    window.addEventListener('click', function (event) {
        if (event.target === reviewPopup) {
            reviewPopup.style.display = "none";
        }
    });

    if (dropdownBtn && dropdownContent) {
        dropdownBtn.addEventListener("click", function () {
            dropdownContent.classList.toggle("show");
        });
        document.querySelectorAll(".dropdown-content button").forEach(button => {
            button.addEventListener("click", function () {
                sortReviews(this.getAttribute('data-sort'));
            });
        });
    }

    // Initialize with the latest reviews
    sortReviews('newest');

    // Initialize tabs
    document.getElementById("defaultOpen").click();
});
