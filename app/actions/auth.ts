"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === "true") {
      console.warn("⚠️ Supabase is disabled - sign in bypassed");
      revalidatePath("/", "layout");
      redirect("/dashboard");
      return;
    }
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === "true") {
      console.warn("⚠️ Supabase is disabled - sign up bypassed");
      revalidatePath("/", "layout");
      redirect("/dashboard");
      return;
    }
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();

  if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE === "true") {
    console.warn("⚠️ Supabase is disabled - sign out bypassed");
  }

  revalidatePath("/", "layout");
  redirect("/auth/login");
}

import { revalidatePath } from "next/cache";
