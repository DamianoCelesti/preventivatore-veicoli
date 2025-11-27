import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getVehicles, getOptionals, postQuote } from '../api/api';
import QuoteSummary from '../components/QuoteSummary';

export default function NewQuote() {
    const currentYear = new Date().getFullYear();
    const { register, handleSubmit } = useForm({
        defaultValues: { optionals: [], year: currentYear }
    });
    const [vehicles, setVehicles] = useState([]);
    const [optionals, setOptionals] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getVehicles()
            .then(arr => setVehicles(Array.isArray(arr) ? arr : []))
            .catch(err => {
                console.error('getVehicles error', err);
                setVehicles([]);
            });

        getOptionals()
            .then(arr => setOptionals(Array.isArray(arr) ? arr : []))
            .catch(err => {
                console.error('getOptionals error', err);
                setOptionals([]);
            });
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const payload = {
                vehicle_id: data.vehicle_id,
                year: Number(data.year),
                cc: Number(data.cc),
                fuel: data.fuel,
                selected_optionals: (data.optionals || []).map(id => {
                    const o = optionals.find(x => String(x.id) === String(id));
                    return o ? { id: o.id, name: o.name, price: o.price } : { id, name: '', price: 0 };
                }),
                user: { name: data.name, email: data.email },
                notes: data.notes || ''
            };

            const quote = await postQuote(payload);
            setSummary(quote);
        } catch (err) {
            console.error('postQuote error', err);
            alert('Errore salvataggio preventivo (mock). Controlla la console.');
        } finally {
            setLoading(false);
        }
    };


    const years = Array.from({ length: 31 }, (_, i) => currentYear - i);

    return (
        <div className="row">
            <div className="col-lg-8">
                <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Veicolo</label>
                        <select className="form-select" {...register('vehicle_id', { required: true })}>
                            <option value="">Seleziona...</option>
                            {vehicles.map(v => (
                                <option key={v.id} value={v.id}>{v.model} — €{v.base_price}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Anno</label>
                        <select className="form-select" {...register('year', { required: true })}>
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Cilindrata (cc)</label>
                        <input className="form-control" type="number" {...register('cc', { required: true })} placeholder="1200" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Alimentazione</label>
                        <select className="form-select" {...register('fuel', { required: true })}>
                            <option value="benzina">Benzina</option>
                            <option value="diesel">Diesel</option>
                            <option value="elettrico">Elettrico</option>
                            <option value="ibrido">Ibrido</option>
                            <option value="gpl">GPL</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label className="form-label">Optional</label>
                        <div className="d-flex flex-wrap">
                            {optionals.map(opt => (
                                <div key={opt.id} className="form-check me-3">
                                    <input className="form-check-input" type="checkbox" value={opt.id} {...register('optionals')} id={`opt-${opt.id}`} />
                                    <label className="form-check-label" htmlFor={`opt-${opt.id}`}>{opt.name} (€{opt.price})</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Nome richiedente</label>
                        <input className="form-control" {...register('name', { required: true })} />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="email" {...register('email', { required: true })} />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Note</label>
                        <textarea className="form-control" {...register('notes')}></textarea>
                    </div>

                    <div className="col-12 d-flex gap-2">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Salvataggio...' : 'Calcola e Salva Preventivo'}
                        </button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => { setSummary(null); }}>
                            Pulisci risultato
                        </button>
                    </div>
                </form>
            </div>

            <div className="col-lg-4">
                <h5>Anteprima preventivo</h5>
                {summary ? <QuoteSummary data={summary} /> : (
                    <div className="card p-3">
                        <p className="m-0 text-muted">Il risultato del calcolo apparirà qui dopo il salvataggio.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
