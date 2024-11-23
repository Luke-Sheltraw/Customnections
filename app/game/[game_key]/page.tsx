import { sql } from '@vercel/postgres';
import Link from 'next/link';

import Board from '@/components/Board';
import CreateNew from '@/components/CreateNew';
import styles from '@/styles/header.module.css';

const Home = async ({ params }: { params: { game_key: string } }) => {
  const { rows } =
    await sql`SELECT * FROM GAMES WHERE id=${params.game_key} LIMIT 1`;

  if (rows.length === 0) return <>No game found</>;

  return (
    <main>
      <div>
        <div className={styles.left}>
          <Link href="/" className={styles.titleLink}>
            <h1 className={styles.title}>Customnections</h1>
          </Link>
        </div>
        <div className={styles.right}>
          <CreateNew />
        </div>
      </div>
      <Board wordGroups={rows[0]['game_info']} gameId={params.game_key} />
    </main>
  );
};

export default Home;
