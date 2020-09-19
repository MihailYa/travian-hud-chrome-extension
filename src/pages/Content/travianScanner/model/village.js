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

export function createVillage(villageIndex, villageId, villageName, villageLinkRef, coordinates /* : {x, y} */, isActive) {
  return {
    villageIndex: villageIndex,
    villageId: villageId,
    villageName: villageName,
    villageLinkRef: villageLinkRef,
    coordinates: coordinates,
    isActive: isActive
  }
}