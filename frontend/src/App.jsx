import { Routes, Route, Link } from 'react-router-dom';
import NewQuote from './pages/NewQuote';
import Quotes from './pages/Quotes';

export default function App() {
  return (
    <div className="container py-4">
      <header className="mb-4 d-flex align-items-center justify-content-between">
        <h1 className="h4 m-0">Preventivatore Veicoli</h1>
        <nav>
          <Link className="me-3" to="/">Nuovo Preventivo</Link>
          <Link to="/quotes">Preventivi Salvati</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<NewQuote />} />
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </main>
    </div>
  );
}
