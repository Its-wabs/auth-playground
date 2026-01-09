import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.localUsers.upsert({
    where: { email: "admin" },
    update: {
      role: "ADMIN",
    },
    create: {
      email: "admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
