import {Link} from 'wouter';
import React, {useState} from 'react';
import {setURL, Icon} from '@instinct-web/core';
import {Row} from '../../../components/generic/row/Row';
import {BusinessEditor} from './editor/BusinessEditor';
import {UserLayout} from '../../../components/layout/user';
import {BusinessDTO} from '@instinct-plugin/roleplay-types';
import {Container} from '../../../components/generic/container/Container';
import {RPPermissionGuard} from '../../../components/templates/permission-guard';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';
import {ConfirmBusinessCreationModal} from './widgets/confirm-business-creation-modal/ConfirmBusinessCreationModal';

setURL('business/creator', <BusinessCreate />);

export function BusinessCreate() {
  const [confirmation, setConfirmation] = useState<BusinessDTO>();

  function toggleConfirmation(businessDTO?: BusinessDTO) {
    setConfirmation(businessDTO);
  }

  return (
    <UserLayout section="business">
      <RPPermissionGuard permission="websiteCreateBusiness">
        <Container>
          <Row>
            <div className="col-12">
              <Link to="/businesses">
                <Icon
                  className="fa-4x text-white"
                  style={{cursor: 'pointer'}}
                  type="caret-left"
                />
              </Link>
            </div>
          </Row>
          <Row>
            <MiniJumbotron>
              <h2>Business Creator</h2>
              <p>Kickstart your new business today!</p>
            </MiniJumbotron>
          </Row>
          <Row>
            <div style={{width: '100%'}}>
              <BusinessEditor
                onSubmit={toggleConfirmation}
                editorOnly={false}
              />
              {confirmation && (
                <ConfirmBusinessCreationModal
                  businessDTO={confirmation}
                  isOpen
                  onToggle={toggleConfirmation}
                />
              )}
            </div>
          </Row>
        </Container>
      </RPPermissionGuard>
    </UserLayout>
  );
}
