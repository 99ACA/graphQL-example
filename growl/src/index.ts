import { Server } from "./server";

let server = new Server()

async function main() {
  try {
    await server.listen()
  } catch (err) {
    console.error('💀 Error starting the node server', err)
  }
}

process.on('unhandledRejection', defaultOnFatalError)
process.on('uncaughtException', defaultOnFatalError);

async function defaultOnFatalError(error: Error): Promise<void> {
    console.error(error && error.stack ? error.stack : error);
    await server.stop()
    process.exit(1);
}

process.on('SIGTERM', onSignal("Signal-Terminate"));
process.on('SIGINT', onSignal("Signal-Interruption")); // Ctrl+C
function onSignal(signal: string) {
    return async function (): Promise<void> {
        console.info(`Got ${signal} .... going to stop the service`)
        await server.stop()
    }
}

void main()


// Tasks
// - logger
// - Authorizations & Permissions
// - N + 1 Probelm
// - Cache 

