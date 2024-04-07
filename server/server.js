/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);


const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fmwjoeisxodqrjyrlwsx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI';

const supabase = createClient(supabaseUrl, supabaseKey);
const { getUsers } = require('./controllers/userController'); // Importez la fonction getUsers depuis votre contrôleur


// Exemple d'utilisation dans un contrôleur
app.get('/api/users', getUsers);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 








// server.js
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/ChatRoutes");
const InvitationRoutes = require("./routes/InvitationRoutes");
const MessageRoutes = require("./routes/MessageRoutes");
const FriendRoutes = require("./routes/FriendRoutes");
const cors = require("cors");

const app = express();

const supabaseUrl = "https://fmwjoeisxodqrjyrlwsx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI";

const supabase = createClient(supabaseUrl, supabaseKey);
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/Invitation", InvitationRoutes);
app.use("/Friends", FriendRoutes);
app.use("/Message", MessageRoutes);

//sockets
const http = require("http");

//initialiser un server sockets
const server = http.createServer(app);
//pour ecouter les cnx entrantes du client
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000", // Autoriser les connexions depuis ce domaine
    methods: ["GET", "POST"], // Autoriser les méthodes HTTP GET et POST
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  // Envoyer un message de bienvenue au nouveau client
  socket.emit("id", socket.id);

  // Gestion de la réception des messages
  socket.on("send message", (data) => {
    // Ajoutez async ici
    console.log("Message received from client:", data);
    io.emit(`message-${data.chat}`, data);
    
  });
  // Gestion de la déconnexion des clients
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const io = require('socket.io')(server);
module.exports = { app, server, io };
*/


const express = require("express");
const morgan = require('morgan');
const { createServer } = require("https");
const { readFileSync } = require("fs");
const { createClient } = require("@supabase/supabase-js");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/ChatRoutes");
const InvitationRoutes = require("./routes/InvitationRoutes");
const MessageRoutes = require("./routes/MessageRoutes");
const FriendRoutes = require("./routes/FriendRoutes");
const cors = require("cors");
const http = require("http");

const app = express();

const supabaseUrl = "https://fmwjoeisxodqrjyrlwsx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd2pvZWlzeG9kcXJqeXJsd3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzNzg4NTIsImV4cCI6MTk5Mzk1NDg1Mn0.gaYaCq2CMilnhB2OPYQLQbdSVjzlBw-DiKyl8RfJ1KI";

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/Invitation", InvitationRoutes);
app.use("/Friends", FriendRoutes);
app.use("/Message", MessageRoutes);

// Configuration pour HTTPS
const options = {
  key: readFileSync('key.pem'),
  cert: readFileSync('cert.pem')
};
app.use(morgan('dev'));
// Créer un serveur HTTPS avec les options
const httpsServer = createServer(options, app);

// Créer un serveur HTTP pour rediriger automatiquement vers HTTPS
const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
});

// Ecouter les requêtes HTTP et rediriger automatiquement vers HTTPS
httpServer.listen(80);

// Ecouter les requêtes HTTPS
httpsServer.listen(443, () => {
  console.log("Server running on port 443");
});

//sockets
const io = require("socket.io")(httpsServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("id", socket.id);

  socket.on("send message", (data) => {
    console.log("Message received from client:", data);
    io.emit(`message-${data.chat}`, data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

module.exports = { app, httpsServer, io };
