import type { Request } from 'express';

export default function ipHelper(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return Array.isArray(forwarded) ? forwarded[0] : forwarded.split(/, /)[0];
  }
  return req.socket.remoteAddress ?? 'unknown';
}
