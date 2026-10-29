"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container, MockBanner, SectionHeading } from "@/components/ui/container";
import { Field, inputClass } from "@/components/ui/field";
import { mockAdmin } from "@/lib/config";
import { useAuth } from "@/lib/store/auth";
import { useToast } from "@/lib/store/toast";

export function LoginForm({ nextPath = "/account" }: { nextPath?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const { push } = useToast();
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) {
      push({ title: "Sign in failed", description: json.error, tone: "error" });
      return;
    }
    setUser(json.user);
    router.push(json.user.role === "admin" ? "/admin" : nextPath);
  }

  return (
    <Container className="max-w-lg py-16">
      <SectionHeading eyebrow="Account" title="Sign in" />
      <MockBanner>
        Demo authentication. Customer accounts are created locally. Admin uses{" "}
        {mockAdmin.email} / the configured demo password.
      </MockBanner>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <Field label="Email">
          <input className={inputClass()} value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password">
          <input type="password" className={inputClass()} value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
        <p className="text-sm text-muted">
          New here? <a className="underline" href="/account/register">Create an account</a>
        </p>
      </form>
    </Container>
  );
}

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const { push } = useToast();
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });
    const json = await res.json();
    if (!res.ok) {
      push({ title: "Could not register", description: json.error, tone: "error" });
      return;
    }
    setUser(json.user);
    router.push("/account");
  }

  return (
    <Container className="max-w-lg py-16">
      <SectionHeading eyebrow="Account" title="Create an account" />
      <MockBanner>Demo registration only. Connect Supabase Auth before treating this as a real customer account.</MockBanner>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <Field label="Name">
          <input className={inputClass()} value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Email">
          <input type="email" className={inputClass()} value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Phone">
          <input className={inputClass()} value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
        <Field label="Password">
          <input type="password" className={inputClass()} value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </Container>
  );
}
