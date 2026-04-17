import { join } from 'path';
import { createServer } from 'http';
import { users } from './data/users.js';

process.loadEnvFile(join(import.meta.dirname, 'config', '.env'));
const PORT = process.env.PORT;

// יוצרים את הסרבר
let server = createServer((req, res) => {
    let body = "";
    switch (req.method) {
        case 'GET':
            res.writeHead(200, { 'Content-Type': 'application/json' });
            let data = {
                message: 'Hello World! GET request received',
                users: users
            };
            res.end(JSON.stringify(data));
            break;
        case 'POST':
            body = "";
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                let user = { id: users.length + 1, ...JSON.parse(body) };
                users.push(user);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                let data = {
                    message: 'Hello World! POST request received',
                    usersCount: users.length
                };
                res.end(JSON.stringify(data));
            });
            break;
        case 'PUT':
            // נניח שה-URL הוא /users/1, אז נחלץ את ה-ID מה-URL
            let parts = req.url.split('/');
            let id = Number(parts.pop());

            // נקבל את הנתונים מהבקשה
            body = "";
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                let updatedUser = JSON.parse(body);
                let userIndex = users.findIndex(u => u.id === id);

                // אם המשתמש לא נמצא, נחזיר שגיאה
                if (userIndex == -1) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'User not found' }));
                }

                // נעדכן את המשתמש עם הנתונים החדשים
                users[userIndex] = { ...users[userIndex], ...updatedUser };

                // נחזיר את המשתמש המעודכן בתגובה
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'User updated successfully', user: users[userIndex] }));
            });
            break;
        case 'DELETE':
            // נניח שה-URL הוא /users/1, אז נחלץ את ה-ID מה-URL
            let deleteParts = req.url.split('/');
            let deleteId = Number(deleteParts.pop());

            // נמצא את המשתמש ונמחק אותו
            let deleteIndex = users.findIndex(u => u.id === deleteId);
            if (deleteIndex == -1) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'User not found' }));
            }
            users.splice(deleteIndex, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'User deleted successfully' }));
            break;
        default:
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');

    }
});

// הפעלת הסרבר
server.listen(PORT, () => {
    console.log(`[SERVER] live at: http://localhost:${PORT}`);
});