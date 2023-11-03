import { EntityPosition } from "../entity-properties/position.model";

export class MediumElectricPoleEntity {
  entity_number: number;
  neighbours: number[];
  name = 'medium-electric-pole';
  position: EntityPosition;

  public constructor(entity_number: number, position: EntityPosition, neighbours: number[]) {
    this.entity_number = entity_number;
    this.neighbours = neighbours;
    this.position = position;
  }
}