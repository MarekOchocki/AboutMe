import { MachineType } from "./machine-type";

export class ProductionStep {
    public itemName: string;
    public craftingSpeedNeeded: number;
    public machineType: MachineType;

    public constructor(itemName: string, craftingSpeed: number, machineType: MachineType) {
        this.itemName = itemName;
        this.craftingSpeedNeeded = craftingSpeed;
        this.machineType = machineType;
    }
}