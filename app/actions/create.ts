'use server'

import { sql } from '@vercel/postgres';
import { type GROUP } from './../consts';

const SYMBOLS = 'abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUVWXZY1234567890'

const randomKey = (): string => {
	return Array
		.from({ length: 6 })
		.map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
		.join('');
};

const create = async (game: GROUP[]) => {
	try {
		let key;
		let rowCount;
		do {
			key = randomKey();
			rowCount = await sql`SELECT * FROM GAMES WHERE id=${ key } LIMIT 1`.then((res) => res.rowCount);
		} while (rowCount > 0);
		await sql`INSERT INTO GAMES (id, game_info) VALUES (${ key }, ${ JSON.stringify(game) })`;
		return key;
	} catch {
		return;
	}
};

export default create;