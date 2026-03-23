export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 antialiased">
      {/* Navbar premium fixe */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-indigo-100 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-3xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              VALORYS
            </div>
            <span className="text-sm font-medium text-gray-500 hidden sm:inline">
              Intelligence Immobilière
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <a href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition-colors">
              Dashboard
            </a>
            <a href="/pricing" className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition-colors">
              Tarifs
            </a>
            <a
              href="/login"
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-md"
            >
              Connexion
            </a>
          </nav>
        </div>
      </header>

      {/* Hero principal – plus impactant */}
      <main className="pt-24 pb-32 md:pt-32">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-gray-900 mb-8 leading-none">
            L'intelligence qui trouve
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              l'opportunité
            </span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-4xl mx-auto mb-16 font-light leading-relaxed">
            Scoring IA basé sur DVF officielles • Rendement net et marge MdB calculés instantanément • Alertes en temps réel sur les décotes et successions cachées
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-8 py-5 rounded-2xl shadow-lg border border-indigo-100">
              <span className="text-2xl">⚡</span>
              <span className="font-semibold text-gray-800">Alertes &lt; 10 min</span>
            </div>
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-8 py-5 rounded-2xl shadow-lg border border-indigo-100">
              <span className="text-2xl">📊</span>
              <span className="font-semibold text-gray-800">Données DGFiP réelles</span>
            </div>
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-8 py-5 rounded-2xl shadow-lg border border-indigo-100">
              <span className="text-2xl">💰</span>
              <span className="font-semibold text-gray-800">Rendement net réel</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/dashboard"
              className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-xl px-12 py-6 rounded-xl hover:brightness-110 transition shadow-2xl font-semibold"
            >
              Accéder au Dashboard →
            </a>
            <a
              href="#inscription"
              className="bg-white text-indigo-700 border-2 border-indigo-600 text-xl px-12 py-6 rounded-xl hover:bg-indigo-50 transition font-semibold shadow-md"
            >
              Recevoir les alertes gratuites
            </a>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-12 bg-gray-900 text-gray-400 text-center text-sm border-t border-gray-800">
        <p>© {new Date().getFullYear()} Valorys – Tous droits réservés</p>
      </footer>
    </div>
  );
}
