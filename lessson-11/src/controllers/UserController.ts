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
import { ValidateArgs } from "../decorators/validator";
import * as fs from "fs/promises";

interface User {
  id: number;
  user: string;
  email: string;
}

const USERS_FILE = "../users.json";

async function readUsersFromFile(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data) as User[];
  } catch {
    return [];
  }
}

async function writeUsersToFile(users: User[]): Promise<void> {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

@JsonController("/users")
export class UserController {
  @Get("/")
  async getAll() {
    return await readUsersFromFile();
  }

  @Get("/:id")
  @OnUndefined(404)
  async getOne(@Param("id") id: number) {
    const users = await readUsersFromFile();
    return users.find((user) => user.id === id);
  }

  @Post("/")
  @ValidateArgs("Validate new user")
  async create(@Body() newUser: { user: string; email: string }) {
    const users = await readUsersFromFile();

    const user: User = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      user: newUser.user,
      email: newUser.email,
    };

    users.push(user);
    await writeUsersToFile(users);

    return { message: "User created", user };
  }

  @Patch("/:id")
  @ValidateArgs("Validate updated user")
  async update(
    @Param("id") id: number,
    @Body() updatedData: { user?: string; email?: string }
  ) {
    const users = await readUsersFromFile();
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return { message: "User not found" };
    }

    if (updatedData.user) users[userIndex].user = updatedData.user;
    if (updatedData.email) users[userIndex].email = updatedData.email;

    await writeUsersToFile(users);
    return { message: "User updated", user: users[userIndex] };
  }

  @Delete("/:id")
  @OnUndefined(404)
  async delete(@Param("id") id: number) {
    const users = await readUsersFromFile();
    const newUsers = users.filter((user) => user.id !== id);

    if (users.length === newUsers.length) {
      return { message: "User not found" };
    }

    await writeUsersToFile(newUsers);
    return { message: "User deleted successfully" };
  }
}
