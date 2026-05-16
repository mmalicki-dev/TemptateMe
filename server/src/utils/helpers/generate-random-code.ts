import { generate } from 'randomstring';

export default function generateRandomCode(length: number): string {
  return generate({ length, charset: 'numeric' });
}
