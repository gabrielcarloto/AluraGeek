import { ImgurClient } from "imgur";

export default async function upload(req, res) {
  const client = new ImgurClient({ clientId: process.env.IMGUR_CLIENT_ID });

  const image = req.body;

  const imgurRes = await client.upload({
    image: image.replace(/^data:image\/\w+;base64,/, ""),
    type: "base64",
  });

  res.json(imgurRes.data);
}
