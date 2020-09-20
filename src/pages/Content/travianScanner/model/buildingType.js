export const BuildingType = {
  BARRACKS: { index: 0, id: 'gid19' },
  STABLE: { index: 1, id: 'gid20' },
  PALACE: { index: 2, id: 'gid26' },
  RESIDENCE: { index: 3, id: 'gid25' },
  MARKETPLACE: { index: 4, id: 'gid17' },
  TOWN_HALL: { index: 5, id: 'gid24' },
  ACADEMY: { index: 6, id: 'gid22' },
  RALLY_POINT: { index: 7, id: 'gid16' },
  SMITHY: { index: 8, id: 'gid13' },
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