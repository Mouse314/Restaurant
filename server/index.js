require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const sequelize = require('./db');
const models = require('./models/models.js');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index.js');
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);


app.use(errorHandler);
// Middleware для сессий
app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // для production используйте secure: true с HTTPS
}));

// Middleware для проверки авторизации
const requireAuth = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
      return next();
    }
    res.status(401).json({ message: 'Не авторизован' });
};

const start = async () => {
    try {
        console.log(1);
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log('Сервер слушается на порту ' + PORT));
        // Маршрут для входа
        app.post('/api/login', express.json(), async (req, res) => {
                const { password } = req.body;
            
            // Здесь должна быть проверка пароля (в реальном приложении храните хеш в БД)
            const correctPasswordHash = '$2a$12$deibkrTS7yuwZW9a.TXS7uTqQUpkwsOwt3KkURdRhzvDxLVjY3Kz2'; // Хеш правильного пароля

            try {
                const isMatch = await bcrypt.compare(password, correctPasswordHash);
                if (isMatch) {
                    req.session.isAuthenticated = true;
                    res.json({ success: true });
                } else {
                    res.status(401).json({ success: false, message: 'Неверный пароль' });
                }
            } catch (error) {
                res.status(500).json({ success: false, message: 'Ошибка сервера' });
            }
        });
  
        // Маршрут для выхода
        app.post('/api/logout', (req, res) => {
          req.session.destroy();
          res.json({ success: true });
        });

        // Защищенный маршрут
        app.get('/api/admin/data', requireAuth, (req, res) => {
          res.json({ data: 'Секретные данные админа' });
        });
    }
    catch (e) {
        console.log(e);
    }
}

start();