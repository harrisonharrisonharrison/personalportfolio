import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  try {
    const payload = await req.json();

    const visitor = payload.record;

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "harrisontran357@gmail.com",
      subject: `[ALERT] New Visitor from ${visitor.city || "Unknown"}`,
      html: `
        <div style="font-family: 'Courier New', Courier, monospace; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0a0a0a; color: #e5e5e5; border: 1px solid #262626; border-radius: 8px;">
          
          <h2 style="color: #ef4444; border-bottom: 1px solid #262626; padding-bottom: 12px; margin-top: 0; font-weight: normal; letter-spacing: 1px;">
            SYSTEM_ALERT: NEW_VISITOR
          </h2>
          
          <div style="padding: 10px 0;">
            <p style="margin: 12px 0; font-size: 15px;">
              <span style="color: #737373; display: inline-block; width: 100px;">LOCATION:</span> 
              <strong style="color: #ffffff; font-weight: normal;">[ ${visitor.city || "Unknown"}, ${visitor.region || "Unknown"}, ${visitor.country || "Unknown"} ]</strong>
            </p>
            
            <p style="margin: 12px 0; font-size: 15px;">
              <span style="color: #737373; display: inline-block; width: 100px;">SOURCE:</span> 
              <strong style="color: #a3e635; font-weight: normal;">${visitor.referrer || "Direct Link / Bookmark"}</strong>
            </p>
            
            <p style="margin: 12px 0; font-size: 15px;">
              <span style="color: #737373; display: inline-block; width: 100px;">IP_ADDRESS:</span> 
              <strong style="color: #ffffff; font-weight: normal;">${visitor.ip_address || "Unknown"}</strong>
            </p>
          </div>
          
          <div style="margin-top: 32px; font-size: 12px; color: #525252; border-top: 1px solid #262626; padding-top: 16px;">
            This is an automated notification from your Supabase Edge Function.
          </div>
          
        </div>
      `,
    });

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
