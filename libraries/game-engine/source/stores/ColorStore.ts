import * as Type from '@card-games/types'
import { action, computed, makeObservable, observable } from 'mobx'

export class ColorStore {
  @observable private colors = new Map<string, Type.Color>()

  constructor() {
    makeObservable(this)
    this.addColors(Type.BASIC_COLORS)
  }

  @action addColor(color: Type.Color) {
    this.colors.set(color.id, color)
  }

  @action addColors(colors: Type.Color[]) {
    colors.forEach(color => this.addColor(color))
  }

  @computed get allColors(): Type.Color[] {
    return Array.from(this.colors.values())
  }

  getColor(id: string): Type.Color | undefined {
    return this.colors.get(id)
  }
}
