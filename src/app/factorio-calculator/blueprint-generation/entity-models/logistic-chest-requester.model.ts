import { EntityPosition } from "../entity-properties/position.model";

class RequestFilter {
  public constructor(public count: number, public name: string, public index: number) {}
}

export class RequestFilterArray {
  filters: RequestFilter[] = [];

  public addFilter(count: number, name: string) {
    this.filters.push(new RequestFilter(count, name, this.filters.length + 1));
  }
}

export class LogisticChestRequesterEntity {
  entity_number: number;
  name = 'logistic-chest-requester';
  position: EntityPosition;
  request_filters: RequestFilter[];
  
  public constructor(entity_number: number, position: EntityPosition, filters: RequestFilterArray) {
    this.entity_number = entity_number;
    this.position = position;
    this.request_filters = filters.filters;
  }
}