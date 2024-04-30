export const URI_PREFIX = process.env.NEXT_PUBLIC_URI_PREFIX || "";
export const EXPLORER_URI_PREFIX = process.env.NEXT_PUBLIC_EXPLORER_URL || "";

export const appURL = (uri: string) => `${URI_PREFIX}${uri}`;
export const explorerURL = (uri: string) => `${EXPLORER_URI_PREFIX}${uri}`;
export const explorerTokenURL = (address: string) => explorerURL(`/token/${address}`);

export const TESTNET_MINTABLE_UNDERLYING = "0xD183458830Bd75fF60E10336D5efb98E1906814e";
export const ALLOW_ORIGIN = process.env.VERCEL_ENV === "production" ? "https://app.pod.finance" : "*";
