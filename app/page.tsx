import Board from './components/Board';
import styles from './styles/header.module.css';

export default function Home() {
  return (
    <main>
      <div>
        <div className={ styles.left }>
          <h1 className={ styles.title }>Customnections</h1>
        </div>
        <div className={ styles.right }>
          <button className={ styles.createNew }>Create New</button>
        </div>
      </div>
      <Board />
    </main>
  )
}
