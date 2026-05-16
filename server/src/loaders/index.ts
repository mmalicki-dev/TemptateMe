import mongooseLoader from "./mongoose.js";
import expressLoader from "./express.js";

const app = async (app) => {
  await mongooseLoader();
  expressLoader(app);
};

export default app;
