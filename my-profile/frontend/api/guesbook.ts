// my-profile/frontend/api/guestbook.ts
import { createClient } from '@supabase/supabase-js';

// Supabase env variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Use generic types for req/res
export default async function handler(req: any, res: any) {
  try {
    switch (req.method) {
      case 'GET': {
        const { data, error } = await supabase
          .from('guestbook')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
      }

      case 'POST': {
        const { name, message } = req.body;

        if (!name || !message) {
          return res.status(400).json({ error: 'Name and message are required' });
        }

        const { data, error } = await supabase
          .from('guestbook')
          .insert([{ name, message }]);

        if (error) return res.status(500).json({ error: error.message });
        return res.status(201).json(data);
      }

      case 'DELETE': {
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ error: 'ID is required for deletion' });
        }

        const { data, error } = await supabase
          .from('guestbook')
          .delete()
          .eq('id', id);

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
