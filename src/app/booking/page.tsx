"use client";

import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

import Navbar from "@/components/ui/Navbar";
import Button from "@/components/ui/Button";

/* SUPABASE CLIENT */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface FormData {
  name: string;
  email: string;
  service: string;
  date: string;
}

const SERVICES = [
  "AI-Powered Automation",
  "System Integration",
  "Content Trimming",
  "Brand Styling",
  "Smart Insights",
  "Custom Tooling",
];

const INITIAL: FormData = {
  name: "",
  email: "",
  service: "",
  date: "",
};

export default function BookingPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  const [form, setForm] = useState<FormData>(INITIAL);
  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!isLoaded) return null;

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const missing =
      !form.name.trim() ||
      !form.email.trim() ||
      !form.service.trim() ||
      !form.date.trim();

    if (missing) {
      setErrorToast(true);
      setTimeout(() => setErrorToast(false), 3000);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            name: form.name,
            email: form.email,
            service: form.service,
            date: form.date,
          },
        ]);

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        setErrorToast(true);
        setTimeout(() => setErrorToast(false), 3000);
      } else {
        setShowToast(true);
        setForm(INITIAL);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-violet-500";

  const labelClass = "block text-sm text-zinc-400 mb-1.5";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 text-white pt-16">
        <div className="max-w-xl mx-auto px-6 py-24">
          <Button
            variant="outline"
            className="mb-6"
            onClick={() => router.push("/")}
          >
            ← Back to Home
          </Button>

          <h1 className="text-3xl font-bold mb-6">
            Book a Service
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Service</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select a service</option>
                {SERVICES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Preferred Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </Button>
          </form>
        </div>
      </main>

      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999]">
          Booking confirmed successfully 🚀
        </div>
      )}

      {errorToast && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999]">
          Something went wrong ⚠️
        </div>
      )}
    </>
  );
}