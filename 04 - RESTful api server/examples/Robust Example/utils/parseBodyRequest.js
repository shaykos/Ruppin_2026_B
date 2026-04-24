export async function parseBodyRequest(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {}); // Resolve with parsed object or empty object if body is empty
            } catch (error) {
                reject(new Error('Invalid JSON in request body'));
            }
        });
        
        req.on('error', (error) => {
            reject(error); // Reject the promise if there's an error with the request
        });
    });
}