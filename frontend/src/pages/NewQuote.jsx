// Importa useEffect e useState da React per gestire stato ed effetti collaterali
import { useEffect, useState } from 'react';

// Importa useForm da react-hook-form per gestire il form e le validazioni
import { useForm } from 'react-hook-form';

// Importa le funzioni dell'API mock (solo frontend)
import { getVehicles, getOptionals, postQuote } from '../api/api';

// Importa il componente per mostrare il riepilogo del preventivo
import QuoteSummary from '../components/QuoteSummary';


// Definisce il componente principale della pagina "Nuovo Preventivo"
export default function NewQuote() {

    // Ottiene l'anno corrente
    const currentYear = new Date().getFullYear();

    // Inizializza react-hook-form con un valore predefinito: optionals come array vuoto
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { optionals: [] }
    });

    // Stato che conterrà la lista dei veicoli (arriva dalla mock API)
    const [vehicles, setVehicles] = useState([]);

    // Stato che conterrà la lista degli optional disponibili
    const [optionals, setOptionals] = useState([]);

    // Stato che conterrà il preventivo generato dal mock (response da postQuote)
    const [summary, setSummary] = useState(null);

    // Stato che controlla il bottone durante il salvataggio
    const [loading, setLoading] = useState(false);


    // useEffect → viene eseguito una sola volta al mount ([] dipendenze)
    useEffect(() => {

        // Chiede la lista dei veicoli al mock API
        getVehicles()
            .then(arr => setVehicles(Array.isArray(arr) ? arr : []))  // Se non è array, metti array vuoto
            .catch(err => {
                console.error('getVehicles error', err);
                setVehicles([]);   // In caso di errore, evita crash e metti []
            });

        // Chiede la lista degli optional
        getOptionals()
            .then(arr => setOptionals(Array.isArray(arr) ? arr : []))
            .catch(err => {
                console.error('getOptionals error', err);
                setOptionals([]);  // Anche qui fallback sicuro
            });

    }, []); // ← vuoto = esegui solo al caricamento


    // Funzione chiamata al submit del form
    const onSubmit = async (data) => {

        // Segnala caricamento
        setLoading(true);

        try {
            // Costruisce il payload che invieremo alla mock API
            const payload = {
                vehicle_id: data.vehicle_id,
                year: Number(data.year),        // cast in numero
                cc: Number(data.cc),            // cast in numero
                fuel: data.fuel,

                // Trasforma gli ID degli optional in oggetti completi (id, name, price)
                selected_optionals: (data.optionals || []).map(id => {
                    const o = optionals.find(x => String(x.id) === String(id));
                    return o
                        ? { id: o.id, name: o.name, price: o.price }
                        : { id, name: '', price: 0 }; // fallback
                }),

                // Dati utente
                user: { name: data.name, email: data.email },

                // Eventuali note
                notes: data.notes || ''
            };

            // Chiama la mock API che calcola e salva il preventivo
            const quote = await postQuote(payload);

            // Salva il preventivo per mostrarlo sulla destra
            setSummary(quote);

        } catch (err) {
            console.error('postQuote error', err);
            alert('Errore salvataggio preventivo (mock). Controlla la console.');
        } finally {
            // Toglie il caricamento in ogni caso
            setLoading(false);
        }
    };


    // Genera gli ultimi 31 anni
    const years = Array.from({ length: 31 }, (_, i) => currentYear - i);



    return (
        <div className="row">

            {/* COLONNA SINISTRA: FORM */}
            <div className="col-lg-8">

                {/* handleSubmit gestisce submit + validazioni */}
                <form onSubmit={handleSubmit(onSubmit)} className="row g-3">

                    {/* Selettore veicolo */}
                    <div className="col-md-6">
                        <label className="form-label">Veicolo</label>
                        <select className="form-select" {...register('vehicle_id', { required: true })}>
                            <option value="">Seleziona...</option>

                            {/* Stampa tutti i veicoli caricati dalla mock API */}
                            {vehicles.map(v => (
                                <option key={v.id} value={v.id}>
                                    {v.model} — €{v.base_price}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Selettore anno */}
                    <div className="col-md-3">
                        <label className="form-label">Anno</label>
                        <select className="form-select" {...register('year', { required: true })}>
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    {/* Cilindrata */}
                    <div className="col-md-3">
                        <label className="form-label">Cilindrata (cc)</label>
                        <input className="form-control" type="number" {...register('cc', { required: true })} placeholder="1200" />
                    </div>

                    {/* Selettore carburante */}
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

                    {/* Checkbox optional */}
                    <div className="col-12">
                        <label className="form-label">Optional</label>

                        <div className="d-flex flex-wrap">

                            {/* Lista optional mock */}
                            {optionals.map(opt => (
                                <div key={opt.id} className="form-check me-3">
                                    <input className="form-check-input" type="checkbox" value={opt.id} {...register('optionals')} id={`opt-${opt.id}`} />
                                    <label className="form-check-label" htmlFor={`opt-${opt.id}`}>
                                        {opt.name} (€{opt.price})
                                    </label>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Nome utente */}
                    <div className="col-md-6">
                        <label className="form-label">Nome richiedente</label>
                        <input className="form-control" {...register('name', { required: true })} />
                    </div>

                    {/* Email con validazione e messaggio errore */}
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            type="email"
                            {...register('email', { required: 'L’email è obbligatoria' })}
                        />

                        {/* Mostra errore sotto input */}
                        {errors.email && (
                            <div className="invalid-feedback">
                                {errors.email.message}
                            </div>
                        )}
                    </div>

                    {/* Note */}
                    <div className="col-12">
                        <label className="form-label">Note</label>
                        <textarea className="form-control" {...register('notes')}></textarea>
                    </div>

                    {/* Bottoni */}
                    <div className="col-12 d-flex gap-2">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Salvataggio...' : 'Calcola e Salva Preventivo'}
                        </button>

                        {/* Reset del riepilogo */}
                        <button type="button" className="btn btn-outline-secondary" onClick={() => { setSummary(null); }}>
                            Pulisci risultato
                        </button>
                    </div>
                </form>
            </div>

            {/* COLONNA DESTRA: RIEPILOGO */}
            <div className="col-lg-4">
                <h5>Anteprima preventivo</h5>

                {/* Se summary esiste mostra il componente QuoteSummary */}
                {summary ? <QuoteSummary data={summary} /> : (
                    <div className="card p-3">
                        <p className="m-0 text-muted">
                            Il risultato del calcolo apparirà qui dopo il salvataggio.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}