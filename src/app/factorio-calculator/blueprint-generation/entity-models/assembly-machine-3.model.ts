import { EntityDirection } from "../entity-properties/direction.enum";
import { EntityPosition } from "../entity-properties/position.model";

export class AssemblyMachine3Entity {
  entity_number: number;
  name = 'assembling-machine-3';
  position: EntityPosition;
  recipe: string;
  items: {'productivity-module-3': number} | undefined = undefined;
  direction = EntityDirection.left; // always rotated in the left direction. This means that input pipe is on the right, and output pipe is on the left

  public constructor(entity_number: number, position: EntityPosition, recipe: string) {
    this.entity_number = entity_number;
    this.position = position;
    this.recipe = recipe;
  }
  
  public static makeMachineWithProductivityModules(entity_number: number, position: EntityPosition, recipe: string): AssemblyMachine3Entity {
    const result = new AssemblyMachine3Entity(entity_number, position, recipe);
    result.items = {
      'productivity-module-3': 4
    };
    return result;
  }
}