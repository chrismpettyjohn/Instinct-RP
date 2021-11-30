import React from 'react';
import {Icon, setURL} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';
import {Link, useLocation} from 'wouter';
import {GuideEditor} from './guide-editor/GuideEditor';
import {GuideDTO} from '@instinct-plugin/roleplay-types';
import {guideService} from '@instinct-plugin/roleplay-web';
import {toast} from 'react-toastify';

setURL('guides/create', <GuideCreate />);

export function GuideCreate() {
  const [location, setLocation] = useLocation();

  async function onSubmit(guideDTO: GuideDTO) {
    const newGuide = await guideService.create(guideDTO);
    toast.success(`${newGuide.name} has been created!`);
    setLocation(`/guides/view/${newGuide.id}`);
  }

  return (
    <UserLayout>
      <Container>
        <Row>
          <div className="col-12">
            <Link to="/guides">
              <Icon
                className="fa-4x text-white"
                style={{cursor: 'pointer'}}
                type="caret-left"
              />
            </Link>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <h1>Create a New Guide</h1>
              <p>What would you like to write about?</p>
              <hr />
              <GuideEditor onSubmit={onSubmit} />
            </MiniJumbotron>
          </div>
        </Row>
      </Container>
    </UserLayout>
  );
}
