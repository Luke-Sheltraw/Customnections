'use client';

import { useRouter } from 'next/navigation';
import { FC, FormEvent, useRef, useState } from 'react';

import create from '@/actions/create';
import formStyles from '@/styles/form.module.css';
import styles from '@/styles/page.module.css';
import { GameBuilder, WordGroupBuilder } from '@/util';

export const CreationSpace: FC = () => {
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
        <div className={formStyles.formBody}>
          {Array.from({ length: 4 }).map((_, num) => (
            <div
              key={num}
              className={[
                formStyles.categoryWrapper,
                formStyles[`category-${num + 1}`],
              ].join(' ')}
            >
              <h2>Category {num + 1}</h2>
              <div className={formStyles.descWrapper}>
                <label htmlFor={`desc${num}`}>Description</label>
                <input
                  type="text"
                  id={`desc${num}`}
                  name={`desc${num}`}
                  required
                />
              </div>
              <div className={formStyles.wordsWrapper}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div className={formStyles.wordWrapper} key={i}>
                    <label htmlFor={`word${num}`}>Word</label>
                    <input
                      type="text"
                      id={`word${num}`}
                      name={`word${num}`}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={formStyles.buttonWrapper}>
          <input
            type="reset"
            value="Reset"
            className={[formStyles.resetButton, 'scaleButton'].join(' ')}
            disabled={submitted}
          />
          <input
            type="submit"
            value="Create"
            className={[formStyles.submitButton, 'scaleButton'].join(' ')}
            disabled={submitted}
          />
        </div>
      </form>
    </div>
  );
};
