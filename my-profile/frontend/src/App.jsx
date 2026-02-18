import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  // Load all guestbook entries
  const load = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading entries:', error);
      return;
    }
    setEntries(data);
  };

  useEffect(() => {
    load();
  }, []);

  // Save a new entry
  const save = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('guestbook').insert([form]);
    if (error) {
      console.error('Error saving entry:', error);
      return;
    }
    setForm({ name: '', message: '' });
    load();
  };

  // Delete an entry
  const remove = async (id) => {
    const { error } = await supabase.from('guestbook').delete().eq('id', id);
    if (error) {
      console.error('Error deleting entry:', error);
      return;
    }
    load();
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h1>My Profile & Guestbook</h1>
      <form onSubmit={save}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <button type="submit">Sign Guestbook</button>
      </form>
      <hr />
      {entries.map((e) => (
        <div key={e.id}>
          <p>
            <strong>{e.name}</strong>: {e.message}
          </p>
          <button onClick={() => remove(e.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
