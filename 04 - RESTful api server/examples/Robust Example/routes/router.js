import { handleUserRoutes } from './user.router.js';
import { handleWebsiteRoutes } from './website.router.js';

export async function createRoutes(req, res) {

    if (req.url?.includes('api/users')) return handleUserRoutes(req, res);

    return handleWebsiteRoutes(req, res);

}