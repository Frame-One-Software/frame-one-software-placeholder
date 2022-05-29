import {closeServer} from "@/services/express";

process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
    // Caught an unhandled promise rejection,
    // throw to fallback below
    throw reason;
});

process.on('uncaughtException', async (error: Error) => {
    // Just received an error that was never handled
    console.error(error);

    // exit gracefully
    await gracefullyExit();
    process.exit(1);
});

// SIGTERM is sent from Google cloud run when the server is idle and will be shut down in the next 10 seconds
process.on('SIGTERM', async () => {
    await gracefullyExit();
    process.exit(0);
})

// SIGUSR2 is sent from nodemon if running in dev mode
process.on("SIGUSR2", async () => {
    await gracefullyExit();
    process.exit(0);
})

async function gracefullyExit(): Promise<void> {
    console.log("Exiting gracefully...");

    try {
        await Promise.allSettled([
            // close the express server
            closeServer(),
        ])
        console.log("Backend exited gracefully.")
    } catch {
        console.error("Could not exit gracefully.");
    }
}