const horizontalHalfScreen = () => window.innerWidth / 2;
const verticalHalfScreen = () => window.innerHeight / 2;

type CoordinateTuple = [number, number];

export const upperLeftCorner = (): CoordinateTuple => [-horizontalHalfScreen(), -verticalHalfScreen()];
export const upperRightCorner = (): CoordinateTuple => [horizontalHalfScreen(), -verticalHalfScreen()];
export const lowerRightCorner = (): CoordinateTuple => [horizontalHalfScreen(), verticalHalfScreen()];
export const lowerLeftCorner = (): CoordinateTuple => [-horizontalHalfScreen(), verticalHalfScreen()];
