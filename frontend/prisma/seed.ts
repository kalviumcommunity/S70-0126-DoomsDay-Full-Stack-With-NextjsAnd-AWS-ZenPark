import { PrismaClient } from '../lib/generated/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { hash } from 'bcryptjs';

const connectionString = process.env.DATABASE_URL || "postgresql://zenuser:zenpassword@localhost:5433/zenpark?schema=public";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
    // Create Main Storage Site
    const techPark = await prisma.site.create({
        data: {
            name: "Tech Park Plaza",
            address: "123 Innovation Blvd",
            pricingRules: {
                create: {
                    basePrice: 10.0,
                    isDynamic: true,
                    surgeMultiplier: 1.5
                }
            },
            slots: {
                createMany: {
                    data: [
                        { label: "A1", type: "STANDARD", pricePerHour: 10, x: 0, y: 0, status: "FREE" },
                        { label: "A2", type: "STANDARD", pricePerHour: 10, x: 1, y: 0, status: "OCCUPIED" },
                        { label: "A3", type: "VIP", pricePerHour: 20, x: 2, y: 0, status: "FREE" },
                        { label: "B1", type: "EV", pricePerHour: 15, x: 0, y: 1, status: "FREE" },
                        { label: "B2", type: "HANDICAP", pricePerHour: 10, x: 1, y: 1, status: "FREE" },
                    ]
                }
            }
        },
    });

    const mall = await prisma.site.create({
        data: {
            name: "City Mall Basement",
            address: "45 Shopping Ctr",
            slots: {
                createMany: {
                    data: [
                        { label: "C1", type: "STANDARD", pricePerHour: 5, x: 0, y: 0 },
                        { label: "C2", type: "STANDARD", pricePerHour: 5, x: 1, y: 0 },
                    ]
                }
            }
        }
    });



    const passwordHash = await hash('password123', 10);

    // Create Admin User
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@zenpark.com' },
        update: {},
        create: {
            email: 'admin@zenpark.com',
            name: 'Zen Admin',
            password: passwordHash,
            role: 'ADMIN'
        }
    });

    // Create Driver User
    const driverUser = await prisma.user.upsert({
        where: { email: 'driver@zenpark.com' },
        update: {},
        create: {
            email: 'driver@zenpark.com',
            name: 'Zen Driver',
            password: passwordHash,
            role: 'DRIVER'
        }
    });

    console.log({ techPark, mall, admin: adminUser, driver: driverUser });
}


main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
