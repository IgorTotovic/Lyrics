import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const api_URL = "https://api.lyrics.ovh/v1/";

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  const artist = req.body.artist;
  const song = req.body.song;
  let lyrics = "";

  try {
    const result = await axios.get(`${api_URL}${artist}/${song}`);
    lyrics = result.data.lyrics || "lyrics not found";
  } catch (error) {
    lyrics = "Lyrics not found.";
  }

  res.render("index.ejs", {
    lyrics: lyrics,
    songName: song,
    artistName: artist,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
