import styles from 'app/styles/page.module.css';
import CreateNew from './CreateNew';

const GameWon = ({ gameHistory, gameId }: { gameHistory: string[], gameId: string }) => {
	return (
		<div className={ styles.gameWonWrapper }>
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