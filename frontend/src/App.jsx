/**
 * Importa i componenti necessari da react-router-dom:
 * - Routes e Route servono per definire le rotte dell’app.
 * - Link serve per creare collegamenti che non ricaricano la pagina.
 */
import { Routes, Route, Link } from 'react-router-dom';

/**
 * Importa le due pagine principali dell’app:
 * - NewQuote: la pagina per creare un nuovo preventivo.
 * - Quotes: la pagina che mostra tutti i preventivi salvati.
 */
import NewQuote from './pages/NewQuote';
import Quotes from './pages/Quotes';

/**
 * Componente principale dell’applicazione.
 * Viene renderizzato una sola volta e contiene:
 * - Header con il titolo e i link di navigazione
 * - Router con le diverse pagine
 */
export default function App() {
  return (
    // Contenitore principale con padding
    <div className="container py-4">

      {/* Header della pagina con titolo e navigazione */}
      <header className="mb-4 d-flex align-items-center justify-content-between">
        {/* Titolo dell'applicazione */}
        <h1 className="h4 m-0">Preventivatore Veicoli</h1>

        {/* Barra di navigazione */}
        <nav>
          {/* Link che porta alla pagina "/" (Nuovo Preventivo) */}
          <Link className="me-3" to="/">Nuovo Preventivo</Link>

          {/* Link che porta alla pagina "/quotes" (Lista preventivi salvati) */}
          <Link to="/quotes">Preventivi Salvati</Link>
        </nav>
      </header>

      {/* Contenuto principale della pagina */}
      <main>
        <Routes>
          {/**
           * Definizione delle rotte dell'app:
           * - "/" renderizza il componente <NewQuote />
           */}
          <Route path="/" element={<NewQuote />} />

          {/**
           * - "/quotes" renderizza il componente <Quotes />
           */}
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </main>

    </div>
  );
}
