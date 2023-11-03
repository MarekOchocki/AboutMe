import { EntityPosition } from "../entity-properties/position.model";


export class LogisticChestActiveProviderEntity {
  entity_number: number;
  name = 'logistic-chest-active-provider';
  position: EntityPosition;
  bar = 1; // always limited to storing no more than 1 stack of resources
  
  public constructor(entity_number: number, position: EntityPosition) {
    this.entity_number = entity_number;
    this.position = position;
  }
}