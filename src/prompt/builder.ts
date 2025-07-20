export interface PromptContext {
  title: string;
  body: string;
  diff: string;
  tokenLimit: number;
  thread?: { author: string; body: string }[];
}

export function buildPrompt(ctx: PromptContext): string {
  const base = `You are an AI PR review assistant. Provide a concise summary of the pull request and point out potential issues.\n\nTitle: ${ctx.title}\n\nDescription:\n${ctx.body}\n`;

  let threadBlock = "";
  if (ctx.thread && ctx.thread.length > 0) {
    threadBlock =
      "\nPreviously in this conversation:\n" +
      ctx.thread
        .map((m) => `@${m.author}: ${m.body.replace(/\n/g, " ")}`)
        .join("\n") +
      "\n---\n";
  }

  // naive truncation based on character length ~ tokens
  const allowed = ctx.tokenLimit * 4; // rough char estimate
  let diff = ctx.diff;
  if (diff.length > allowed) {
    diff = diff.slice(0, allowed) + "\n... (truncated)";
  }

  return `${base}${threadBlock}\nDiff:\n${diff}`;
} 