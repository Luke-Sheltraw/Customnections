'use client'
import styles from 'app/styles/page.module.css';
import formStyles from 'app/styles/form.module.css';
import { FormEvent, useRef, useState } from 'react';
import { type GROUP } from './../consts';
import create from './../actions/create';
import { useRouter } from 'next/navigation';

const CreationSpace = () => {
	const [submitted, setSubmitted] = useState(false);
	const form = useRef<HTMLFormElement>(null);
	const router = useRouter();

	const submit = async (event: FormEvent<HTMLFormElement>) => {
		if (submitted) {
			return;
		}
		setSubmitted(true);
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const game: GROUP[] = Array.from({ length: 4 }).map((_, num) => (
			{
				words: data.getAll(`word${ num }`).map((w) => w.toString()) as string[],
				desc: data.get(`desc${ num }`)?.toString() || '' as string,
				difficulty: num + 1,
			}
		));
		const newKey = await create(game);
		router.push(`/game/${ newKey }`);
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
				<input type="submit" value="Create" className={ formStyles.submit } disabled={ submitted }/>
			</form>
		</div>
	);
};

export default CreationSpace;