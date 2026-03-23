import { Mail, Zap, BarChart3, Euro, Search } from 'lucide-react';  // Si lucide-react est installé, sinon supprime les icônes

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar simple */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="text-2xl font-bold text-indigo-700">VALORYS</div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Recevoir les alertes
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6">
            L'intelligence qui trouve<br />
            <span className="text-indigo-600">l'opportunité</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12">
            Scoring IA sur DVF réelles • Rendement net & marge MdB en secondes • Alertes temps réel sur décotes et successions
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-indigo-600" /> <span>Alertes &lt; 10 min</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-indigo-600" /> <span>Analyse DVF officielle</span>
            </div>
            <div className="flex items-center gap-2">
              <Euro className="h-6 w-6 text-indigo-600" /> <span>Rendement net réel</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-6 w-6 text-indigo-600" /> <span>Détection successions</span>
            </div>
          </div>

          <button className="bg-indigo-600 text-white text-xl px-10 py-6 rounded-xl hover:bg-indigo-700">
            Je veux tester gratuitement
          </button>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Comment ça marche</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Scraping", desc: "SeLoger, LeBonCoin, BienIci, PAP en continu." },
              { num: "02", title: "Scoring IA", desc: "Décote DVF, rendement, potentiel MdB, successions." },
              { num: "03", title: "Calcul fiscal", desc: "6 régimes comparés + simulation MdB." },
              { num: "04", title: "Alertes", desc: "Meilleures opportunités selon vos critères." },
            ].map((step) => (
              <div key={step.num} className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-6xl font-bold text-indigo-200 mb-4">{step.num}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="py-12 bg-gray-900 text-white text-center">
        <p>© {new Date().getFullYear()} Valorys – Intelligence Immobilière</p>
      </footer>
    </div>
  );
}
