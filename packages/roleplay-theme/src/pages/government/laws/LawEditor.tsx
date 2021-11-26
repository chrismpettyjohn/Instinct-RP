import React from 'react';
import {Spinner} from 'reactstrap';
import {toast} from 'react-toastify';
import {EditLaw} from './edt-law/EditLaw';
import {setURL} from '@instinct-web/core';
import {Link, useLocation, useRoute} from 'wouter';
import {lawService, useFetchLawByID} from '@instinct-plugin/roleplay-web';
import {LawDTO} from '@instinct-plugin/roleplay-types';
import {RPPermissionGuard} from '../../../components/templates/permission-guard';
import {Row} from '../../../components/generic/row/Row';
import {UserLayout} from '../../../components/layout/user';
import {Icon} from '../../../components/generic/icon/Icon';
import {Container} from '../../../components/generic/container/Container';
import {MiniJumbotron} from '../../../components/generic/mini-jumbotron/MiniJumbotron';

setURL('government/laws/edit/:lawID', <LawEditor />);

export function LawEditor() {
  const [location, setLocation] = useLocation();
  const [matched, params] = useRoute<{lawID: string}>(
    '/government/laws/edit/:lawID'
  );

  const law = useFetchLawByID(params!.lawID);

  if (law === undefined) {
    return <Spinner />;
  }

  async function onSubmit(lawDTO: LawDTO) {
    await lawService.updateByID(law!.id, lawDTO);
    toast.success(`Your changes to ${lawDTO.title} have been saved`);
  }

  return (
    <UserLayout section="games_ranking">
      <RPPermissionGuard permission="websiteProposeLaws" redirect>
        <Container>
          <Row>
            <div className="col-12">
              <Link to={`/government/laws/view/${law.id}`}>
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
                <h1>
                  Editing <b className="text-warning">{law.title}</b>
                </h1>
              </MiniJumbotron>
            </div>
          </Row>
          <Row>
            <EditLaw
              baseLawDTO={{
                title: law.title,
                description: law.description,
                content: law.content,
              }}
              onSubmit={onSubmit}
            />
          </Row>
        </Container>
      </RPPermissionGuard>
    </UserLayout>
  );
}
