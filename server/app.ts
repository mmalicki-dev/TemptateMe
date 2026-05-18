import express from "express";
import { port } from "./src/config/index.js";
import loader from "./src/loaders/index.js";

const app = express();

await loader(app);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

export default app;
