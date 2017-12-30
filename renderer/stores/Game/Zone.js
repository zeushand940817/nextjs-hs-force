import {action, observe, observable, toJS, computed} from 'mobx'

export default class {
  @observable name
  @observable entites = observable.map({})
  @observable logMoves = []

  constructor(name){
    this.name = name
  }
  
  @action
  add(card) {
    this.entites.set(card.entityId, card)
    this.logMoves.push(card.entityId)
  }

  @action
  get(id) {
    return this.entites.get(id)
  }

  @action
  remove(card) {
    this.entites.delete(card.entityId)
  }

  @computed get getCards(){
    return this.entites.values()
  }

}
