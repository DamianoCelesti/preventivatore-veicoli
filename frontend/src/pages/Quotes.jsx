import { useEffect, useState } from 'react';
import { getQuotes } from '../api/api';

export default function Quotes() {
    const [list, setList] = useState([]);
    useEffect(() => {
        getQuotes().then(r => setList(r.data)).catch(() => setList([]));
    }, []);

    return (
        <div>
            <h2 className="h5 mb-3">Preventivi salvati</h2>
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>ID</th><th>Nome</th><th>Prezzo</th><th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length === 0 && (
                            <tr><td colSpan="4" className="text-center text-muted">Nessun preventivo</td></tr>
                        )}
                        {list.map(q => (
                            <tr key={q.id}>
                                <td>{q.id}</td>
                                <td>{q.user?.name ?? '-'}</td>
                                <td>€{Number(q.finalPrice).toLocaleString()}</td>
                                <td>{q.created_at ? new Date(q.created_at).toLocaleString() : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
