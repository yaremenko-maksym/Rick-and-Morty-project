/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../store';

import {
  setCurrentChar,
} from '../../store/CharsListReducer';

import {
  UserSelectors,
  setCurrentUserDislikedChars,
  setCurrentUserLikedChars,
} from '../../store/UserReducer';

import './CharsList.scss';
import { Character } from '../../types/Character';

type Props = {
  charsArray: Character[];
};

export const CharsList: React.FC<Props> = memo(({ charsArray }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const likedChars = useAppSelector(UserSelectors.getLikedChars);
  const dislikedChars = useAppSelector(UserSelectors.getDislikedChars);
  const user = useAppSelector(UserSelectors.getUser);

  return (
    <ul className="list-group list-group-light">
      {charsArray.map(char => (
        <li
          key={char.id}
          className="
                myLink
                clickable
                bg-dark
                char
                list-group-item
                d-flex
                flex-lg-row
                flex-column
                justify-space-between
                align-items-start
                align-items-lg-center
                border-success"
          onClick={() => {
            dispatch(setCurrentChar(null));
            navigate(`/characters/${char.id}`);
          }}
        >
          <div
            className="ms-2 me-2 mb-2 mb-md-0 d-flex justify-content-center align-items-center"
            style={{ gap: '20px' }}
          >
            <img
              src={char.image}
              alt={`${char.name} poster`}
              className="img-fluid rounded shadow-3 char__image"
            />

            <h3 className="fw-bold">
              {char.name}
            </h3>

            <p
              className={classNames(
                'badge rounded-pill badge-light',
                { 'text-success': char.status === 'Alive' },
                { 'text-danger': char.status === 'Dead' },
                { 'text-warning': char.status === 'unknown' },
              )}
            >
              {char.status}
            </p>
          </div>

          {user && (
            <div className="
                  btn-group
                  me-2
                  ms-2
                  mt-2
                  mt-lg-0
                  d-flex
                  justify-content-end
                  align-items-center"
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(setCurrentUserLikedChars(char));
                }}
                className={classNames(
                  'btn btn-light btn-floating',
                  {
                    'bg-success': likedChars[char.id],
                  },
                )}
              >
                <i className="fas fa-thumbs-up"></i>
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(setCurrentUserDislikedChars(char));
                }}
                className={classNames(
                  'btn btn-light btn-floating',
                  {
                    'bg-danger': dislikedChars[char.id],
                  },
                )}
              >
                <i className="fas fa-thumbs-down"></i>
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
});
