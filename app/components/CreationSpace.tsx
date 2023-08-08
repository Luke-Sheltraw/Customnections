'use client'
import styles from 'app/styles/page.module.css';
import formStyles from 'app/styles/form.module.css';
import { FormEvent, useRef } from 'react';

const CreationSpace = () => {
	const form = useRef<HTMLFormElement>(null);

	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const game = Array.from({ length: 4 }).map((_, num) => (
			{
				words: data.getAll(`word${ num }`),
				desc: data.get(`desc${ num }`),
				difficulty: num + 1,
			}
		));
		console.log(game);
	};

	return (
		<div className={ styles.pageCenter }>
			<form method="post" className={ formStyles.form } ref={ form } onSubmit={ submit }>
				{
					Array.from({ length: 4 }).map((_, num) =>
						<div key={ num } className={ formStyles.categoryWrapper }>
							<h3 className={ formStyles[`categoryName${ num + 1}`] }>Category { num + 1}</h3>
							<div className={ formStyles.descWrapper }>
								<input
									type="text"
									placeholder="Description"
									className={ formStyles.descInput }
									name={ `desc${ num }`}
									required
								/>
							</div>
							<div className={ formStyles.wordsWrapper }>
								{
									Array.from({ length: 4}).map((_, i) => 
										<input
											type="text"
											placeholder="Word"
											className={ formStyles.wordInput }
											name={ `word${ num }` }
											required 
											key={ i }
										/>
									)
								}
							</div>
						</div>
					)
				}
				<input type="submit" value="Create" className={ formStyles.submit }/>
			</form>
		</div>
	);
};

export default CreationSpace;