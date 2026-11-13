"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { safeNext } from "@/lib/studentAuth";

// Google and email-link logins come back here. The Supabase client swaps the
// ?code=... for a session on its own; we just wait for it and move on.
function CallbackInner() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const next = safeNext(params.get("next"));
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const err = params.get("error_description") || hash.get("error_description");
    const back = (msg: string) => router.replace(`/login?next=${encodeURIComponent(next)}&error=${encodeURIComponent(msg)}`);
    if (err) { back(err.replace(/\+/g, " ")); return; }
    if (!supabase) { router.replace("/login"); return; }

    let done = false;
    const finish = (ok: boolean) => {
      if (done) return; done = true;
      // The login page asks new students for their name, then continues to `next`.
      if (ok) router.replace(`/login?next=${encodeURIComponent(next)}`);
      else back("Login link expired or was opened in a different browser. Please try again.");
    };
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => { if (session) finish(true); });
    supabase.auth.getSession().then(({ data }) => { if (data.session) finish(true); });
    const t = setTimeout(() => {
      supabase!.auth.getSession().then(({ data }) => finish(!!data.session));
    }, 8000);
    return () => { clearTimeout(t); sub.subscription.unsubscribe(); };
  }, [params, router]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 pt-24 text-slate-500">
      <Loader2 className="animate-spin text-blue-600" />
      <p className="text-sm">Logging you in…</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return <Suspense fallback={null}><CallbackInner /></Suspense>;
}
