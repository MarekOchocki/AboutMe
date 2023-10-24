import { MachineType } from "./machine-type";

export class ProductionStep {
    public itemName: string;
    public craftingSpeedNeeded: number;
    public machineType: MachineType;
    public machinesAmount: number;

    public constructor(itemName: string, craftingSpeed: number, machineType: MachineType, machinesAmount: number) {
        this.itemName = itemName;
        this.craftingSpeedNeeded = craftingSpeed;
        this.machineType = machineType;
        this.machinesAmount = machinesAmount;
    }
}