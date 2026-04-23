export const config = {
  runtime: 'edge',
  maxDuration: 60
};

const UUID = 'b5ee5eff-0b9e-4bcf-bf3d-4a53ce15b8be';
const PATH = '/91.227.40.125-8443';
const BACKEND = 'winter.lovolyxa.workers.dev';

export default async function handler(request) {
  const host = request.headers.get('host');

  const vlessUrl = `vless://${UUID}@${host}:443?path=%2Fapi%2Fv2ray&security=tls&alpn=h2%2Chttp%2F1.1&encryption=none&host=${host}&fp=chrome&type=ws&sni=${host}#Vercel-V2Ray`;

  const responseData = {
    vless: vlessUrl,
    uuid: UUID,
    server: host,
    port: 443,
    path: PATH,
    security: "tls",
    alpn: "h2,http/1.1",
    encryption: "none",
    type: "ws",
    sni: host,
    fingerprint: "chrome",
    allowInsecure: false,
    network: "ws",
    vercel_cdn: true,
    backend: BACKEND,
    timestamp: new Date().toISOString()
  };

  return new Response(JSON.stringify(responseData, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache, no-transform"
    }
  });
}
