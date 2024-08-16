
function showImage(src) {

    var mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = src;
    } else {
        console.error('Main image element not found.');
    }


    var thumbnails = document.querySelectorAll('.thumbnails img');


    thumbnails.forEach(function (img) {
        img.classList.remove('selected');
    });


    var clickedThumbnail = Array.from(thumbnails).find(img => img.src.endsWith(src));
    if (clickedThumbnail) {
        clickedThumbnail.classList.add('selected');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const colors = document.querySelectorAll('.color');
    
    colors.forEach(color => {
        color.addEventListener('click', (event) => {
            event.preventDefault();
            
            colors.forEach(c => c.classList.remove('active'));
            color.classList.add('active');
        });
    });
});
document.querySelectorAll('.size-option').forEach(option => {
    option.addEventListener('click', function(event) {
        event.preventDefault(); 
       
        document.querySelectorAll('.size-option').forEach(el => el.classList.remove('active'));

       
        this.classList.add('active');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const counterElement = document.getElementById('counter');
    const minusButton = document.querySelector('.minus-btn');
    const plusButton = document.querySelector('.plus-btn');
    
    let count = 0;


    function updateCounter() {
        counterElement.textContent = count;
    }


    minusButton.addEventListener('click', function(event) {
        event.preventDefault();
        if (count > 0) {
            count--;
            updateCounter();
        }
    });


    plusButton.addEventListener('click', function(event) {
        event.preventDefault();
        count++;
        updateCounter();
    });
});


