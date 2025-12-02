// Esporta come default il componente QuoteSummary, che riceve una prop chiamata "data"
export default function QuoteSummary({ data }) {

    // Se "data" NON esiste (null/undefined), non mostra nulla e restituisce null (non renderizza il componente)
    if (!data) return null;

    // Estrae dal parametro "data" alcune proprietà:
    // - finalPrice: prezzo finale del preventivo
    // - breakdown: lista dettagliata dei costi (default = [])
    // - discounts: eventuali sconti (default = [])
    // - created_at: data e ora di creazione
    // - id: ID del preventivo
    // - base_price: prezzo base
    // Se qualche proprietà non esiste, viene valorizzata come indicato
    const { finalPrice, breakdown = [], discounts = [], created_at, id, base_price } = data;

    // Ritorna la UI del riepilogo sotto forma di card Bootstrap
    return (
        <div className="card">
            <div className="card-body">

                {/* Titolo della card: mostra l’ID del preventivo, oppure "—" se manca */}
                <h6 className="card-title mb-2">Preventivo #{id ?? '—'}</h6>

                {/* Mostra il prezzo finale convertito in numero e formattato con separatori (es: 12.000,50) */}
                <p className="mb-2">Prezzo stimato: <strong>€{Number(finalPrice).toLocaleString()}</strong></p>

                {/* Se esiste created_at, lo mostra formattato come data leggibile */}
                {created_at && <p className="text-muted small mb-2">Creato: {new Date(created_at).toLocaleString()}</p>}

                <div>
                    {/* Titolo della sezione Breakdown */}
                    <h6 className="mb-1">Breakdown</h6>

                    {/* Lista dei dettagli per ogni voce in breakdown crea un <li> */}
                    <ul className="mb-2">
                        {breakdown.map((b, i) => (
                            // Ogni elemento ha una key basata sull’indice
                            <li key={i}>
                                {/* Mostra il "reason" o il "name" della voce */}
                                {b.reason ?? b.name}:

                                {/* Valore numerico formattato con due decimali */}
                                {Number(b.value).toFixed(2)}

                                {/* Mostra la valuta se esiste, altrimenti usa € */}
                                {b.currency ? b.currency : '€'}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Se ci sono sconti, mostra la sezione Sconti */}
                {discounts && discounts.length > 0 && (
                    <>
                        <h6 className="mb-1">Sconti</h6>
                        <ul>
                            {/* Stampa ogni sconto nella lista */}
                            {discounts.map((d, i) => (
                                <li key={i}>
                                    {/* Nome dello sconto e importo con due decimali */}
                                    {d.name}: -{Number(d.value).toFixed(2)} €
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
