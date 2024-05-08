import { sql } from '@vercel/postgres';
import { Discs } from './definitions-test';

export async function fetchDiscs()
{
    try
    {
        const data = await sql<Discs>`SELECT * FROM products`;
         return data.rows;

    } 
    catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch disc data.');
    }
}