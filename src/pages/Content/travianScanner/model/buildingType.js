export const BuildingType = {
  BARRACKS: { index: 0, id: 'gid19', name: 'BARRACKS' },
  STABLE: { index: 1, id: 'gid20', name: 'STABLE' },
  PALACE: { index: 2, id: 'gid26', name: 'PALACE' },
  RESIDENCE: { index: 3, id: 'gid25', name: 'RESIDENCE' },
  MARKETPLACE: { index: 4, id: 'gid17', name: 'MARKETPLACE' },
  TOWN_HALL: { index: 5, id: 'gid24', name: 'TOWN_HALL' },
  ACADEMY: { index: 6, id: 'gid22', name: 'ACADEMY' },
  RALLY_POINT: { index: 7, id: 'gid16', name: 'RALLY_POINT' },
  SMITHY: { index: 8, id: 'gid13', name: 'SMITHY' },
}

export const BuildingIdToBuildingType = {
  gid13: BuildingType.SMITHY,
  gid16: BuildingType.RALLY_POINT,
  gid17: BuildingType.MARKETPLACE,
  gid19: BuildingType.BARRACKS,
  gid20: BuildingType.STABLE,
  gid22: BuildingType.ACADEMY,
  gid24: BuildingType.TOWN_HALL,
  gid25: BuildingType.RESIDENCE,
  gid26: BuildingType.PALACE
}

export function getBuildingTypeById(buildingId) {
return BuildingIdToBuildingType[buildingId];
}