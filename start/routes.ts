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
router.get('/search', [SearchController, 'index']).as('search')

// Admin auth routes
router.get('/login', [AdminAuthController, 'showLogin']).use(middleware.guest()).as('login.page')
router.post('/login', [AdminAuthController, 'login']).use(middleware.guest()).as('auth.login')
router.post('/logout', [AdminAuthController, 'logout']).use(middleware.auth()).as('auth.logout')

// Admin dashboard route
router
  .get('/admin', [AdminAuthController, 'dashboard'])
  .use(middleware.auth())
  .as('admin.dashboard')
