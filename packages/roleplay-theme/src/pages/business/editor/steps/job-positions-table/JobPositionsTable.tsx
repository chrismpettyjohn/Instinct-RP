import {orderBy} from 'lodash';
import React, {useContext} from 'react';
import {Icon} from '@instinct-web/core';
import {businessEditorContext} from '@instinct-plugin/roleplay-web';
import {EditPositionModal} from '../edit-position-modal/EditPositionModal';

export function JobPositionsTable() {
  const {business, delPosition, movePositionUp, movePositionDown} = useContext(
    businessEditorContext
  );

  const orderedBusinesses = orderBy(business.positions, 'order');

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">&nbsp;</th>
            <th scope="col">Position</th>
            <th scope="col">Wage</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {orderedBusinesses.map((_, i) => (
            <tr key={`position_${i}_${_.order}`}>
              <td style={{cursor: 'pointer'}}>
                {i < business.positions.length - 1 && (
                  <Icon
                    type="caret-down"
                    onClick={() => movePositionUp(_.order)}
                  />
                )}
                {i > 1 && (
                  <Icon
                    type="caret-up"
                    onClick={() => movePositionDown(_.order)}
                  />
                )}
              </td>
              <td>{_.name}</td>
              <td>${_.shiftWage}</td>
              <td>
                <div className="d-flex">
                  <EditPositionModal positionIndex={i} />
                  <Icon
                    className="text-danger"
                    type="trash"
                    style={{marginTop: 3}}
                    onClick={() => delPosition(i)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {business.positions.length === 0 && (
        <div className="alert alert-danger">
          <b>You don't have any positions</b>
        </div>
      )}
    </>
  );
}
