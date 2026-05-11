require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.route');
const cardRoutes = require('./routes/card.route');
const aiRoutes = require('./routes/ai.route');
const uploadRoutes = require('./routes/upload.routes');
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Use Routes
app.use('/auth', authRoutes);
app.use('/cards', cardRoutes);
app.use('/ai', aiRoutes);
app.use('/upload', uploadRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


app.get('/', (req, res) => {
  res.send('DearOnes API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
