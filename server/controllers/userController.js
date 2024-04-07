/*const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = 'https://aibrwsnxbuklshdpwvzv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnJ3c254YnVrbHNoZHB3dnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2Mzc1NTQsImV4cCI6MjAxNTIxMzU1NH0.dIHvOVjRuvG_ja4SgVrLQFDQPrKAjs4g5w0mKue3dlA';


const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction getUsers pour récupérer les utilisateurs depuis la base de données Supabase
async function getUsers(req, res) {
  const { data, error } = await supabase
    .from('user')
    .select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}



module.exports = { getUsers };*/

// userController.js

const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://aibrwsnxbuklshdpwvzv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnJ3c254YnVrbHNoZHB3dnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2Mzc1NTQsImV4cCI6MjAxNTIxMzU1NH0.dIHvOVjRuvG_ja4SgVrLQFDQPrKAjs4g5w0mKue3dlA";

const supabase = createClient(supabaseUrl, supabaseKey);

async function createUser(req, res) {
  const { email, password, firstName, lastName } = req.body; // Assurez-vous d'avoir bodyParser configuré pour traiter les requêtes POST
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    console.log(data);
    if (data.user.id) {
      // Insertion dans la table User
      const { data: user1, error: error1 } = await supabase
        .from("User")
        .insert({
          Email: email,
          Nom: lastName,
          Prenom: firstName,
          user_id: data.user.id, // Access user.id only if user exists
        })
        .single();

      if (error1) {
        return res.status(500).json({ message: "Error creating user." });
      }

      // User created successfully
      return res.status(200).json({ message: "User created successfully." });
    } else {
      return res.status(500).json({ message: "User object is undefined." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}


async function SignInUser(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { data } = await supabase.auth.getSession();

    // Retourner uniquement les données de session dans la )réponse JSON
    console.log(data);
    return res.status(200).json({
      message: "Successfully signed in",
      user: data.session.user,
      access_token: data.session.access_token,
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    return res.status(500).json({ message: error.message });
  }
}
async function signOut(req, res) {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({ message: "Successfully signed out" });
  } catch (error) {
    console.error("Error signing out user:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function DeleteUser(req, res) {
  const { idu } = req.body;
  try {
    const { data, error } = await supabase.from("User").delete().eq("id", idu);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
}

async function getUsers(req, res) {
  try {
    const { data, error } = await supabase.from("User").select("*");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
}
module.exports = { getUsers, createUser, SignInUser, signOut, DeleteUser };
