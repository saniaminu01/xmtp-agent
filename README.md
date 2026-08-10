# xmtp-agent

A simple chat agent built on the [XMTP Agent SDK](https://docs.xmtp.org/agents/get-started/build-an-agent), the open messaging protocol behind apps like World, Base App, Convos, and Zora.

The agent listens for direct messages on the XMTP network and responds to a few slash commands. It's meant as a starting point — swap the command handlers for whatever logic you want (an AI assistant, a notifications bot, a payments agent, etc).

## Commands

| Command   | What it does                          |
| --------- | -------------------------------------- |
| `/gm`     | Says gm back                           |
| `/echo`   | Echoes whatever you type after it      |
| `/whoami` | Shows your XMTP inbox ID and address   |
| `/ping`   | Health check — replies "pong"          |
| `/help`   | Lists all available commands           |

Any other message gets a friendly fallback pointing to `/help`.

## Setup

```bash
npm install

# generate a throwaway wallet + db encryption key for local dev
npm run gen:keys
# paste the output into a .env file (see .env.example)

npm run dev
```

Once it starts, the console prints a test URL — open it to chat with your agent directly on [xmtp.chat](https://xmtp.chat).

## Stack

- [`@xmtp/agent-sdk`](https://www.npmjs.com/package/@xmtp/agent-sdk) — event-driven agent framework on top of XMTP's Node SDK
- TypeScript + `tsx`, no build step needed for local dev

## Deploying

Any Node.js host works. XMTP's docs have a walkthrough for [deploying to Railway](https://docs.xmtp.org/agents/build-an-agent) with persistent storage for the local SQLite database XMTP uses.

## Links

- [XMTP](https://xmtp.org)
- [XMTP docs](https://docs.xmtp.org)
- [XMTP Switchboard Community](https://switchboard.xmtp.org/)
