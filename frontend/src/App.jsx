import React, { useEffect, useState } from 'react'

// Intentionally bad: a "client secret" pattern in a front-end file (should be flagged)
const STRIPE_SECRET_KEY = "sk_live_51H8cFAkeSeCrEtKeyAbCdEfGhIjKlMnOpQrStUvWxYz012345";

export default function App() {
  const [apiHealth, setApiHealth] = useState('checking...')
  const [pyHealth, setPyHealth] = useState('checking...')

  useEffect(() => {
    fetch('http://localhost:3001/health').then(r => r.json()).then(d => setApiHealth(d.status)).catch(() => setApiHealth('down'))
    fetch('http://localhost:8000/health').then(r => r.json()).then(d => setPyHealth(d.status)).catch(() => setPyHealth('down'))
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui', maxWidth: 720, margin: '2rem auto' }}>
      <h1>Wiz Secret Scanner Lab – Frontend</h1>
      <p>This demo intentionally includes fake secrets so scanners can find them.</p>
      <div style={{padding: '1rem', border: '1px solid #ddd', borderRadius: 8}}>
        <h3>Service Health</h3>
        <p>Node API: <strong>{apiHealth}</strong></p>
        <p>Python Service: <strong>{pyHealth}</strong></p>
      </div>
      <p style={{marginTop: '2rem', fontSize: 12, color: '#666'}}>
        The string <code>sk_live_...</code> above is a synthetic secret to exercise scanners.
      </p>
    </div>
  )
}
