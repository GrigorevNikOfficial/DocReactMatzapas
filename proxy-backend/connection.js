const Sequelize = require('sequelize');

//**  Подключение к БД  **//
const sequelize = new Sequelize(
    'matzapas', // название Базы Данных
    'root', // Пользователь Базы Данных 
    '11111111', // Пароль для пользователя root
    {
        host: 'localhost', // Адрес сервера БД
        dialect: 'mysql', // Название сервера БД

    }
);

// Экспорт экземпляра подключения
// Нужен для использования в других файлах
module.exports = sequelize;
