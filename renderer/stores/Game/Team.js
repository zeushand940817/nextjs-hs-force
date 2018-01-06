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
  @observable entityList = observable.map({})

  constructor(name) {
    this.name = Math.random()
    this.entityList = observable.map({})
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

  @action
  removeCard(zone, card) {
    this.zones[zone].remove(card)
    this._logCard(card)
  }

  @action
  addCard(zone, card) {
    this.zones[zone].add(card)
    this._logCard(card)
  }

  _logCard(data) {
    if(data.entityId && !this.entityList.get(data.entityId)) {
      this.entityList.set(data.entityId, data.info)
    }
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
    let size = this.zones.DECK.entites.size
    let initialCards = []
    if (this.zones.DECK.logMoves) {
      initialCards = this.zones.DECK.logMoves.slice(0, 30)
    }
    for( let entityID of initialCards) {
      let entity = this.entityList.get(entityID)
      if (entity){
        if(!list[entity.id]) {
          list[entity.id] = {
            info: entity,
            count: 0
          }
        }
        list[entity.id].count++
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
