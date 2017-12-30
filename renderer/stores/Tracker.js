import {action, observable, computed} from 'mobx';
import Game from './Game'
import Collections from './Game/Collections'
import DeckRecipe from './DeckRecipe'
import Farseer from 'farseer'
import Store from 'electron-settings'

const FILE_PATH = '\/Hearthstone_Data\/output_log.txt'

export default class {
  @observable status
  @observable logFile
  @observable game
  @observable info = {}
  @observable wins = 0
  @observable loses = 0
  @observable list = observable.map({})
  tracker
  statusOptions = {
    tracking: 'TRACKING',
    missing: 'MISSING_FOLDER_SET',
    stop: 'STOP'
  }
  
  constructor() {
    let folder = Store.get('hearthstone_file')
    if (folder) {
      this.setLogFile(folder)
    } else {
      this.setStatus(this.statusOptions.missing)
    }
  }

  @action
  setLogFile = (folder) => {
    Store.set('hearthstone_file', folder)
    this.logFile = `${folder}${FILE_PATH}`
    this.game = new Game()
    this.tracker = new Farseer({ logFile: this.logFile })
    this.tracker.on('game-start', this.newGame)
    this.tracker.on('game-over', this.gameOver)
    this.tracker.on('zone-change', this.cardPlayed)
    this.tracker.start()
    this.setStatus(this.statusOptions.tracking)
  }

  /**
   * Stop tracker and update status to stop
   */
  @action
  stop() {
    this.tracker.stop()
    this.setStatus(this.statusOptions.stop)
  }

  /**
   * Start a new game and update players
   */
  @action
  newGame = (players) => {
    for(var player of players) {
      this.game.setPlayer(player)
    }
  } 

  /**
   * When game is over update players how 
   * won and stat a new game
   */
  @action
  gameOver = (players) => {
    for(var player of players) {
      this.game.setPlayer(player)
    }
    this.game = new Game()
  }

  /**
   * When card is played
   */
  @action
  cardPlayed = (card) => {
    this.game.moveCard(card)
  }

  /**
   * Update tracker status
   */
  @action
  setStatus = (val) => {
    this.status = val
  }

  /**
   * Set deck list with hash retrived from
   * Hearthstone itself
   */
  @action
  setDeckList = (string) => {
    let deck = DeckRecipe.convertListToCardIds(string)
    this.info = deck
    this.list = deck.cards
    this.wins = 0
    this.loses = 0
  }

  @action
  gameWon () {
    this.wins++
  }

  @action
  gameLost () {
    this.loses++
  }

  /**
   * Get deck list from the tracker
   */
  @computed get deckList () {
    let list = Array.from(this.list.values())
    let foundList = Object.values(this.game.teamFRIENDLY.deckList)
    if (!list.length) {
      list = foundList
    }
    let playedCards = this.playedCards
    return list.sort((a, b) => {
      if (a.info.cost < b.info.cost) {
        return -1
      }
      if (a.info.cost > b.info.cost) {
        return 1
      }
      return a.info.dbfId > b.info.dbfId ? 1 : -1
    })
  }

  @computed get playedCards () {
    if (this.isReady) {
      return {}
    }
    return this.game.teamFRIENDLY.cardsAlreadyPlayed
  }

  /**
   * Is tracker ready and already tracking
   */
  @computed get isReady() {
    return this.isTracking && Collections.isReady
  }
}