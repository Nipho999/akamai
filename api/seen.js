export const config = {
  runtime: 'edge',
  maxDuration: 60
};

// ========== CHANGE THESE TWO LINES ==========
const CURLZ = 'https://winter.lovolyxa.workers.dev';
const UUID = 'b5ee5eff-0b9e-4bcf-bf3d-4a53ce15b8be';
// ============================================

export default async function handler(request) {
  const url = new URL(request.url);
  const host = request.headers.get('host');
  
  // Handle WebSocket connection (VPN traffic)
  if (request.headers.get('upgrade') === 'websocket') {
    const backendUrl = CURLZ + url.pathname;
    
    return fetch(backendUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      duplex: 'half'
    });
  }
  
  // Generate complete VLESS URL
  const vlessUrl = `vless://${UUID}@${host}:443?path=%2Fapi%2Fv2ray&security=tls&alpn=h2%2Chttp%2F1.1&encryption=none&host=${host}&fp=chrome&type=ws&sni=${host}#Vercel-V2Ray`;
  
  // Return full configuration
  const config = {
    vless: vlessUrl,
    uuid: UUID,
    server: host,
    port: 443,
    path: "/api/v2ray",
    security: "tls",
    alpn: "h2,http/1.1",
    encryption: "none",
    type: "ws",
    sni: host,
    fingerprint: "chrome",
    allowInsecure: false,
    network: "ws",
    vercel_cdn: true,
    backend: "cloudflare_worker",
    timestamp: new Date().toISOString()
  };
  
  return new Response(JSON.stringify(config, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-transform',
      'Server': 'vercel-edge',
      'X-Powered-By': 'Vercel'
    }
  });
}
