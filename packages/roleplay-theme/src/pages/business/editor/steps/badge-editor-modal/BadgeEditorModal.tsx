import React, {useContext} from 'react';
import {businessEditorContext} from '../../context';
import {BadgeSelectorModal} from '../../../../../components/templates/badge-selector-modal';

export function BadgeEditorModal() {
  const {business, setBusiness} = useContext(businessEditorContext);
  return (
    <BadgeSelectorModal
      badge={business.badge}
      onChange={newBadge => setBusiness('badge', newBadge)}
    />
  );
}
