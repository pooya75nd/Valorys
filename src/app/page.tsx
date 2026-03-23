import { Zap, BarChart3, Euro, Search, LogIn } from 'lucide-react'; // Supprime cette ligne si lucide-react n'est pas installé

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50">
      {/* Navbar premium */}
      <header className="sticky top-0 z-50 border-b border-indigo-100 bg-white/70 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-3xl font-extrabold text-indigo-700 tracking-tight">
              VALORYS
            </div>
            <span className="hidden md:inline text-sm font-medium text-indigo-500">
              Intelligence Immobilière
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <a href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition">
              Dashboard
            </a>
            <a href="/pricing" className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition">
              Tarifs
            </a>
            <a
              href="/login" // ou /api/auth/signin si tu utilises NextAuth
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-md"
            >
              <LogIn className="h-4 w-4" />
              Connexion
            </a>
          </nav>
        </div>
      </header>

      {/* Hero premium */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-10 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
            L'intelligence qui trouve
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              l'opportunité
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 font-light">
            Scoring IA basé sur DVF réelles • Rendement net et marge MdB en quelques secondes • Alertes ultra-rapides sur décotes et successions
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-md">
              <Zap className="h-7 w-7 text-indigo-600" />
              <span className="font-medium">Alertes &lt; 10 min</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-md">
              <BarChart3 className="h-7 w-7 text-indigo-600" />
              <span className="font-medium">Données DVF officielles</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-md">
              <Euro className="h-7 w-7 text-indigo-600" />
              <span className="font-medium">Rendement net réel</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a
              href="/dashboard"
              className="bg-indigo-600 text-white text-lg px-10 py-5 rounded-xl hover:bg-indigo-700 transition shadow-lg font-medium"
            >
              Accéder au Dashboard
            </a>
            <a
              href="#inscription"
              className="bg-white text-indigo-700 border-2 border-indigo-600 text-lg px-10 py-5 rounded-xl hover:bg-indigo-50 transition font-medium"
            >
              Recevoir les alertes gratuites
            </a>
          </div>
        </div>
      </section>

      {/* Comment ça marche – plus premium */}
      <section className="py-24 bg-white/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            De l'annonce à la décision en 4 étapes
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Scraping multi-sources", desc: "SeLoger, LeBonCoin, BienIci, PAP en continu." },
              { num: "02", title: "Scoring IA 0-100", desc: "Décote DVF, rendement, potentiel MdB, détection successions." },
              { num: "03", title: "Calcul fiscal instantané", desc: "6 régimes comparés + simulation bilan marchand de biens." },
              { num: "04", title: "Alertes temps réel", desc: "Recevez les meilleures opportunités selon vos critères." },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-7xl font-black text-indigo-100 mb-6">{step.num}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section id="inscription" className="py-24 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 md:px-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Commencez dès maintenant</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
            Inscrivez-vous pour tester les alertes et accéder à votre dashboard personnalisé
          </p>
          <a
            href="/dashboard" // ou un lien d'inscription
            className="bg-white text-indigo-700 text-xl px-12 py-6 rounded-xl hover:bg-gray-100 transition shadow-2xl font-bold inline-block"
          >
            Accéder au Dashboard →
          </a>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 text-gray-400 text-center text-sm">
        <p>© {new Date().getFullYear()} Valorys – Tous droits réservés</p>
      </footer>
    </div>
  );
}
