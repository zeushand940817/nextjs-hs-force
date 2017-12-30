import { blue, purple, orange, blueGrey, indigo } from 'material-ui/colors'

const colors = {
  CardTile: indigo[400],
  CardTileHover: indigo[300],
  CommonCard: blueGrey[700],
  RareCard: blue[700],
  EpicCard: purple[700],
  LegendaryCard: orange[700]
}

module.exports = {
  palette: {
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
}
