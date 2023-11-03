

export class Blueprint {
  blueprint: {
    entities: any[],
    icons: { index: 1, signal: { name: string, type: 'item' } }[],
    item: 'blueprint',
    version: 281479277641728
  }

  public constructor(entities: any[]) {
    this.blueprint = {
      entities,
      icons: [{ index: 1, signal: { name: 'beacon', type: 'item' } }],
      item: 'blueprint',
      version: 281479277641728
    }
  }
}