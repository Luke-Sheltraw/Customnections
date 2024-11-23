import { CreateNewButton } from '@/components/CreateNewButton';
import styles from '@/styles/home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Customnections</h1>
      <p>Please follow a game link or</p>
      <CreateNewButton />
    </div>
  );
};

export default Home;
