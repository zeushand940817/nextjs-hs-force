import {action, observable} from 'mobx'
import Team from './Team'
import Card from './Card'

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

const WATCHING_ZONES = [
  "DECK",
  "HAND",
  "PLAY",
  "GRAVEYARD"
]

export default class {
  @observable gameId
  @observable teamFRIENDLY
  @observable teamOPPOSING
  @observable logMoves = []
  @observable status

  constructor() {
    this.gameId = Math.random()
    this.teamFRIENDLY = new Team('FRIENDLY')
    this.teamOPPOSING = new Team('OPPOSING')
  }

  @action
  setPlayer = (playerInfo) => {
    if (this['team' + playerInfo.team]) {
      this['team' + playerInfo.team].setPlayer(playerInfo)
    }
    if (playerInfo.team === 'FRIENDLY' && playerInfo.status && !this.status) {
      this.status = playerInfo.status
    }
  }

  @action
  moveCard(moveInfo) {
    this.logMoves.push(moveInfo)
    let card = new Card(moveInfo)
    if ( this['team' + moveInfo.fromTeam] ) {
      this['team' + moveInfo.fromTeam].zones[moveInfo.fromZone].remove(card)
    }
    if( this['team' + moveInfo.toTeam] ) {
      this['team' + moveInfo.toTeam].zones[moveInfo.toZone].add(card)
    }
  }

  get getZones () {
    return WATCHING_ZONES
  }

  get teamFRIENDLY () {
    return this.teamFRIENDLY
  }
  
  get teamOPPOSING () {
    return this.teamOPPOSING
  }

  getHero(team) {
    return this[team].zones["PLAY (Hero)"].entites.values().next().value
  }
  
  get friendlyHero() {
    return this.getHero('teamFRIENDLY')
  }

  get opposingHero() {
    return this.getHero('teamOPPOSING')
  }
}