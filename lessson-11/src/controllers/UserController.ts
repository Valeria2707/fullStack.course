import "reflect-metadata";
import {
  JsonController,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  OnUndefined,
} from "routing-controllers";
import { User } from "../entity/User";
import { AppDataSource } from "../ormconfig";

@JsonController("/users")
export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  @Get("/")
  async getAll() {
    return await this.userRepository.find();
  }

  @Get("/:id")
  @OnUndefined(404)
  async getOne(@Param("id") id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  @Post("/")
  async create(@Body() newUser: { name: string; email: string }) {
    const user = this.userRepository.create({
      name: newUser.name,
      email: newUser.email,
    });

    await this.userRepository.save(user);

    return { message: "User created", user };
  }

  @Patch("/:id")
  @OnUndefined(404)
  async update(
    @Param("id") id: string,
    @Body() updatedData: { name?: string; email?: string }
  ) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return { message: "User not found" };
    }

    if (updatedData.name) user.name = updatedData.name;
    if (updatedData.email) user.email = updatedData.email;

    await this.userRepository.save(user);

    return { message: "User updated", user };
  }

  @Delete("/:id")
  @OnUndefined(404)
  async delete(@Param("id") id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return { message: "User not found" };
    }

    await this.userRepository.remove(user);

    return { message: "User deleted successfully" };
  }
}
