export async function handleUserRoutes(req, res) {
    switch (req.method) {
        case 'GET': return 1;
        case 'POST': return 2;
        case 'PUT': return 3;
        case 'DELETE': return 4;
        default: return 5;
    }
}