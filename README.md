# 🚗 Insurance Quote Frontend (React + Vite)

Questo progetto è un **frontend React** sviluppato con **Vite**, che permette agli utenti di creare un **preventivo assicurativo** selezionando un veicolo, inserendo i propri dati e visualizzando un riepilogo finale.

Il sistema al momento utilizza **mock API locali**, senza bisogno di un backend reale.

---

## 🛠️ Tecnologie utilizzate

- React 18  
- Vite  
- Bootstrap 5  
- React Hook Form  
- Mock API (file locali)  
- JavaScript / JSX  

---

## 📦 Funzionalità principali

- Scelta del veicolo  
- Scelta optional aggiuntivi  
- Selezione anno dinamica (ultimi 30 anni)  
- Inserimento dati utente  
- Validazione dei campi (es. email obbligatoria)  
- Calcolo e anteprima del preventivo  
- Mock del salvataggio  
- Reset del risultato  

---

## 📁 Struttura del progetto

```
src/
 ├── api/
 │    └── api.js
 ├── components/
 │    └── QuoteSummary.jsx
 ├── pages/
 │    └── NewQuote.jsx
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

---

## ▶️ Avvio del progetto

Assicurati di avere **Node.js 18+** installato.

### 1. Installa le dipendenze:
```bash
npm install
```

### 2. Avvia il server di sviluppo:
```bash
npm run dev
```

Il sito sarà disponibile su:

```
http://localhost:5173
```

---

## 🧪 Mock API

Il progetto utilizza funzioni mock al posto delle vere chiamate HTTP.

Esempio:
```js
export async function getVehicles() {
  return [
    { id: 1, model: "Panda", base_price: 12000 },
    { id: 2, model: "Audi A3", base_price: 28000 }
  ];
}
```

---

## ✔️ Validazioni

Il form usa `react-hook-form` per gestire i campi obbligatori e i formati (email, numeri, ecc.).

---

## 📄 Riepilogo preventivo

Dopo l'invio del form viene mostrato un riepilogo calcolato dal mock backend, nel componente `QuoteSummary`.

---

## 🔧 Prossimi sviluppi

- Collegamento al backend reale  
- Salvataggio preventivi su database  
- Autenticazione utente  
- Dashboard amministrativa  

---


