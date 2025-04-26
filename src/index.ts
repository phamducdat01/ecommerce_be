import app from './app';
import process from 'process';
import config from './config/config.mongodb'; // đã export default rồi

const {
    app: { port },
} = config;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Xử lý sự kiện khi bấm Ctrl+C để dừng server
// (nếu cần dùng thì mở comment lại)
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Exit Server Express');
    });
});
