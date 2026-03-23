import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Zap, BarChart3, Euro, ShieldCheck, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="text-2xl font-bold text-indigo-700">VALORYS</div>
          <nav className="hidden md:flex gap-8">
            <a href="#fonctionnement" className="text-sm font-medium hover:text-indigo-600">Fonctionnement</a>
            <a href="#tarifs" className="text-sm font-medium hover:text-indigo-600">Tarifs</a>
            <a href="#contact" className="text-sm font-medium hover:text-indigo-600">Contact</a>
          </nav>
          <Button asChild variant="default" className="bg-indigo-600 hover:bg-indigo-700">
            <a href="#inscription">Recevoir les alertes</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            L'intelligence qui trouve<br />
            <span className="text-indigo-600">l'opportunité</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
            Scoring IA basé sur DVF réelles • Rendement net & marge MdB en quelques secondes • Alertes ultra-rapides sur décotes et successions
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="text-base px-4 py-2">Données DVF officielles DGFiP</Badge>
            <Badge variant="secondary" className="text-base px-4 py-2">Score IA /100</Badge>
            <Badge variant="secondary" className="text-base px-4 py-2">6 régimes fiscaux comparés</Badge>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            <div className="flex flex-col items-center">
              <Zap className="h-10 w-10 text-indigo-600 mb-3" />
              <p className="font-semibold">Alertes &lt; 10 min</p>
            </div>
            <div className="flex flex-col items-center">
              <BarChart3 className="h-10 w-10 text-indigo-600 mb-3" />
              <p className="font-semibold">Analyse +200k transactions</p>
            </div>
            <div className="flex flex-col items-center">
              <Euro className="h-10 w-10 text-indigo-600 mb-3" />
              <p className="font-semibold">Rendement net réel</p>
            </div>
            <div className="flex flex-col items-center">
              <Search className="h-10 w-10 text-indigo-600 mb-3" />
              <p className="font-semibold">Détection successions</p>
            </div>
          </div>

          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-10 py-7" asChild>
            <a href="#inscription">Je veux tester gratuitement</a>
          </Button>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="fonctionnement" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Comment ça marche</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Scraping multi-sources", desc: "SeLoger, LeBonCoin, BienIci, PAP en continu." },
              { num: "02", title: "Scoring IA sur 100 pts", desc: "Décote DVF, rendement, potentiel MdB, successions." },
              { num: "03", title: "Calcul fiscal instantané", desc: "6 régimes comparés + simulation bilan MdB." },
              { num: "04", title: "Alerte en temps réel", desc: "Meilleures opportunités selon vos critères." },
            ].map((step) => (
              <Card key={step.num} className="border-2 border-indigo-100 hover:border-indigo-300 transition">
                <CardHeader>
                  <div className="text-5xl font-bold text-indigo-200">{step.num}</div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inscription (CTA principal) */}
      <section id="inscription" className="py-20 bg-indigo-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Recevez les meilleures opportunités – Beta gratuite</CardTitle>
              <CardDescription className="text-lg mt-4">
                Inscrivez-vous pour tester 3–5 alertes par semaine adaptées à vos critères
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input id="prenom" placeholder="Votre prénom" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="votre@email.com" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="villes">Ville(s) / Département(s) ciblé(s)</Label>
                  <Input id="villes" placeholder="Paris, Lyon, 75, 69..." />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="budget">Budget max d’acquisition</Label>
                    <Input id="budget" placeholder="300 000 €" />
                  </div>
                  <div>
                    <Label htmlFor="rendement">Rendement net mini espéré</Label>
                    <Input id="rendement" placeholder="7 %" />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-7">
                  Envoyer ma demande d’accès beta
                </Button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Aucun engagement – Conformément au RGPD
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-4">VALORYS</div>
          <p className="mb-6">L'intelligence immobilière qui trouve les vraies opportunités</p>
          <p className="text-sm opacity-70">© {new Date().getFullYear()} Valorys – Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}
