export const config = {
  runtime: 'edge',
  maxDuration: 60
};

const UUID = 'eb43d7a0-8c4b-4cbb-9db9-5b7aba925d93';
const PATH = '/v2ray';
const BACKEND = 'free1.landofn4.loseyourip.com';

export default async function handler(request) {
  const host = request.headers.get('host');

  const vlessUrl = `vless://${UUID}@${host}:443?path=%2Fv2ray&security=tls&alpn=h2%2Chttp%2F1.1&encryption=none&host=${host}&fp=chrome&type=ws&sni=${host}#Vercel-V2Ray`;

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
