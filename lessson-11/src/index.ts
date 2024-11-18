import * as fs from "fs/promises";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

const USERS_FILE = "./users.json";

interface User {
  id: number;
  user: string;
  email: string;
}

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

app.get("/", (req: Request, res: Response) => {
  res.json({ author: "Valeriia" });
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await readUsersFromFile();
  res.json(users);
});

app.post("/users", async (req: Request, res: Response) => {
  const { user, email } = req.body;

  if (!user || !email) {
    return res.status(400).json({ message: "Invalid user or email" });
  }

  const users = await readUsersFromFile();
  const newUser: User = { id: users.length + 1, user, email };
  users.push(newUser);
  await writeUsersToFile(users);

  res.status(201).json(newUser);
});

app.patch("/users/:id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { user, email } = req.body;

  if (!user && !email) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  const users = await readUsersFromFile();
  const userIndex = users.findIndex((user) => user.id === Number(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user) users[userIndex].user = user;
  if (email) users[userIndex].email = email;

  await writeUsersToFile(users);

  res.json(users[userIndex]);
});

app.delete(
  "/users/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const users = await readUsersFromFile();
    const newUsers = users.filter((user) => user.id !== Number(id));

    if (users.length === newUsers.length) {
      return res.status(404).json({ message: "User not found" });
    }

    await writeUsersToFile(newUsers);

    res.json({ message: "User deleted successfully" });
  }
);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
