import * as React from 'react'
import { Address } from 'web3x-es/address'
import { Badge, Row, Section, Header, Mana } from 'decentraland-ui'
import { Profile } from 'decentraland-dapps/dist/containers'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Props } from './Popup.types'
import './Popup.css'

export default class Popup extends React.PureComponent<Props> {
  render() {
    const { x, y, visible, tile, position } = this.props
    const id = `${tile.x},${tile.y}`
    const isEstate = !!tile.estate_id
    return (
      <div
        className={`AtlasPopup ${position} ${
          tile.owner ? 'has-owner' : 'no-owner'
        }`}
        style={{ top: y, left: x, opacity: visible ? 1 : 0 }}
      >
        <Section className="land-name">
          <Row className="name-row">
            <span className="name">
              {tile.name ||
                (!isEstate ? t('global.parcel') : t('global.estate'))}
            </span>
            <Badge color="#37333D">
              <i className="pin" />
              {id}
            </Badge>
          </Row>
        </Section>

        <Section className="owner">
          <Header sub>{t('nft_page.owner')}</Header>
          <Profile
            address={tile.owner || Address.ZERO.toString()}
            debounce={500}
          />
        </Section>

        {tile.price ? (
          <Section className="price">
            <Header sub>{t('nft_page.price')}</Header>
            <Mana>{tile.price.toLocaleString()}</Mana>
          </Section>
        ) : null}
      </div>
    )
  }
}
