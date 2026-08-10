import { randomBytes } from "node:crypto";
import { generatePrivateKey } from "viem/accounts";

// Wallet key: any standard EVM private key works as an XMTP identity.
const walletKey = generatePrivateKey();

// DB encryption key: 32 random bytes, hex encoded.
const dbEncryptionKey = `0x${randomBytes(32).toString("hex")}`;

console.log("Add these to your .env file:\n");
console.log(`XMTP_WALLET_KEY=${walletKey}`);
console.log(`XMTP_DB_ENCRYPTION_KEY=${dbEncryptionKey}`);
console.log(`XMTP_ENV=dev`);
