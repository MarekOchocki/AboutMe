import { Item } from "./item";
import { MachineType } from "./machine-type";
import { ProductionStep } from "./production-step";

export class ProductionRaport {
    private craftingSpeedNeeded = new Map<MachineType, number>();
    private resourceUsagePerMinute = new Map<string, number>();
    public productionSteps: ProductionStep[];

    public constructor(productionSteps: ProductionStep[], basicResourcesNeededPerMinute: Item[]) {
        this.productionSteps = productionSteps;
        this.sumCraftingSpeedNeeded(productionSteps);
        this.sumBasicResourcesNeeded(basicResourcesNeededPerMinute);
    }

    public toString(): string {
        let result = "";
        this.craftingSpeedNeeded.forEach((value, type) => result += `Crafting speed for ${type}: ${value}\n`);

        this.productionSteps.forEach(step => {
            result += `${step.machineType} for ${step.itemName}: ${step.craftingSpeedNeeded} crafting speed\n`;
        });

        this.resourceUsagePerMinute.forEach((value, itemName) => result += `\nResource per minute ${itemName}: ${value}`);
        return result;
    }

    private sumBasicResourcesNeeded(basicResourcesNeededPerMinute: Item[]) {
        basicResourcesNeededPerMinute.forEach(res => {
            this.resourceUsagePerMinute.set(res.name, this.getResourceUsagePerMinute(res) + res.count);
        });
    }

    private getResourceUsagePerMinute(item: Item): number {
        if(this.resourceUsagePerMinute.has(item.name))
            return this.resourceUsagePerMinute.get(item.name) as number;
        return 0;
    }

    private sumCraftingSpeedNeeded(productionSteps: ProductionStep[]): void {
        let assembly = 0;
        let furnace = 0;
        let plant = 0;
        let rafinery = 0;
        productionSteps.forEach(step => {
            if(step.machineType === MachineType.AssembyMachine)
                assembly += step.craftingSpeedNeeded;
            if(step.machineType === MachineType.ChemicalPlant)
                plant += step.craftingSpeedNeeded;
            if(step.machineType === MachineType.Furnace)
                furnace += step.craftingSpeedNeeded;
            if(step.machineType === MachineType.OilRafinery)
                rafinery += step.craftingSpeedNeeded;
        });
        this.craftingSpeedNeeded.set(MachineType.AssembyMachine, assembly);
        this.craftingSpeedNeeded.set(MachineType.Furnace, furnace);
        this.craftingSpeedNeeded.set(MachineType.ChemicalPlant, plant);
        this.craftingSpeedNeeded.set(MachineType.OilRafinery, rafinery);
    }
}