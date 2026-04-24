import { handleUserRoutes } from './user.router.js';
import { handleWebsiteRoutes } from './website.router.js';

export async function createRoutes(req, res) {

    if (req.url?.includes('api/users') || req.url?.includes('api/user')) return handleUserRoutes(req, res);

    return handleWebsiteRoutes(req, res);

}