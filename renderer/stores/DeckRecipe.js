'use strict'

import {encode, decode} from 'deckstrings'
import Collections from './Game/Collections'

export default class {
  static convertListToCardIds (encodeDeck) {
    let deck = decode(encodeDeck)
    let list = new Map()
    for (let card of deck.cards) {
      let cardInfo = Collections.findCardByDbfId(card[0])
      list.set(cardInfo.id, {
        info: cardInfo,
        count: card[1]
      })
    }
    let hero = Collections.findCardByDbfId(deck.heroes[0])
    return {
      format: deck.format,
      heroes: {info: hero},
      cards: list
    }
  }

  static exportDeck (deck) {
    let format = deck.format
    let heroes = Collections.findCardById(deck.heroes.id)
    heroes = heroes.dbfId
    let cards = []
    for (let [key, value] of deck.cards) {
      let cardInfo = Collections.findCardById(key)
      cards.push([cardInfo.dbfId, value.count])
    }
    return encode({
      cards, heroes: [heroes], format
    })
  }
}
