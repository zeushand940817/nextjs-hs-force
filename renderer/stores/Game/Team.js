import {action, observable, computed} from 'mobx'
import Zone from './Zone'

const ZONES = [
  "DECK",
  "HAND",
  "PLAY",
  "PLAY (Hero)",
  "PLAY (Hero Power)",
  "PLAY (Weapon)",
  "SECRET",
  "GRAVEYARD"
]

const skipZONES = [
  "PLAY (Hero)",
  "PLAY (Hero Power)"
]

export default class {
  @observable name
  @observable player
  @observable zones = {}

  constructor(name) {
    this.name = Math.random()
    this.setZones()
  }

  @action
  setZones() {
    for(let i in ZONES) {
      this.zones[ZONES[i]] = new Zone(ZONES[i])
    }
  }

  @action
  setPlayer(playerInfo) {
    this.player = playerInfo
  }
  
  get HERO () {
    return this.zones['PLAY (Hero)']
  }

  get DECK () {
    return this.zones.DECK
  }
  
  get HAND () {
    return this.zones.HAND
  }
  
  get PLAY () {
    return this.zones.PLAY
  }
  
  get GRAVEYARD () {
    return this.zones.GRAVEYARD
  }
  
  @computed
  get deckList () {
    let list = {}
    let initialCards = []
    if (this.zones.DECK.logMoves) {
      initialCards = this.zones.DECK.logMoves.slice(0, 30)
    }
    let size = this.zones.DECK.entites.size
    for( let entityID of initialCards) {
      for( let zone of ZONES ) {
        if (this.zones[zone]) {
          let card = this.zones[zone].get(entityID)
          if (card && card.info) {
            if (!list[card.cardId]) {
              list[card.cardId] = {
                info: card.info,
                count: 0
              }
            }
            list[card.cardId].count++
          }
        }
      }
    }
    return list
  }

  @computed
  get cardsAlreadyPlayed () {
    let cards = []
    for( let zone of ZONES ) {
      if (zone !== 'DECK') {
        cards = cards.concat(Array.from(this.zones[zone].getCards))
      }
    }
    return cards.reduce( (map, card, index)=> {
      if (!map[card.cardId]) {
        map[card.cardId] = 0
      }
      map[card.cardId]++
      return map
    }, {})
  }

}
