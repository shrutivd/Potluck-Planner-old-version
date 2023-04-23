import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {User} from "../entities/User.js";

export class UserSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      name: "spot",
      email: "email@email.com",
      pet_type: "Dog"
    });
  }

}
