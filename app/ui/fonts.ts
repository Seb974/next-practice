import { Inter, Lusitana } from 'next/font/google';
import { optional } from 'zod';
 
export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({ subsets: ['latin'], weight: '400' });