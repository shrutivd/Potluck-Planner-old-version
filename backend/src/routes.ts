import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import app from "./app.js";
import {User} from "./db/entities/User.js";
import {ICreateUsersBody} from "./types.js";



async function DoggrRoutes(app:FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}
	
	app.get('/hello', async (request: FastifyRequest, reply: FastifyReply) => {
		return 'hello';
	});
	
	app.get("/dbTest", async (request: FastifyRequest, reply: FastifyReply) => {
		return request.em.find(User, {});
	});
	
	
	
	app.post<{
		Body: ICreateUsersBody;
	}>("/user", async (req, reply) => {
		const {name, email, pet_type} = req.body;
		try {
			const newUser = await req.em.create(User, {
				name,
				email,
				pet_type
			});
			
			await req.em.flush();
			
			console.log("created new user:", newUser);
			return reply.send(newUser);
		}catch (err){
			console.log("failed to create new user", err.message);
			return reply.status(500).send({message: err.message});
		}
		
	});
}
	
	export default DoggrRoutes;
	
