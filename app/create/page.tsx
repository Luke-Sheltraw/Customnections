import Link from 'next/link';

import { CreationSpace } from '@/components/CreationSpace';
import styles from '@/styles/header.module.css';

const Create = async () => {
  return (
    <main>
      <div>
        <div className={styles.left}>
          <Link href="/" className={styles.titleLink}>
            <h1 className={styles.title}>Customnections</h1>
          </Link>
        </div>
      </div>
      <CreationSpace />
    </main>
  );
};

export default Create;
