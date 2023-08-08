import styles from 'app/styles/page.module.css';

const Alert = ({ msg }: { msg: string}) => {
	return <div className={ styles.alertWrapper }>{ msg }</div>
};

export default Alert;