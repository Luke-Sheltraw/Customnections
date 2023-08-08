import CreationSpace from './../components/CreationSpace';
import styles from 'app/styles/header.module.css';

const Create = () => {
	return (
		<main>
		<div>
			<div className={ styles.left }>
				<h1 className={ styles.title }>Customnections</h1>
			</div>
		</div>
		<CreationSpace />
		</main>
	);
};

export default Create;