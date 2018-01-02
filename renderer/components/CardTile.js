import React, { Component } from 'react'
import {Grid, ListItemText} from 'material-ui'

import { withStyles, withTheme } from 'material-ui/styles'

const styles = theme => ({
  Cost: {
    display: 'block',
    width: '30px',
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    fontFamily: '"Montserrat", sans-serif',
    backgroundColor: theme.palette.CardTileMana,
    borderRightColor: 'inherit',
    lineHeight: '29px',
    textAlign: 'center',
    color: 'white',
    zIndex: -1
  },
  Image: {
    display: 'block',
    width: '100px',
    position: 'absolute',
    top: '0',
    right: '0',
    height: '100%',
    borderColor: 'inherit'
  },
  Count: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '25px',
    height: '100%',
    lineHeight: '29px',
    textAlign: 'center',
    color: "white",
    fontFamily: '"Montserrat", sans-serif',
    backgroundColor: theme.palette.CardTileMana,
  },
  Overlay:{
    position: 'absolute',
    display: 'block',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'darkslategray',
    zIndex: 2,
    opacity: 0.5
  }
})

const borderColor = {
  borderColor: 'inherit'
}

const textStyle = {
  borderColor: 'inherit',
  paddingLeft: '20px'
}

@withStyles(styles) @withTheme()
class CardTile extends Component {
  render () {
    return (
      <Grid style={borderColor} container spacing={0}>
        {this.renderGrayOverlay()}
        <div className={this.props.classes.Cost} style={this.getCardRarityColor()}>
          {this.props.card.info.cost}
        </div>
        <Grid style={textStyle} item xs={12}>
          <ListItemText
            className={'CardTile'}
            primary={this.props.card.info.name}
          />
          <div className={this.props.classes.Image} style={this.getBGPosition()}>
            {this.showNumber()}
          </div>
        </Grid>
      </Grid>
    )
  }

  getCardRarityColor () {
    if (!this.props.card) {
      return false
    }
    let card = this.props.card
    return {
      backgroundColor: this.props.theme.palette[`${card.info.rarity}Card`]
    }
  }

  showNumber () {
    let number = this.props.card.count
    if (number < 2) {
      return false
    }
    return (
      <div className={this.props.classes.Count}>
        {this._getCardsCount() || number}
      </div>
    )
  }
  
  getBGPosition () {
    if (!this.props.card) {
      return false
    }
    let card = this.props.card
    let position = '50% 18%'
    if (card.info.type === 'SPELL') {
      position = '50% 25%'
    }
    return {
      'backgroundImage': `url(/static/cards/${card.info.dbfId}.png)`,
      'backgroundPosition': position
    }
  }

  _getCardsCount () {
    let played = 0
    if (this.props.playedCards) {
      played = this.props.playedCards[this.props.card.info.id] || 0
    }
    let count = this.props.card.count - played
    if (count > 0 ) {
      return count
    }
    return 0
  }

  renderGrayOverlay () {
    if (!this.props.playedCards) {
      return false
    }
    let played = this.props.playedCards[this.props.card.info.id] || 0
    if (played >= this.props.card.count) {
      return (
        <div className={this.props.classes.Overlay} />
      )
    }
    return false
  }
  
}

export default CardTile