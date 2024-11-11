import styles from 'app/styles/page.module.css';
import { FC } from 'react';

type AlertProps = {
  message: string | null;
};

const Alert: FC<AlertProps> = ({ message }) => {
  return message && <div className={styles.alertWrapper}>{message}</div>;
};

export default Alert;
