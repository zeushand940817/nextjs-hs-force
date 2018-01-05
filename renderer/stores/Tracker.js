import mobx, {action, observable, computed, autorun} from 'mobx'
import Game from './Game'
import Collections from './Game/Collections'
import DeckRecipe from './DeckRecipe'
import Farseer from 'farseer'
import { remote } from 'electron'
import os from 'os'

const WIN_FILE_PATH = '\/Hearthstone_Data\/output_log.txt'
const MAC_FILE_PATH = process.env.HOME+'\/Library\/Logs\/Unity\/Player.log'


export default class {
  @observable status
  @observable logFile
  @observable game
  @observable info = {}
  @observable wins = 0
  @observable loses = 0
  @observable list = observable.map({})
  @observable lastHero = false

  tracker
  statusOptions = {
    tracking: 'TRACKING',
    missing: 'MISSING_FOLDER_SET',
    stop: 'STOP'
  }
  
  constructor() {
    this.setStatus(this.statusOptions.missing)
    autorun(this._buildTrackingList)
    autorun(this._onHeroChange)
  }

  _onHeroChange = () => {
    if (this.game && this.lastHero) {
      let hero = this.game.friendlyHero
      if (hero && this.lastHero && hero.info.cardClass !== this.lastHero.info.cardClass) {
        this.resetList()
      }
    }
  }

  _buildTrackingList = () => {
    if(this.game) {
      let foundList = this.game.teamFRIENDLY.deckList
      let ids = Object.keys(this.game.teamFRIENDLY.deckList)
      for(let card of ids) {
        let cardTracking = this.list.get(card)
        let cardFound = foundList[card]
        if(!cardTracking || (cardFound && cardTracking && cardTracking.count < cardFound.count )) {
          this.list.set(card, foundList[card])
        }
      }
    }
  }

  @action
  resetList = () => {
    this.list = observable.map({})
  }

  @action
  reset = () => {
    this.resetList()
    this.wins = 0
    this.loses = 0
  }

  @action
  setLogFile = (folder) => {
    if (!Farseer) {
      return false
    }
    let FILE_PATH = WIN_FILE_PATH
    if(!/^win/.test(os.platform())){
      FILE_PATH = MAC_FILE_PATH
    }
    console.log(FILE_PATH)
    this.logFile = `${folder}${FILE_PATH}`
    this.game = new Game()
    this.tracker = new Farseer({ logFile: this.logFile, customDir: remote.app.customDir })
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
    if(this.game.status) {
      if(this.game.status === 'WON') {
        this.gameWon()
      } else {
        this.gameLost()
      }
      this.lastHero = mobx.toJS(this.game.friendlyHero)
      this.game = new Game()
    }
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

  @computed get hero () {
    if (this.info.heroes) {
      return  this.game.heroes
    } else if (this.game.friendlyHero) {
      return this.game.friendlyHero 
    }
    return this.lastHero
  }

  @computed get deckSize () {
    if(this.game) {
      return this.game.teamFRIENDLY.DECK.entites.size
    }
    return 0
  }

  @computed get handSize () {
    if(this.game) {
      return this.game.teamFRIENDLY.HAND.entites.size
    }
    return 0
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