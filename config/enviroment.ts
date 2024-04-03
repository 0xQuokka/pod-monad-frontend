export const URI_PREFIX = process.env.NEXT_PUBLIC_URI_PREFIX || "";

export const appURL = (uri: string) => `${URI_PREFIX}${uri}`;
