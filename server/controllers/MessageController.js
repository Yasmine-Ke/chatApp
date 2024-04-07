const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://aibrwsnxbuklshdpwvzv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnJ3c254YnVrbHNoZHB3dnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2Mzc1NTQsImV4cCI6MjAxNTIxMzU1NH0.dIHvOVjRuvG_ja4SgVrLQFDQPrKAjs4g5w0mKue3dlA";

const supabase = createClient(supabaseUrl, supabaseKey);

async function DeleteMessage(req, res) {
  // Assurez-vous d'avoir bodyParser configuré pour traiter les requêtes POST

  const { idM } = req.body;

  try {
    const { data, error } = await supabase
      .from("Message")
      .delete()
      .eq("id", idM);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Retourner uniquement les données de session dans la réponse JSON
    return res.status(200).json({ user, session });
  } catch (error) {
    console.error("Error signing in user:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function UpdateMesssage(req, res) {
  const { Contenu, date, heure, idM } = req.body;

  try {
    const { data, error } = await supabase
      .from("Message")
      .update({
        Contenu: Contenu,
        date: date,
        heure: heure,
      })
      .eq("id", idM);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Retourner uniquement les données de session dans la réponse JSON
    return res.status(200).json({ user, session });
  } catch (error) {
    console.error("Error signing in user:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function Addmessage(req, res) {
  const { content, date, heure, sender, chatId } = req.body;

  try {
    const { data, error } = await supabase
      .from("Message")
      .insert({
        Content: content,
        chat: chatId,
        date: date,
        heure: heure,
        sender: sender,
      })
      .select();

    const userRes = await supabase
      .from("User")
      .select("*")
      .eq("user_id", sender)
      .single();
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Diffuser le message à tous les clients connectés
    // io.emit("message", { content, date, heure, sender });
    // Retourner uniquement les données de session dans la réponse JSON
    const response = {
      ...data[0],
      userInfo: userRes.data,
    };
    console.log(response);
    return res.status(201).json(response);
  } catch (error) {
    console.error("Error signing in user:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getMessage(req, res) {
  const { chatId } = req.body;
  try {
    const { data, error } = await supabase
      .from("Message")
      .select("*")
      .eq("chat", chatId);
    if (data.length > 0) {
      for (let i = 0; i < data?.length; i++) {
        const userData = await supabase
          .from("User")
          .select("*")
          .eq("user_id", data[i].sender);
        data[i].userInfo = userData.data[0];
      }
      if (error) throw error;
      res.json(data);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
}
module.exports = { getMessage, Addmessage, UpdateMesssage, DeleteMessage };
