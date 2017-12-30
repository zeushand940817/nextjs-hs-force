import React, { Component } from 'react'
import ThemeLayout from './libs/Layout/ThemeLayout'
import Head from 'next/head'

class App extends Component {
  render () {
    return (
      <ThemeLayout theme={this.props.theme}>
        <Head>
          <link href='https://fonts.googleapis.com/css?family=Montserrat:600' rel='stylesheet' />
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        {this.props.children}
      </ThemeLayout>
    )
  }
}

export default App
