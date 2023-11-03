import { EntityPosition } from "../entity-properties/position.model";

export class BeaconEntity {
  entity_number: number;
  items: { 'speed-module-3': number };
  name = 'beacon';
  position: EntityPosition;

  private constructor(entity_number: number, position: EntityPosition, items: { 'speed-module-3': number }) {
    this.entity_number = entity_number;
    this.items = items;
    this.position = position;
  }

  public static makeBeaconWithSpeedModules(entity_number: number, position: EntityPosition): BeaconEntity {
    return new BeaconEntity(entity_number, position, { 'speed-module-3': 2 });
  }
}