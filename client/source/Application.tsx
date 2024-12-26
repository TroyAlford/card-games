import { GameBoard } from '@card-games/components'
import * as React from 'react'

interface ApplicationState {
  dimensions: {
    height: number,
    width: number,
  },
}

export class Application extends React.Component<{}, ApplicationState> {
  state = {
    dimensions: {
      height: window.innerHeight,
      width: window.innerWidth,
    },
  }

  private updateDimensions = () => {
    this.setState({
      dimensions: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render() {
    const { height, width } = this.state.dimensions
    return (
      <div style={{ height: '100vh', overflow: 'hidden', width: '100vw' }}>
        <GameBoard height={height} width={width} />
      </div>
    )
  }
}
