import 'dotenv/config';
import {PrismaPg} from '@prisma/adapter-pg';
import {PrismaClient} from '../../prisma/generated/prisma/client.js';

const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL});
const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        console.log('Database disconnected');
    } catch (error) {
        console.error('Database disconnection error:', error);
    }
};

process.on('SIGINT', async () => {
    await disconnectDB();
    process.exit(0);
}); 

process.on('unhandledRejection', async (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    await disconnectDB();
    process.exit(1);
}); 


process.on('uncaughtException', async (error) => {
    console.error('Uncaught Exception:', error);
    await disconnectDB();
    process.exit(1);
});


process.memoryUsage('SIGTERM', async () => {
    await disconnectDB();
    process.exit(0);
});

export { prisma, connectDB, disconnectDB };