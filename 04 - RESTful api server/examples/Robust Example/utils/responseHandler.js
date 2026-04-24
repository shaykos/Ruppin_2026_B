export function sendResponse(res, statusCode, payload) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' }); // Set the response header to indicate JSON content
    res.end(JSON.stringify(payload)); // Send the response with the payload serialized as JSON
}