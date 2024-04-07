const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://aibrwsnxbuklshdpwvzv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnJ3c254YnVrbHNoZHB3dnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2Mzc1NTQsImV4cCI6MjAxNTIxMzU1NH0.dIHvOVjRuvG_ja4SgVrLQFDQPrKAjs4g5w0mKue3dlA";

const supabase = createClient(supabaseUrl, supabaseKey);

async function getChats(req, res) {
  try {
    const { id, type } = req.body;
    const user = await supabase
      .from("User")
      .select("id")
      .eq("user_id", id)
      .single();

    let chatList = [];
    const { data, error } = await supabase
      .from("Member")
      .select("*")
      .eq("id", user.data.id);
    for (let i = 0; i < data.length; i++) {
      const chatsResponse = await supabase
        .from("Chat")
        .select("*")
        .eq("State", "up")
        .eq("id", data[i].chatId)
        .eq("type", type);
      if (chatsResponse.data[0]) {
        chatList.push(chatsResponse?.data[0]);
      }
    }

    if (error) throw error;

    console.log(chatList);

    res.json(chatList);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
}
module.exports = { getChats };
