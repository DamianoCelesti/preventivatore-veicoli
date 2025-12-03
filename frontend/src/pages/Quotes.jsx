// Importa gli hook React necessari
import { useEffect, useState } from 'react';

// Importa la funzione API che recupera i preventivi
import { getQuotes } from '../api/api';

// Definisce il componente principale "Quotes" ed esporta come default
export default function Quotes() {

    // Crea una variabile di stato "list" che conterrà l’elenco dei preventivi
    // Inizialmente è un array vuoto
    const [list, setList] = useState([]);

    // useEffect viene eseguito una sola volta al montaggio del componente
    useEffect(() => {

        // Chiama l’API getQuotes()
        // Se ha successo → r.data contiene l’elenco dei preventivi
        getQuotes()
            .then(r => setList(r.data)) // Aggiorna lo stato "list" con i dati ricevuti
            .catch(() => setList([]));  // In caso di errore, imposta un array vuoto

    }, []); // L’array vuoto dice a React di eseguire l’effetto solo al primo render


    return (
        <div>
            {/* Titolo della pagina */}
            <h2 className="h5 mb-3">Preventivi salvati</h2>
            <div className="table-responsive">

                {/* Tabella Bootstrap */}
                <table className="table table-sm">

                    {/* Intestazione della tabella */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Prezzo</th>
                            <th>Data</th>
                        </tr>
                    </thead>

                    {/* Corpo della tabella */}
                    <tbody>

                        {/* Se la lista è vuota, mostra una riga che avvisa "Nessun preventivo" */}
                        {list.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center text-muted">
                                    Nessun preventivo
                                </td>
                            </tr>
                        )}

                        {/* Se ci sono preventivi, li mappa uno per uno in righe della tabella */}
                        {list.map(q => (
                            <tr key={q.id}>   {/* key obbligatoria per React */}

                                {/* ID del preventivo */}
                                <td>{q.id}</td>

                                {/* Nome dell’utente (se manca → '-') */}
                                <td>{q.user?.name ?? '-'}</td>

                                {/* Prezzo finale formattato correttamente in euro */}
                                <td>€{Number(q.finalPrice).toLocaleString()}</td>

                                {/* Data di creazione formattata, oppure '-' se mancante */}
                                <td>
                                    {q.created_at
                                        ? new Date(q.created_at).toLocaleString()
                                        : '-'}
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    );
}
