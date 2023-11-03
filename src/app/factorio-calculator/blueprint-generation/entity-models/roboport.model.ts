import { EntityPosition } from "../entity-properties/position.model";

export class RoboportEntity {
  entity_number: number;
  name = 'roboport';
  position: EntityPosition;

  public constructor(entity_number: number, position: EntityPosition) {
    this.entity_number = entity_number;
    this.position = position;
  }
}