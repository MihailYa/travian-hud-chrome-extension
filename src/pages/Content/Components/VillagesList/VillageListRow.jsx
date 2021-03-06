import './VillagesList.sass';
import React, { Component } from 'react';
import classNames from 'classnames';
import { strings } from '../../global/localization';

export default class VillageListRow extends Component {
  render() {
    const village = this.props.village;
    const rowClass = classNames({ 'activeVillageRow': village.isActive });

    const onLinkPressed = (event) => {
      event.preventDefault();
      this.props.onLinkPressed(event.currentTarget.href);
    };
    return (
      <tr className={rowClass}>
        <td>
          <svg />
        </td>
        <td>
          <a href={village.villageLinkRef} onClick={onLinkPressed}>
            {village.villageName}
          </a>
        </td>
        <td>
          <a href={village.villageLinkRef} onClick={onLinkPressed}>
            {'(' + village.coordinates.x + '|' + village.coordinates.y + ')'}
          </a>
        </td>
        <td>
          <a href={'/build.php?id=39&tt=2&z=' + village.villageId} onClick={onLinkPressed}>
            <img className="defenseImage" alt={strings.defense} src={'/img/x.gif'} />
          </a>
        </td>
        <td>
          <a href={'/build.php?z=' + village.villageId + '&gid=17&t=5'} onClick={onLinkPressed}>
            <img className="cargoImage" alt={strings.cargo} src={'/img/x.gif'} />
          </a>
        </td>
      </tr>
    );
  }
}