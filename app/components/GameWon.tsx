import styles from 'app/styles/page.module.css';
import CreateNew from './CreateNew';

const GameWon = ({ gameHistory, gameId, closeCallback }: { gameHistory: string[], gameId: string, closeCallback: Function }) => {
	return (
		<div className={ styles.gameWonWrapper }>
			<button className={ styles.closePopupButton } onClick={ () => closeCallback() }>×</button>
			<h2 className={ styles.gameWonMsg }>Great!</h2>
			<p className={ styles.gameWonSubheading }>Connections #{ gameId }</p>
			<div className={ styles.movesWrapper }>
			{
				gameHistory
					.map((move: string, i: number) => 
						<p key={ i } className={ styles.moveRow }>
							{ move }
						</p>
					)
			}
			</div>
			<div className={ styles.gameWonCreateNewWrapper }>
				<CreateNew />
			</div>
		</div>
	);
};

export default GameWon;