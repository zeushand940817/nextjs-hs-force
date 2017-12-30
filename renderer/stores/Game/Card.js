import {action, observable} from 'mobx'
import Collections from './Collections'

export default class {
  @observable cardName
  @observable cardId
  @observable entityId
  @observable info

  constructor(params) {
    this.cardName = params.cardName
    this.cardId = params.cardId
    this.entityId = params.entityId
    this.info = Collections.findCardById(params.cardId)

  }

  @action
  updateCard(params){
    this.cardName = params.cardName
    this.cardId = params.cardId
    this.entityId = params.entityId
    this.info = Collections.findCardById(params.cardId)
  }

  isEqual(card){
    return card.entityId == this.entityId
  }

  get toObject() {
    return {
      cardName: this.cardName,
      cardId: this.cardId,
      entityId: this.entityId
    }
  }
}
