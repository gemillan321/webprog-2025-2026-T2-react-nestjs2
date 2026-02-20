import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function App() {
  const [writeups, setWriteups] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });

  const load = async () => {
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setWriteups(data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await supabase.from("guestbook").insert([form]);
    setForm({ name: "", message: "" });
    load();
  };

  const remove = async (id) => {
    await supabase.from("guestbook").delete().eq("id", id);
    load();
  };

  return (
    <div className="app">

      {/* HERO SECTION */}
      <section className="hero">
        <h1>CTF WRITEUP VAULT</h1>
        <p>Personal archive of exploited binaries, broken web apps, and captured flags.</p>
      </section>

      {/* TERMINAL STYLE PANEL */}
      <section className="terminal">
        <div className="terminal-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="title">vault@ctf:~$</span>
        </div>

        <div className="terminal-body">
          <p>$ whoami</p>
          <p>aspiring security engineer</p>
          <p>$ ls writeups/</p>
          <p>{writeups.length} entries found</p>
        </div>
      </section>

      {/* WRITEUP FORM */}
      <section className="form-section">
        <h2>➕ Add New Writeup</h2>
        <form onSubmit={save}>
          <input
            placeholder="Challenge Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Describe the exploit path, vulnerability type, and tools used..."
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            required
          />

          <button type="submit">Save Writeup</button>
        </form>
      </section>

      {/* WRITEUPS GRID */}
      <section className="grid">
        {writeups.map((entry) => (
          <div key={entry.id} className="card">
            <div className="card-top">
              <h3>🧠 {entry.name}</h3>
              <span>
                {new Date(entry.created_at).toLocaleDateString()}
              </span>
            </div>

            <p>{entry.message}</p>

            <button
              className="delete"
              onClick={() => remove(entry.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>

    </div>
  );
}