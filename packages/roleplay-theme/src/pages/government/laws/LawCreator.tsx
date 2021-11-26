import React from 'react';
import {toast} from 'react-toastify';
import {Link, useLocation} from 'wouter';
import {EditLaw} from './edt-law/EditLaw';
import {setURL} from '@instinct-web/core';
import {lawService} from '@instinct-plugin/roleplay-web';
import {LawDTO} from '@instinct-plugin/roleplay-types';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Icon} from '../../../components/generic/icon/Icon';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

import {RPPermissionGuard} from '../../../components/templates/permission-guard';

setURL('government/laws/create', <LawCreator />);

export function LawCreator() {
  const [location, setLocation] = useLocation();

  async function onSubmit(lawDTO: LawDTO) {
    const newLaw = await lawService.create(lawDTO);
    toast.success('Law {lawDTO.title} has been drafted');
    setLocation(`/government/laws/view/${newLaw.id}`);
  }

  return (
    <UserLayout section="games_ranking">
      <RPPermissionGuard permission="websiteProposeLaws" redirect>
        <Container>
          <Row>
            <div className="col-12">
              <Link to="/government/laws">
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
                <h1>Propose New Bill</h1>
                <p>So you think you can change the world?</p>
              </MiniJumbotron>
            </div>
          </Row>
          <Row>
            <EditLaw onSubmit={onSubmit} />
          </Row>
        </Container>
      </RPPermissionGuard>
    </UserLayout>
  );
}
