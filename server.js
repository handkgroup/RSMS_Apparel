const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Настройка CORS
app.use(cors());

// Использование JSON-формата для тела запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Папка для статических файлов (изображения и т.д.)
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // Добавить для загрузок

// Настройка хранения загружаемых файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Путь к файлу, где будут храниться данные профиля
const profileFile = 'profile.json';

// Загрузка данных профиля
app.get('/get-profile', (req, res) => {
    if (fs.existsSync(profileFile)) {
        const profileData = JSON.parse(fs.readFileSync(profileFile));
        res.json(profileData);
    } else {
        res.json({
            name: '',
            surname: '',
            dob: '',
            gender: '',
            profileImage: 'default-profile.png'
        });
    }
});

// Сохранение данных профиля
app.post('/save-profile', upload.single('profileImage'), (req, res) => {
    const profileData = {
        name: req.body.name,
        surname: req.body.surname,
        dob: req.body.dob,
        gender: req.body.gender,
        profileImage: req.file ? req.file.filename : 'default-profile.png'
    };

    fs.writeFileSync(profileFile, JSON.stringify(profileData, null, 2));
    res.json(profileData);
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
