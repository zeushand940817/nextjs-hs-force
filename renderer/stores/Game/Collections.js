import {action, observable, computed} from 'mobx';

// const HS_CARDS_API = 'https://api.hearthstonejson.com/v1/latest/enUS/cards.json'
const HS_CARDS_API = 'https://api.hearthstonejson.com/v1/22611/enUS/cards.json'


class Collections {
  @observable isReady = false
  @observable cards_by_dbfId = observable.map({})
  @observable cards_by_id = observable.map({})

  constructor () {
    this._fetchCollectionsData()
  }

  _fetchCollectionsData = async () => {
    let allCards = await fetch(HS_CARDS_API)
      .then(res => res.json())
    for(var card of allCards) {
      if(card.dbfId) {
        this.cards_by_dbfId.set(card.dbfId, card)
      }
      if(card.id) {
        this.cards_by_id.set(card.id, card)
      }
    }
    this.ready(true)
  }

  findCardById = (id) => {
    return this.cards_by_id.get(id)
  }
  
  findCardByDbfId = (dbfId) => {
    return this.cards_by_dbfId.get(dbfId)
  }

  @action
  ready = (val) => {
    this.isReady = true;
  }

  get cards() {
    return this.cards_by_id.values()
  }
}

export default new Collections()