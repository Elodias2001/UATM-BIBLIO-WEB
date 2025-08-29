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
const MemoryController = () => import('#controllers/admin/memory_controller')
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

// Admin memory management routes
router
  .group(() => {
    router.get('/', [MemoryController, 'index']).as('admin.memories.index')
    router.get('/create', [MemoryController, 'create']).as('admin.memories.create')
    router.post('/', [MemoryController, 'store']).as('admin.memories.store')
    router.get('/:id/details', [MemoryController, 'show']).as('admin.memories.show')
    router.get('/:id/edit', [MemoryController, 'edit']).as('admin.memories.edit')
    router.post('/:id/update', [MemoryController, 'update']).as('admin.memories.update')
    router.post('/:id/delete', [MemoryController, 'destroy']).as('admin.memories.destroy')
  })
  .prefix('/admin/memories')
  .use(middleware.auth())
