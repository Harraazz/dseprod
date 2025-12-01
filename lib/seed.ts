import { prisma } from "./prisma";
import bcryptjs from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const pass = await bcryptjs.hash("admin123", 10);

  const user = await prisma.user.create({

    data: {
      name: "Admin",
      email: "admin@dse.com",
      password: pass,
      role: "ADMIN",
    },
  });
   console.log('Created user:', user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
