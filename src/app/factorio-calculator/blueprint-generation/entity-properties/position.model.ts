export class EntityPosition {
  constructor(public x: number, public y: number) { }

  public add(position: EntityPosition): EntityPosition {
    return new EntityPosition(this.x + position.x, this.y + position.y);
  }
}