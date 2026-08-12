"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setSubmitting(false);
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? "Login failed");
      return;
    }
    const next = searchParams.get("next") || "/admin/leads";
    router.push(next);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-line bg-white p-6"
      >
        <p className="text-xl font-extrabold text-forest">Paint Mate</p>
        <p className="mt-0.5 text-sm text-ink-muted">Staff admin sign in</p>

        <label className="mt-5 block text-xs font-bold text-ink-muted" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest"
        />
        {error && <p className="mt-2 text-sm font-semibold text-brand-pink">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 w-full rounded-full bg-forest py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
