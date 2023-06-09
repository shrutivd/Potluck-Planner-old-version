import Fastify, {FastifyReply, FastifyRequest} from "fastify";
import {User} from "./db/entities/User.js";
import config from "./db/mikro-orm.config.js";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";
import DoggrRoutes from "./routes.js";

const app = Fastify();

await app.register(FastifyMikroOrmPlugin, config);

await app.register(DoggrRoutes);

export default app;
