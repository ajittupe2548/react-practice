import './App.css';

function App() {
  // Simple JWT encode/decode example (client-side, for demo only)
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = { userId: 123, name: 'Ajit', exp: Math.floor(Date.now() / 1000) + 60 * 60 };
  const secret = 'mysecret';

  // Base64 encoding helper
  function base64url(source) {
    return btoa(JSON.stringify(source)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  }

  // Create JWT (header.payload.signature)
  const encodedHeader = base64url(header);
  const encodedPayload = base64url(payload);
  // For demo, signature is just a hash (not secure, use a library for real apps)
  function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = ((hash << 5) - hash) + str.charCodeAt(i);
    return hash;
  }
  const signature = simpleHash(encodedHeader + '.' + encodedPayload + secret);
  const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;

  // Decode JWT (for demo)
  function decodeJWT(token) {
    const [h, p, s] = token.split('.');
    return {
      header: JSON.parse(atob(h.replace(/-/g, '+').replace(/_/g, '/'))),
      payload: JSON.parse(atob(p.replace(/-/g, '+').replace(/_/g, '/'))),
      signature: s
    };
  }
  const decoded = decodeJWT(jwt);

  return (
    <div className="App">
      <h2>JWT Example</h2>
      <div><strong>JWT:</strong> {jwt}</div>
      <div><strong>Decoded Header:</strong> {JSON.stringify(decoded.header)}</div>
      <div><strong>Decoded Payload:</strong> {JSON.stringify(decoded.payload)}</div>
      <div><strong>Signature:</strong> {decoded.signature}</div>
    </div>
  );
}

export default App;
