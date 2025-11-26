
export default function QuoteSummary({ data }) {
    if (!data) return null;
    const { finalPrice, breakdown = [], discounts = [], created_at, id, base_price } = data;

    return (
        <div className="card">
            <div className="card-body">
                <h6 className="card-title mb-2">Preventivo #{id ?? '—'}</h6>
                <p className="mb-2">Prezzo stimato: <strong>€{Number(finalPrice).toLocaleString()}</strong></p>
                {created_at && <p className="text-muted small mb-2">Creato: {new Date(created_at).toLocaleString()}</p>}

                <div>
                    <h6 className="mb-1">Breakdown</h6>
                    <ul className="mb-2">
                        {breakdown.map((b, i) => (
                            <li key={i}>{b.reason ?? b.name}: {Number(b.value).toFixed(2)} {b.currency ? b.currency : '€'}</li>
                        ))}
                    </ul>
                </div>

                {discounts && discounts.length > 0 && (
                    <>
                        <h6 className="mb-1">Sconti</h6>
                        <ul>
                            {discounts.map((d, i) => (
                                <li key={i}>{d.name}: -{Number(d.value).toFixed(2)} €</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
