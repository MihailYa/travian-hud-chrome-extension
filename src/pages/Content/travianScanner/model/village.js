export class Village {
  constructor(villageIndex, villageId, villageName, villageLinkRef, coordinates /* : {x, y} */, isActive) {
    this.villageIndex = villageIndex;
    this.villageId = villageId;
    this.villageName = villageName;
    this.villageLinkRef = villageLinkRef;
    this.coordinates = coordinates;
    this.isActive = isActive;
  }
}