"use server";

import { createClient } from "@/lib/supabase/server";

const DUMMY_ARTICLES = [
  {
    title: "Cara Benar Memilah Sampah Plastik",
    slug: "cara-benar-memilah-sampah-plastik",
    content: "Plastik adalah salah satu jenis sampah yang paling sulit terurai. Mari kita pelajari cara memilahnya dengan benar agar mudah didaur ulang...",
    category: "ANORGANIK",
    thumbnail_url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80",
    is_published: true
  },
  {
    title: "Mengolah Sampah Sisa Makanan Menjadi Kompos",
    slug: "mengolah-sampah-makanan-menjadi-kompos",
    content: "Sisa makanan dari dapur Anda dapat diubah menjadi pupuk kompos yang menyuburkan tanaman kesayangan Anda di rumah...",
    category: "ORGANIK",
    thumbnail_url: "https://images.unsplash.com/photo-1558583082-409143c794ca?w=600&q=80",
    is_published: true
  },
  {
    title: "Bahaya Sampah Elektronik (E-Waste)",
    slug: "bahaya-sampah-elektronik",
    content: "Barang elektronik bekas mengandung B3 (Bahan Berbahaya dan Beracun) seperti timbal dan merkuri. Jangan buang sembarangan!",
    category: "B3",
    thumbnail_url: "https://images.unsplash.com/photo-1550081682-1d575c3f6f19?w=600&q=80",
    is_published: true
  }
];

const DUMMY_LOCATIONS = [
  {
    name: "Bank Sampah Berseri",
    type: "BANK_SAMPAH",
    address: "Jl. Melati No. 45, Kebayoran Baru",
    latitude: -6.2415,
    longitude: 106.8042,
    operational_hours: "Senin - Jumat, 08:00 - 15:00",
    accepted_waste_types: "Plastik, Kertas, Logam",
    contact: "0812-3456-7890",
    is_active: true
  },
  {
    name: "TPS Terpadu Merdeka",
    type: "TPS",
    address: "Kawasan Monas, Jakarta Pusat",
    latitude: -6.1754,
    longitude: 106.8272,
    operational_hours: "24 Jam",
    accepted_waste_types: "Semua Jenis",
    contact: "Layanan Pemda",
    is_active: true
  }
];

export async function getArticles() {
  const supabase = createClient();

  // Auto-seed if empty
  const { count } = await supabase.from("education_articles").select("id", { count: "exact", head: true });
  
  if (count === 0) {
    // Get a default admin user ID for author if possible, else just let the DB reject if foreign key is strict.
    // Assuming the user is logged in, we fetch the current user to be the author
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const articlesWithAuthor = DUMMY_ARTICLES.map(a => ({...a, author_id: session.user.id}));
      await supabase.from("education_articles").insert(articlesWithAuthor);
    }
  }

  const { data, error } = await supabase
    .from("education_articles")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
    return { success: false, error: "Gagal memuat artikel." };
  }

  return { success: true, data };
}

export async function getLocations() {
  const supabase = createClient();

  // Auto-seed if empty
  const { count } = await supabase.from("disposal_locations").select("id", { count: "exact", head: true });
  if (count === 0) {
    await supabase.from("disposal_locations").insert(DUMMY_LOCATIONS);
  }

  const { data, error } = await supabase
    .from("disposal_locations")
    .select("*")
    .eq("is_active", true);

  if (error) {
    console.error("Error fetching locations:", error);
    return { success: false, error: "Gagal memuat daftar lokasi." };
  }

  return { success: true, data };
}
