import Link from "next/link";
import styles from 'app/styles/header.module.css';

const CreateNew = () => {
	return (
		<Link href="/create"><button className={ styles.createNew }>Create New</button></Link>
	);
}

export default CreateNew;