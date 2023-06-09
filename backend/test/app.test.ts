import 'chai/register-should.js';  //using should style

import {test, teardown} from "tap";
import {faker} from "@faker-js/faker";
import app from '../src/app.js';

teardown( () => app.close());

test("Request the /hello route", async ()=>{
	const response = await app.inject({
	 method:'GET',
	 url: '/hello'
	});
	
	response.statusCode.should.equal(200);
	response.body.should.equal("hello");
});


test("List all users from /dbTest", async ()=>{
	const response = await app.inject({
		method:'GET',
		url: '/dbTest'
	});
	
	response.statusCode.should.equal(200);
});

test("Creating a new user", async ()=>{
	const payload ={
		name: "testname",
		email: faker.internet.email(),
		pet_type: "Dog"
	};
	
	const response = await app.inject({
		method: "POST",
		url: "/user",
		payload
	});
	response.statusCode.should.equal(200);
	response.payload.should.not.equal(payload);
	const resPayload = response.json();
	resPayload.email.should.equal(payload.email);
	resPayload.pet_type.should.equal("Dog");
	
});
