import { FC } from 'react';

import styles from '@/styles/page.module.css';

type AlertProps = {
  message: string | null;
};

const Alert: FC<AlertProps> = ({ message }) => {
  return message && <div className={styles.alertWrapper}>{message}</div>;
};

export default Alert;
