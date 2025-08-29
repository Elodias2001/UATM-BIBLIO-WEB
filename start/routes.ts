/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const HomeController = () => import('#controllers/home_controller')
const SearchController = () => import('#controllers/search_controller')
const AdminAuthController = () => import('#controllers/admin_auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', [HomeController, 'index'])

// Public search route (no auth required)
router.get('/search', [SearchController, 'index'])

// Admin auth routes
router.get('/login', [AdminAuthController, 'showLogin']).use(middleware.guest())
router.post('/login', [AdminAuthController, 'login']).use(middleware.guest())
router.post('/logout', [AdminAuthController, 'logout']).use(middleware.auth())

// Admin dashboard route
router.get('/admin', [AdminAuthController, 'dashboard']).use(middleware.auth())
