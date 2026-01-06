import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import Document from "./models/document.js";

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

mongoose.connect("mongodb://127.0.0.1:27017/collab-editor");

const defaultValue = "";

io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

async function findOrCreateDocument(id) {
  const doc = await Document.findById(id);
  if (doc) return doc;
  return await Document.create({ _id: id, data: defaultValue });
}

httpServer.listen(3001, () => {
  console.log("Server running on port 3001");
});
