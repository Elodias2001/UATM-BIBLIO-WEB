import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Memory from '#models/memory'
import hash from '@adonisjs/core/services/hash'
import { loginValidator } from '#validators/login'

export default class AdminAuthController {
  public async showLogin({ view, auth }: HttpContext) {
    if (auth.isAuthenticated) {
      return auth.user?.isAdmin ? this.redirectToAdminDashboard() : this.redirectToHome()
    }
    return view.render('pages/auth/login')
  }

  public async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.findBy('email', email)
    if (!user || !user.isAdmin) {
      session.flash('errors', { email: 'Accès réservé aux administrateurs.' })
      return response.redirect().back()
    }

    const passwordOk = await hash.verify(user.password, password)
    if (!passwordOk) {
      session.flash('errors', { password: 'Identifiants invalides.' })
      return response.redirect().back()
    }

    await auth.use('web').login(user)
    return response.redirect('/admin')
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }

  public async dashboard({ view, auth }: HttpContext) {
    // Fetch statistics for the dashboard
    const stats = {
      totalMemories: 0, // TODO: Implement actual count
      totalUsers: 0, // TODO: Implement actual count
      totalViews: 0, // TODO: Implement actual count
      totalDownloads: 0, // TODO: Implement actual count
    }

    // Fetch recent memories for the dashboard
    const recentMemories = await Memory.query().orderBy('createdAt', 'desc').limit(5)

    return view.render('pages/admin/dashboard', { stats, recentMemories })
  }

  private redirectToAdminDashboard() {
    return {
      redirect: '/admin',
    }
  }

  private redirectToHome() {
    return {
      redirect: '/',
    }
  }
}
