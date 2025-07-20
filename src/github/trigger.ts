import * as github from "@actions/github";

export function isTriggerPresent(triggerPhrase: string): boolean {
  const payload = github.context.payload as any;
  const body =
    payload.comment?.body ||
    payload.review?.body ||
    payload.issue?.body ||
    payload.pull_request?.body ||
    "";
  if (!body) return false;
  const regex = new RegExp(`\\b${triggerPhrase}\\b`, "i");
  return regex.test(body);
} 