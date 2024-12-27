import type * as Type from '@card-games/types'
import React from 'react'

interface Props {
  card: Type.Card,
}

export class Card extends React.Component<Props> {
  override render() {
    const { card } = this.props
    const isRed = true

    return (
      <div
        className="card"
        data-testid={`card-${card.id}`}
        style={{
          backgroundColor: 'white',
          border: '1px solid #000',
          borderRadius: '8px',
          color: isRed ? 'red' : 'black',
          display: 'inline-flex',
          fontSize: '24px',
          height: '120px',
          justifyContent: 'center',
          padding: '8px',
          position: 'relative',
          width: '80px',
        }}
      >
        <div
          style={{
            left: '8px',
            position: 'absolute',
            top: '8px',
          }}
        >
          {card.rank}
        </div>
        <div
          style={{
            bottom: '8px',
            position: 'absolute',
            right: '8px',
            transform: 'rotate(180deg)',
          }}
        >
          {card.rank}
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            fontSize: '32px',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {this.getSuitSymbol()}
        </div>
      </div>
    )
  }

  private getSuitSymbol() {
    return '♥'
  }
}
