"use client";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function NewsletterPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1500);
    };

    return (
        <Container className="py-24 max-w-xl text-center">
            <SectionHeader
                title="Newsletter"
                description="Get the latest updates on my projects and writings."
                className="mb-8 items-center"
            />

            <div className="bg-white/5 border border-white/5 rounded-2xl p-8">
                {status === "success" ? (
                    <div className="flex flex-col items-center gap-4 py-8 animate-in fade-in zoom-in duration-300">
                        <div className="p-3 bg-green-500/10 rounded-full">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Subscribed!</h3>
                        <p className="text-zinc-400">Thank you for joining the newsletter.</p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="text-sm text-brand-red hover:underline mt-2"
                        >
                            Reset form
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 text-left">
                            <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                            Subscribe
                        </button>
                        <p className="text-xs text-zinc-500 mt-2">
                            No spam. Unsubscribe at any time.
                        </p>
                    </form>
                )}
            </div>
        </Container>
    );
}
