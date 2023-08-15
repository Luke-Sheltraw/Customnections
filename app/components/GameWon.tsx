import styles from 'app/styles/page.module.css';
import { JsxElement } from 'typescript';

const GameWon = ({ gameHistory, gameId }: { gameHistory: string[][], gameId: string }) => {
	return (
		<div className={ styles.gameWonWrapper }>
			<h2 className={ styles.gameWonMsg }>Great!</h2>
			<p>Connections #{ gameId }</p>
			<div className={ styles.movesWrapper }>
			{
				gameHistory
					.map((move: string[], i: number) => 
						<p key={ i } className={ styles.moveRow }>
							{ move.join('') }
						</p>
					)
			}
			</div>
		</div>
	);
};

export default GameWon;