import Link from 'next/link';
import { FC } from 'react';

import styles from '@/styles/header.module.css';

export const CreateNewButton: FC = () => {
  return (
    <Link
      href="/create"
      className={[styles.createNew, 'scaleButton'].join(' ')}
    >
      Create your own
    </Link>
  );
};
