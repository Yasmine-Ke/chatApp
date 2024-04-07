const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://aibrwsnxbuklshdpwvzv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnJ3c254YnVrbHNoZHB3dnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2Mzc1NTQsImV4cCI6MjAxNTIxMzU1NH0.dIHvOVjRuvG_ja4SgVrLQFDQPrKAjs4g5w0mKue3dlA";

const supabase = createClient(supabaseUrl, supabaseKey);

//chat

async function createChat(Title, From, type) {
  try {
    const user = await supabase.from("User").select("id").eq("user_id", From);
    if (user.data.length > 0) {
      const { data, error } = await supabase
        .from("Chat")
        .insert({
          Admin: user.data[0].id,
          Titre: Title,
          State: "down",
          type: type,
        })
        .select();

      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      return { chatId: data[0].id, userId: user.data[0].id };
    }
  } catch (error) {
    console.error("Error creating chat:", error.message);
    throw new Error("Failed to create chat");
  }
}

async function Sentinvitchat(req, res) {
  const { Title, From, DestEmail } = req.body;

  try {
    const { chatId, userId } = await createChat(Title, From);

    if ((chatId, userId)) {
      const destination = await supabase
        .from("User")
        .select("id")
        .eq("Email", DestEmail);
      await supabase.from("Member").insert({ id: userId, chatId: chatId });

      if (destination.data[0].id) {
        const { error: inviteError } = await supabase
          .from("Invitation")
          .insert({
            From: userId,
            idchat: chatId,
            To: destination.data[0].id,
          });

        if (inviteError) {
          console.error("Error sending invitation:", inviteError.message);
          return res.status(500).json({ message: "Internal server error" });
        }

        return res
          .status(200)
          .json({ message: "Invitation sent successfully", chatId });
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function RejectInvit(req, res) {
  const { idchat, id } = req.body;
  try {
    const { data, error } = await supabase
      .from("Chat")
      .delete()
      .eq("id", idchat);
    await supabase.from("Invitation").delete().eq("id", id);

    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.error("Error updating invitation:", error.message);
    res.status(500).json({ error: "Error updating invitation" });
  }
}
async function AcceptInvit(req, res) {
  const { idchat, newMember, id } = req.body;
  try {
    const { data, error } = await supabase
      .from("Chat")
      .update({ State: "up" })
      .eq("id", idchat);
    const addedMember = await supabase.from("Member").insert({
      chatId: idchat,
      id: newMember,
    });
    await supabase.from("Invitation").delete().eq("id", id);
    if (error || addedMember.status === 400) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.error("Error updating invitation:", error.message);
    res.status(500).json({ error: "Error updating invitation" });
  }
}

async function getInvitations(req, res) {
  try {
    const { id } = req.body;
    const user = await supabase.from("User").select("id").eq("user_id", id);

    let { data, error } = await supabase
      .from("Invitation")
      .select("*")
      .eq("To", user.data[0].id);
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const chatData = await supabase
        .from("Chat")
        .select("*")
        .eq("id", data[i].idchat);

      const fromUserData = await supabase
        .from("User")
        .select("*")
        .eq("id", data[i].From);

      const toUserData = await supabase
        .from("User")
        .select("*")
        .eq("id", data[i].To);

      data[i].chat_data = chatData.data[0]; // Assuming you expect only one record for each chat id
      data[i].from_user = fromUserData.data[0];
      data[i].to_user = toUserData.data[0];
    }

    // Now 'data' will contain objects where the foreign key fields are populated with their respective table data

    //format the data from numbers to name and emails

    res.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
}

//groupe

// async function createGroup(Title, Admin) {
//   try {
//     const { data, error } = await supabase
//       .from("Groupe")
//       .insert({ Titre: Title, From: Admin })
//       .select();

//     if (error) {
//       throw error;
//     }

//     return data[0].id;
//   } catch (error) {
//     console.error("Error creating group:", error.message);
//     throw new Error("Failed to create group");
//   }
// }

async function sendGroupInvitation(req, res) {
  const { Title, From, members } = req.body;

  try {
    let groupId = req.body?.idGroup;

    if (!groupId) {
      const newGrp = await createChat(Title, From, "channel");
      groupId = newGrp.chatId;
    }
    await supabase.from("Member").insert({ id: From, chatId: groupId });

    for (const member of members) {
      const memberInfo = await supabase
        .from("User")
        .select("id")
        .eq("Email", member)
        .single();
      await supabase
        .from("Invitation")
        .insert({ idchat: groupId, From: From, To: memberInfo.data.id });
    }

    return res
      .status(200)
      .json({ message: "Group invitation sent successfully", groupId });
  } catch (error) {
    console.error("Error sending group invitation:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function AcceptInvitGroupe(req, res) {
  // jsp quoi faire ?
}

module.exports = {
  getInvitations,
  sendGroupInvitation,
  RejectInvit,
  AcceptInvit,
  Sentinvitchat,
  AcceptInvitGroupe,
};
