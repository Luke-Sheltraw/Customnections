'use client';

import styles from 'app/styles/page.module.css';
import formStyles from 'app/styles/form.module.css';
import { FormEvent, useRef, useState } from 'react';
import create from './../actions/create';
import { useRouter } from 'next/navigation';
import { GameBuilder, WordGroupBuilder } from '../util';

const CreationSpace = () => {
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    if (submitted) {
      return;
    }
    setSubmitted(true);
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);

    try {
      router.push(
        `/game/${await create(
          GameBuilder.getInstance()
            .withWordGroups(
              Array.from({ length: 4 }).map((_, index) =>
                WordGroupBuilder.getInstance()
                  .withDesc(data.get(`desc${index}`)?.toString() ?? '')
                  .withDifficulty((index + 1) as 1 | 2 | 3 | 4)
                  .withWords(
                    data.getAll(`word${index}`).map(word => word.toString())
                  )
                  .build()
              )
            )
            .build()
        )}`
      );
    } catch (e) {
      setSubmitted(false);

      if (e instanceof Error && e.message.includes('Duplicate words found')) {
        window.alert('Duplicate words are disallowed');
      } else {
        window.alert('There was an issue creating this game.');
      }
    }
  };

  return (
    <div className={styles.pageCenter}>
      <form
        method="post"
        className={formStyles.form}
        ref={form}
        onSubmit={submit}
      >
        {Array.from({ length: 4 }).map((_, num) => (
          <div key={num} className={formStyles.categoryWrapper}>
            <h3 className={formStyles[`categoryName${num + 1}`]}>
              Category {num + 1}
            </h3>
            <div className={formStyles.descWrapper}>
              <input
                type="text"
                placeholder="Description"
                className={formStyles.descInput}
                name={`desc${num}`}
                required
              />
            </div>
            <div className={formStyles.wordsWrapper}>
              {Array.from({ length: 4 }).map((_, i) => (
                <input
                  type="text"
                  placeholder="Word"
                  className={formStyles.wordInput}
                  name={`word${num}`}
                  required
                  key={i}
                />
              ))}
            </div>
          </div>
        ))}
        <input
          type="submit"
          value="Create"
          className={formStyles.submit}
          disabled={submitted}
        />
      </form>
    </div>
  );
};

export default CreationSpace;
