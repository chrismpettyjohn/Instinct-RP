import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {PhotoSliderProps} from './PhotoSlider.types';

export function PhotoSlider({photos}: PhotoSliderProps) {
  const [activePhoto, setActivePhoto] = useState(0);

  console.log(photos);

  if (photos.length === 0) {
    return null;
  }

  const currentPhoto = photos[activePhoto]!;

  const [canGoLeft, canGoRight] = [
    activePhoto > 0,
    activePhoto < photos.length - 1,
  ];

  function goLeft() {
    if (!canGoLeft) {
      return;
    }

    setActivePhoto(_ => _ - 1);
  }

  function goRight() {
    if (!canGoRight) {
      return;
    }

    setActivePhoto(_ => _ + 1);
  }

  return (
    <div className="row">
      <div className="col-6">
        {canGoLeft && (
          <Icon
            style={{cursor: 'pointer'}}
            type="caret-left"
            onClick={goLeft}
          />
        )}
      </div>
      <div className="col-6 text-right">
        {canGoRight && (
          <Icon
            style={{cursor: 'pointer'}}
            type="caret-right"
            onClick={goRight}
          />
        )}
      </div>
      <div className="col-12">
        <div
          style={{
            display: 'block',
            backgroundImage: `url(${currentPhoto.imagePath})`,
            backgroundSize: 'cover',
            border: '2px solid white',
            borderRadius: 4,
            cursor: 'pointer',
            height: 300,
            width: 300,
          }}
        />
      </div>
    </div>
  );
}
