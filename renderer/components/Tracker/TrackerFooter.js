import React, { Component } from 'react'
import {Grid} from 'material-ui'
import IconButton from 'material-ui/IconButton'
import Refresh from 'material-ui-icons/Refresh'
import { withStyles, withTheme } from 'material-ui/styles'

const style = theme => ({
  Details: {
    textAlign: 'center',
    '-webkit-app-region': 'drag',
    backgroundColor: theme.palette.CardTileMana,
    color: 'white'
  },
  Numbers: {
    lineHeight: '35px',
    fontSize: '25px',
    paddingLeft: '5px',
    fontFamily: '"Montserrat", sans-serif'
  },
  IconButton: {
    height: '24px',
    '-webkit-app-region': 'no-drag'
  }
})

@withStyles(style) @withTheme()
class TrackerFooter extends Component {
  render () {
    return (
      <Grid container spacing={0}>
        <Grid className={this.props.classes.Details} item xs={3}>
          <span className={this.props.classes.Numbers}>
            {this.props.wins}{'-'}{this.props.loses}
          </span>
        </Grid>
        <Grid className={this.props.classes.Details} item xs={3}>
          {this.getCardsInHandIcon()}
          <span className={this.props.classes.Numbers}>
            {this.props.hand}
          </span>
        </Grid>
        <Grid className={this.props.classes.Details} item xs={3}>
          {this.getCardsInDeckIcon()}
          <span className={this.props.classes.Numbers}>
            {this.props.deck}
          </span>
        </Grid>
        <Grid className={this.props.classes.Details} item xs={3}>
          <span className={this.props.classes.Numbers}>
            {this.getResetButton()}
          </span>
        </Grid>
      </Grid>
    )
  }

  getCardsInHandIcon () {
    return (
      <svg style={{width:'24px',height:'20px'}} viewBox="0 0 24 24">
        <path fill="#fff" d="M11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05L6.93,20C7.24,20.77 7.97,21.23 8.74,21.25C9,21.25 9.27,21.22 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.25C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25M14.67,2.25L18.12,10.6V4.25A2,2 0 0,0 16.12,2.25M20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.78 21.47,4.36M11.19,4.22L16.17,16.24L8.78,19.3L3.8,7.29" />
      </svg>
    )
  }

  getCardsInDeckIcon () {
    return (
      <svg style={{width:'24px',height:'20px'}} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 90 90" enableBackground="new 0 0 90 90">
        <path fill="#fff" d="M93.864,39.124c0.647-0.633,1.004-1.513,0.963-2.457c-0.056-1.275-0.824-2.371-2.002-2.86L57.625,19.189  c-2.152-0.893-4.592-0.832-6.697,0.168L6.856,40.315C5.702,40.864,4.991,41.999,5,43.277c0.007,0.885,0.364,1.691,0.966,2.283  C5.352,46.164,4.993,46.99,5,47.893c0.007,0.885,0.364,1.691,0.966,2.283C5.352,50.78,4.993,51.606,5,52.509  c0.007,0.889,0.367,1.698,0.973,2.29C5.358,55.402,4.993,56.222,5,57.125c0.007,0.885,0.365,1.692,0.967,2.284  C5.352,60.012,4.993,60.838,5,61.741c0.01,1.278,0.738,2.402,1.9,2.932l35.659,16.303c1.098,0.502,2.264,0.752,3.429,0.752  c1.307,0,2.611-0.315,3.813-0.944l43.285-22.629c1.13-0.591,1.797-1.75,1.741-3.025c-0.037-0.841-0.39-1.598-0.961-2.159  c0.646-0.634,1.003-1.513,0.961-2.457c-0.037-0.841-0.388-1.6-0.958-2.162c0.644-0.633,1-1.511,0.958-2.454  c-0.037-0.841-0.389-1.598-0.96-2.16c0.646-0.633,1.002-1.512,0.961-2.455C94.79,40.442,94.436,39.686,93.864,39.124z   M92.072,40.233c0.476,0.198,0.773,0.623,0.796,1.137c0.022,0.514-0.236,0.963-0.692,1.201l-43.285,22.63  c-1.73,0.905-3.741,0.959-5.518,0.145L7.715,49.043c-0.468-0.214-0.751-0.65-0.755-1.166c-0.004-0.515,0.272-0.955,0.737-1.176  l0.137-0.065l34.725,15.876c1.098,0.502,2.264,0.752,3.429,0.752c1.307,0,2.611-0.315,3.813-0.944l42.26-22.093L92.072,40.233z   M92.072,44.849c0.476,0.197,0.773,0.622,0.795,1.136c0.023,0.514-0.235,0.963-0.691,1.202L48.892,69.817  c-1.73,0.904-3.741,0.958-5.518,0.145L7.715,53.659c-0.468-0.214-0.751-0.65-0.755-1.166c-0.004-0.515,0.272-0.955,0.737-1.176  l0.137-0.065l34.725,15.876c1.098,0.502,2.264,0.752,3.429,0.752c1.307,0,2.611-0.315,3.813-0.944l42.26-22.093L92.072,44.849z   M92.072,49.465c0.476,0.197,0.773,0.622,0.795,1.136c0.023,0.514-0.235,0.963-0.691,1.202L48.892,74.433  c-1.73,0.903-3.741,0.958-5.518,0.145L7.715,58.275c-0.468-0.214-0.751-0.65-0.755-1.166c-0.004-0.515,0.272-0.955,0.737-1.176  l0.137-0.065l34.725,15.876c1.098,0.502,2.264,0.752,3.429,0.752c1.307,0,2.611-0.315,3.813-0.944L92.059,49.46L92.072,49.465z   M7.698,42.086l44.073-20.958c0.85-0.404,1.772-0.607,2.696-0.607c0.817,0,1.637,0.159,2.406,0.479l35.199,14.618  c0.476,0.198,0.773,0.623,0.796,1.137c0.022,0.514-0.236,0.963-0.692,1.201l-43.285,22.63c-1.73,0.904-3.741,0.958-5.518,0.145  L7.715,44.427c-0.468-0.214-0.751-0.65-0.755-1.165C6.956,42.747,7.232,42.307,7.698,42.086z M92.177,56.42L48.892,79.049  c-1.73,0.904-3.741,0.959-5.518,0.145L7.715,62.891c-0.468-0.214-0.751-0.65-0.755-1.166c-0.004-0.515,0.272-0.955,0.737-1.176  l0.137-0.065L42.559,76.36c1.098,0.502,2.264,0.752,3.429,0.752c1.307,0,2.611-0.315,3.813-0.944l42.259-22.093l0.013,0.005  c0.476,0.197,0.773,0.622,0.795,1.136C92.891,55.731,92.632,56.18,92.177,56.42z"/>
      </svg>
    )
  }

  getResetButton () {
    return (
      <IconButton className={this.props.classes.IconButton} onClick={this.props.tracker.reset} color="contrast" aria-label="Reset tracker">
        <Refresh />
      </IconButton>
    )
  }
}

export default TrackerFooter
