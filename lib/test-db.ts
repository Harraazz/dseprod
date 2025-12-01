import { prisma } from './prisma';

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('✅ Connected to DB!');
    console.log('Users:', users);
  } catch (err) {
    console.error('❌ Failed to connect:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();