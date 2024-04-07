
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://aibrwsnxbuklshdpwvzv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnJ3c254YnVrbHNoZHB3dnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2Mzc1NTQsImV4cCI6MjAxNTIxMzU1NH0.dIHvOVjRuvG_ja4SgVrLQFDQPrKAjs4g5w0mKue3dlA';


const supabase = createClient(supabaseUrl, supabaseKey);




async function DeleteFriend(req, res) {
  const { email, password } = req.body; // Assurez-vous d'avoir bodyParser configuré pour traiter les requêtes POST
  
  try {
    const { user, error } = await supabase.auth.signUp({
      email: "yasminekechid@gmail.com",
      password: "Yasminekechid2002"
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(201).json({ message: 'User created successfully'});
  } catch (error) {
    console.error('Error creating user:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }

}
async function UpdateFriend(req, res) {
    const { email, password } = req.body; // Assurez-vous d'avoir bodyParser configuré pour traiter les requêtes POST
    
    try {
      const { user, error } = await supabase.auth.signUp({
        email: "yasminekechid@gmail.com",
        password: "Yasminekechid2002"
      });
  
      if (error) {
        return res.status(400).json({ message: error.message });
      }
  
      return res.status(201).json({ message: 'User created successfully'});
    } catch (error) {
      console.error('Error creating user:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
  
  }

async function AddFriend(req, res) {
  const { email, password } = req.body;
  
  try {
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email: "kechidyasmine2@gmail.com",
      password: "Yasminekechid2002"
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Retourner uniquement les données de session dans la réponse JSON
    return res.status(200).json({ user, session });
  } catch (error) {
    console.error('Error signing in user:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


async function getlistfriends(req, res) {
  try {
    const { data, error } = await supabase
      .from('user')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}
module.exports = { getlistfriends , UpdateFriend , DeleteFriend , AddFriend};
