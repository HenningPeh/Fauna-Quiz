import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

serve(async (req) => {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Authorization,Content-Type",
  });

  if (req.method === "OPTIONS") return new Response(null, { headers, status: 204 });

  try {
    const url = new URL(req.url);
    const path = url.searchParams.get("path");

    if (!path) {
      return new Response(JSON.stringify({ error: "Ungültiger path-Parameter" }), { status: 400, headers });
    }

    // 🔑 Bucket immer "Detail"
    const { data, error } = await supabase.storage
      .from("Detail")
      .createSignedUrl(path, 60); // 60 Sekunden gültig

    if (error || !data?.signedUrl) {
      return new Response(JSON.stringify({ error: error?.message || "Datei nicht gefunden" }), { status: 404, headers });
    }

    return new Response(JSON.stringify({ url: data.signedUrl }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err?.message || String(err) }), { status: 500, headers });
  }
});
