import {Photo} from '@instinct-prj/interface';
import {photoService} from '@instinct-web/core';
import React, {useEffect, useState} from 'react';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Card} from '../../../components/generic/card/Card';
import {defaultPhotosState, PhotosState} from './PhotosInterface';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

import {Loading, setURL} from '@instinct-web/core';
import {PhotoCard} from './photo-card/PhotoCard';

setURL('community/photos', <Photos />);

export function Photos() {
  const [state, setState] = useState<PhotosState>(defaultPhotosState);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setState(defaultPhotosState);
    async function fetchPhotos(): Promise<void> {
      const photos: Photo[] = await photoService.getAll();
      setState({
        photos,
        showSpinner: false,
      });
    }
    fetchPhotos();
  }, [refresh]);

  return (
    <UserLayout section="community_photos">
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h1>Photos</h1>
              <p>Pictures captured by our users around the world</p>
            </MiniJumbotron>
          </div>
        </Row>
        <Loading isLoading={state.showSpinner}>
          {state.photos.length === 0 && (
            <Row>
              <div className="col-12">
                <Card>
                  <h3>Hmmm...</h3>
                  <p>
                    It looks like there aren't any pictures. Maybe you could be
                    the first!
                  </p>
                </Card>
              </div>
            </Row>
          )}
          <Row>
            {state.photos.map(photo => (
              <PhotoCard
                key={`photo_${photo.id}`}
                photo={photo}
                onChange={() => setRefresh(_ => _ + 1)}
              />
            ))}
          </Row>
        </Loading>
      </Container>
    </UserLayout>
  );
}
