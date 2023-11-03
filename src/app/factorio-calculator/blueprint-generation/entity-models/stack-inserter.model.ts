import { EntityDirection } from "../entity-properties/direction.enum";
import { EntityPosition } from "../entity-properties/position.model";

export class StackInserterEntity {
  entity_number: number;
  name = 'stack-inserter';
  position: EntityPosition;
  direction: EntityDirection;

  public constructor(entity_number: number, position: EntityPosition, direction: EntityDirection) {
    this.entity_number = entity_number;
    this.position = position;
    this.direction = direction;
  }
}