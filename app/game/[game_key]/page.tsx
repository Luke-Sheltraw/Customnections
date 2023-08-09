import { sql } from '@vercel/postgres';
import Board from './../../components/Board';
import styles from './../../styles/header.module.css';
import Link from 'next/link';

const Home = async ({ params }: { params: { game_key: string } }) => {
  const { rows } = await sql`SELECT * FROM GAMES WHERE id=${ params.game_key } LIMIT 1`;

  if (rows.length === 0) return <>No game found</>

  return (
    <main>
      <div>
        <div className={ styles.left }>
          <Link href="/" className={ styles.titleLink } ><h1 className={ styles.title }>Customnections</h1></Link>
        </div>
        <div className={ styles.right }>
          <Link href="/create"><button className={ styles.createNew }>Create New</button></Link>
        </div>
      </div>
      <Board game={ rows[0]['game_info'] } />
    </main>
  );
}

export default Home;