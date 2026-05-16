import en from './en.js';
import tr from './tr.js';

export default function getText(lang: string, key: string): string {
  return lang === 'tr' ? tr[key] : en[key];
}
