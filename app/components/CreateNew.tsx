import Link from 'next/link';
import { FC } from 'react';

import styles from '@/styles/header.module.css';

const CreateNew: FC = () => {
  return (
    <Link
      href="/create"
      className={[styles.createNew, 'scaleButton'].join(' ')}
    >
      Create New
    </Link>
  );
};

export default CreateNew;
