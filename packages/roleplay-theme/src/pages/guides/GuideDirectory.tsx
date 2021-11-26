import React, {useContext, useState} from 'react';
import {Row} from '../../components/generic/row/Row';
import {UserLayout} from '../../components/layout/user';
import {setURL, configContext, Icon, Input} from '@instinct-web/core';
import {Container} from '../../components/generic/container/Container';
import {MiniJumbotron} from '../../components/generic/mini-jumbotron/MiniJumbotron';
import {Link} from 'wouter';
import {RPPermissionGuard} from '../../components/templates/permission-guard';
import {useFetchAllGuides} from '@instinct-plugin/roleplay-web';
import {GuideCard} from '../../components/templates/guide-card/GuideCard';

setURL('guides', <GuideDirectory />);

export function GuideDirectory() {
  const {config} = useContext(configContext);
  const [guideNameFilter, setGuideNameFilter] = useState('');

  const guides = useFetchAllGuides();

  const filteredGuides = guides?.filter(_ =>
    _.name.toLowerCase().includes(guideNameFilter)
  );

  return (
    <UserLayout>
      <Container>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <Row>
                <div className="col-6">
                  <h1>{config.siteName} Guides</h1>
                  <p>Read guides posted by other users like yourself!</p>
                </div>
                <div className="col-6 text-right">
                  <RPPermissionGuard
                    permission="websiteCreateGuides"
                    redirect={false}
                  >
                    <Link to="/guides/create">
                      <button className="btn btn-success btn-lg">
                        <Icon type="plus-circle" />
                        Create
                      </button>
                    </Link>
                  </RPPermissionGuard>
                </div>
              </Row>
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          <div className="col-12">
            <MiniJumbotron>
              <Input
                value={guideNameFilter ?? ''}
                name="guide_filter"
                placeholder="Search by guide..."
                type="text"
                onChange={(key, value) =>
                  setGuideNameFilter(value.toLowerCase())
                }
              />
            </MiniJumbotron>
          </div>
        </Row>
        <Row>
          {filteredGuides?.map(_ => (
            <div className="col-6" key={`guide_${_.id}`}>
              <GuideCard guide={_} />
            </div>
          ))}
        </Row>
      </Container>
    </UserLayout>
  );
}
