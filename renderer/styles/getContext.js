/* eslint-disable no-underscore-dangle */

import { create, SheetsRegistry } from 'jss'
import preset from 'jss-preset-default'
import { createMuiTheme, createGenerateClassName } from 'material-ui/styles'
import { blue, purple, orange, blueGrey } from 'material-ui/colors'

const colors = {
  CardTile: blueGrey[600],
  CardTileHover: blueGrey[400],
  CommonCard: blueGrey[300],
  RareCard: blue[700],
  EpicCard: purple[700],
  LegendaryCard: orange[700]
}

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    CardTileMana: colors.CardTile,
    CardTileColor: colors.CardTile,
    CardTileColorHover: colors.CardTileHover,
    FREECard: colors.CommonCard,
    COMMONCard: colors.CommonCard,
    RARECard: colors.RareCard,
    EPICCard: colors.EpicCard,
    LEGENDARYCard: colors.LegendaryCard
  },
  overrides: {
    MuiList: {
      dense: {
        paddingTop: '0px',
        paddingBottom: '0px'
      }
    },
    MuiListItem: {
      // Name of the styleSheet
      root: {
        background: colors.CardTile,
        borderColor: colors.CardTile,
        margin: '1px',
        overflow: 'hidden',
        paddingLeft: '0px',
        zIndex: '1'
      },
      dense: {
        paddingTop: '5px',
        paddingBottom: '5px'
      },
      button: {
        margin: '1px 0px',
        '&:hover': {
          transition: '0.5s',
          borderColor: colors.CardTileHover,
          backgroundColor: colors.CardTileHover
        }
      }
    },
    MuiTypography: {
      subheading: {
        color: 'white',
        fontFamily: '"Montserrat", sans-serif'
      }
    }
  }
})

// Configure JSS
const jss = create(preset())

function createContext () {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName()
  }
}

export default function getContext () {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createContext()
  }

  // Reuse context on the client-side
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createContext()
  }

  return global.__INIT_MATERIAL_UI__
}
