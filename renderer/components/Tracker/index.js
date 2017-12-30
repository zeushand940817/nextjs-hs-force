import {observer} from 'mobx-react'
import {autorun} from 'mobx'
import React, { Component } from 'react'
import { LinearProgress } from 'material-ui/Progress'
import {Grid, Typography} from 'material-ui'
import Button from 'material-ui/Button'

import TrackingUtil from '../../stores/Tracker'
import DeckRecipe from '../../stores/DeckRecipe'
import Collections from '../../stores/Game/Collections'

import BasicList from '../libs/List/BasicList'
import BasicDropdown from '../libs/Dropdown/BasicDropdown'

import CardTile from '../CardTile'
import TrackerHeader from './TrackerHeader'
import TrackerFooter from './TrackerFooter'

const Tracker = new TrackingUtil()
global.t = Tracker

autorun(()=>{
  if( Tracker.status === 'TRACKING' ) {
    let list = Tracker.deckList.length
    let remote = require('electron').remote
    let element = document.getElementById('__next')
    let currentWindow = remote.getCurrentWindow()
    setTimeout(()=> {
      currentWindow.setSize(
        300, 
        element.offsetHeight < 800 ? element.offsetHeight : 800
      )
    }, 100)
  }
})

@observer
class Tracking extends Component {

  render () {
    return (
      <Grid container spacing={0}>
        {this.renderContent()}
      </Grid>
    )
  }

  renderContent () {
    if (!Tracker) {
      return this.renderLoading()
    }
    switch(Tracker.status) {
      case 'TRACKING':
        return this.renderList()
      case 'MISSING_FOLDER_SET':
        return this.renderFolderButton()
    }
  }

  /**
   * Render card list
   */
  renderList () {
    return (
      <Grid container spacing={0}>
        <Grid container spacing={0}>
          <TrackerHeader tracker={Tracker} />
        </Grid>
        <Grid container spacing={0}>
          <BasicList
            id={'deckList'}
            fullWidth={true}
            getText={(obj)=>{return (<CardTile playedCards={Tracker.playedCards} card={obj} />)}}
            data={Tracker.deckList}
          />
        </Grid>
        <Grid container spacing={0}>
          <TrackerFooter wins={Tracker.wins} loses={Tracker.loses}  tracker={Tracker} />
        </Grid>
      </Grid>
    ) 
  }

  /**
   * Show loading part when tracker is setting up
   */
  renderLoading () {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography type="headline" align='center' gutterBottom>
            Loading...
          </Typography>
          <LinearProgress color='primary' mode='query' />
        </Grid>
      </Grid>
    )
  }

  /**
   * Show button to select folder
   */
  renderFolderButton () {
    return (
      <Grid container>
        <Grid style={{textAlign: 'center'}} item xs={12}>
          <input
            accept=".txt"
            id="selectFolder"
            type="file"
            style={{display: 'none'}}
            multiple={false}
            webkitdirectory="true"
            onChange={this._onFileSelect}
          />
          <label htmlFor="selectFolder">
            <Button raised component="span">
              SELECT FOLDER WITH HS
            </Button>
          </label>
        </Grid>
      </Grid>
    )
  }

  _onFileSelect (event) {
    event.preventDefault()
    const {path} = [ ...event.target.files ][0]
    Tracker.setLogFile(path)
  }

}

export default Tracking
