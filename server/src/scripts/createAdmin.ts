import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Role, UserStatus } from '../constants';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@hrms.com';
    const password = 'admin';

    // Check if admin already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.log(`User with email ${email} already exists.`);
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
            role: Role.SUPER_ADMIN,
            status: UserStatus.ACTIVE,
        },
    });

    console.log(`SUPER_ADMIN created successfully:`);
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${password}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
