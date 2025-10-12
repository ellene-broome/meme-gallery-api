// controllers/userController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getMemesByUser(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: { memes: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user.memes); // 200 OK
  } catch (err) { next(err); }
}
