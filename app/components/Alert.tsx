import { FC } from 'react';

import styles from '@/styles/page.module.css';

type AlertProps = {
  children?: string | null | false;
};

export const Alert: FC<AlertProps> = ({ children }) => {
  return children && <div className={styles.alertWrapper}>{children}</div>;
};
