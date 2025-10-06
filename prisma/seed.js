// prisma/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // start clean so can be re-run the seed safely
  await prisma.meme.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: { username: 'alice', password: 'pass1' }
  });
  const bob = await prisma.user.create({
    data: { username: 'bob', password: 'pass2' }
  });

  await prisma.meme.createMany({
    data: [
      { title: 'Distracted Boyfriend', url: 'https://i.imgur.com/example1.jpg', userId: alice.id },
      { title: 'Success Kid',          url: 'https://i.imgur.com/example2.jpg', userId: alice.id },
      { title: 'Doge',                  url: 'https://i.imgur.com/example3.jpg', userId: bob.id   },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); return prisma.$disconnect(); });
