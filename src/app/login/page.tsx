"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Button from "@/components/ui/Button";

interface FormData {
  email: string;
  password: string;
}

const INITIAL: FormData = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [success, setSuccess] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const missing = !form.email.trim() || !form.password.trim();
    if (missing) return;

    console.log("Login data:", form);
    setSuccess(true);
    setForm(INITIAL);
  }

  const inputClass =
    "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-violet-500 transition-colors duration-200";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 text-white pt-16 flex items-center justify-center">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-xl p-8">

          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={inputClass}
            />

            <Button type="submit" className="w-full mt-2">
              Login
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>

            {success && (
              <p className="text-green-400 text-center mt-2">
                Login successful 🚀
              </p>
            )}

          </form>
        </div>
      </main>
    </>
  );
}