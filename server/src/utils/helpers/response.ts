import type { Response } from 'express';

export function ok(res: Response, data?: unknown, status = 200): void {
  const body: Record<string, unknown> = { ok: true };
  if (data !== undefined) body.data = data;
  res.status(status).json(body);
}

export function fail(res: Response, message: string, status: number): void {
  res.status(status).json({ ok: false, message });
}
