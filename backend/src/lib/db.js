import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
    log: [ 'info', 'warn', 'error'],
});

export async function connectToDatabase() {
    try {
        await prisma.$connect();
        console.log('✅ Connected to the PostgreSQL database');
    } catch (error) {
        console.error('❌ Failed to connect to the database:', error.message);
        process.exit(1);
    }
}

process.on('SIGINT', async () => {
    console.log('🛑 Shutting down Prisma...');
    await prisma.$disconnect();
    process.exit(0);
});

