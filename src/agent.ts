import { Agent, CommandRouter, getTestUrl } from "@xmtp/agent-sdk";
import { existsSync } from "node:fs";

// Load variables from .env into process.env when running locally.
// Hosts like Railway inject env vars directly, so there's no .env file there.
if (existsSync(".env")) {
  process.loadEnvFile?.(".env");
}

// 1. Set up commands the agent understands.
// CommandRouter parses "/command args" style messages and routes them
// to the right handler. Anything that isn't a recognized command falls
// through to .default().
const router = new CommandRouter({ helpCommand: "/help" });

router
  .command("/gm", "Say gm back", async (ctx) => {
    await ctx.sendTextReply("gm ☀️ — I'm Zenith, welcome to the XMTP network.");
  })
  .command("/echo", "Echo back whatever you type after it", async (ctx) => {
    const text = ctx.isText() ? ctx.message.content : "";
    const echoed = text.replace(/^\/echo\s*/i, "").trim();
    await ctx.sendTextReply(echoed.length > 0 ? echoed : "Say something after /echo!");
  })
  .command("/whoami", "Show your inbox ID and address", async (ctx) => {
    const address = await ctx.getSenderAddress();
    await ctx.sendTextReply(
      `Inbox ID: ${ctx.message.senderInboxId}\nAddress: ${address ?? "unknown"}`,
    );
  })
  .command("/ping", "Health check", async (ctx) => {
    await ctx.sendTextReply("pong 🏓");
  })
  .default(async (ctx) => {
    await ctx.sendTextReply(
      "👋 I'm Zenith. I didn't recognize that — try /help to see what I can do.",
    );
  });

async function main() {
  // 2. Create the agent from environment variables (WALLET_KEY, ENCRYPTION_KEY, XMTP_ENV).
  // dbPath points at a Railway persistent volume when available (RAILWAY_VOLUME_MOUNT_PATH),
  // so the agent's identity/db survives restarts and redeploys. Falls back to the
  // current directory for local development.
  const customDbPath = (inboxId: string) =>
    `${process.env.RAILWAY_VOLUME_MOUNT_PATH ?? "."}/${process.env.XMTP_ENV}-${inboxId.slice(0, 8)}.db3`;

  const agent = await Agent.createFromEnv({
    dbPath: customDbPath,
  });

  // 3. Wire the command router in as middleware so every incoming
  // text message gets checked against our commands. Anything that
  // isn't a recognized command falls through to router.default().
  agent.use(router.middleware());

  agent.on("start", () => {
    console.log(`✅ Zenith is running`);
    console.log(`📬 Address: ${agent.address}`);
    console.log(`🔗 Test it: ${getTestUrl(agent.client)}`);
  });

  agent.on("unhandledError", (error) => {
    console.error("Unhandled agent error:", error);
  });

  await agent.start();
}

main().catch((error) => {
  console.error("Fatal error starting agent:", error);
  process.exit(1);
});
