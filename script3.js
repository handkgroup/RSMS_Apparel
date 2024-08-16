document.addEventListener('DOMContentLoaded', function() {
    const changePhotoButton = document.getElementById('changePhoto');
    const fileInput = document.getElementById('fileInput');
    const avatarImage = document.getElementById('avatarImage');
    const avatarImage2 = document.getElementById('avatarImage2');
    const saveChangesButton = document.getElementById('saveChanges');

    // Загрузка текущего профиля при загрузке страницы
    fetch('http://localhost:3000/get-profile')
        .then(response => response.json())
        .then(data => {
            // Обновление полей ввода
            document.getElementById('surname').value = data.surname;
            document.getElementById('name').value = data.name;
            document.getElementById('dob').value = data.dob;
            document.getElementById('gender').value = data.gender;

            // Обновление изображений
            avatarImage.src = `http://localhost:3000/uploads/${data.profileImage}`;
            avatarImage2.src = `http://localhost:3000/uploads/${data.profileImage}`;

            // Обновление имени и фамилии в pic_title и nschb
            document.querySelector('.pic_title h1:nth-of-type(1)').textContent = data.name;
            document.querySelector('.pic_title h1:nth-of-type(2)').textContent = data.surname;
            document.querySelector('.nschb h1:nth-of-type(1)').textContent = data.name;
            document.querySelector('.nschb h1:nth-of-type(2)').textContent = data.surname;
        })
        .catch(error => console.error('Error fetching profile:', error));

    // Обработка выбора файла для смены фото
    changePhotoButton.addEventListener('click', function(event) {
        event.preventDefault();
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarImage.src = e.target.result;
                avatarImage2.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Обработка сохранения данных профиля
    saveChangesButton.addEventListener('click', function(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('surname', document.getElementById('surname').value);
        formData.append('dob', document.getElementById('dob').value);
        formData.append('gender', document.getElementById('gender').value);
        if (fileInput.files[0]) {
            formData.append('profileImage', fileInput.files[0]);
        }

        fetch('http://localhost:3000/save-profile', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Profile saved:', data);

            // Обновление изображений
            avatarImage.src = `http://localhost:3000/uploads/${data.profileImage}`;
            avatarImage2.src = `http://localhost:3000/uploads/${data.profileImage}`;

            // Обновление имени и фамилии в pic_title и nschb
            document.querySelector('.pic_title h1:nth-of-type(1)').textContent = data.name;
            document.querySelector('.pic_title h1:nth-of-type(2)').textContent = data.surname;
            document.querySelector('.nschb h1:nth-of-type(1)').textContent = data.name;
            document.querySelector('.nschb h1:nth-of-type(2)').textContent = data.surname;
        })
        .catch(error => console.error('Error saving profile:', error));
    });
});
