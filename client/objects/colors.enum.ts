export enum Colors {
  Their = 'blue',
  Our = 'red',
}

interface Style {
  fill: string;
  stroke: string;
}

interface RectangleStyles {
  parked: Style;
  validPosition: Style;
  invalidPosition: Style
}

export const DrawColors:
  {
    [Colors.Our]: RectangleStyles,
    [Colors.Their]: RectangleStyles,
  } = {
  [Colors.Our]: {
    parked: {
      fill: 'hsla(340, 50%, 30%, .3)',
      stroke: 'hsla(340, 50%, 30%, .9)',
    },
    validPosition: {
      fill: 'hsla(340, 50%, 30%, .3)',
      stroke: 'hsla(340, 50%, 30%, .9)',
    },
    invalidPosition: {
      fill: 'hsla(340, 5%, 30%, .3)',
      stroke: 'hsla(340, 5%, 30%, .9)',
    },
  },
  [Colors.Their]: {
    parked: {
      fill: 'hsla(220, 50%, 30%, .3)',
      stroke: 'hsla(220, 50%, 30%, .9)',
    },
    validPosition: {
      fill: 'hsla(220, 50%, 30%, .3)',
      stroke: 'hsla(220, 50%, 30%, .9)',
    },
    invalidPosition: {
      fill: 'hsla(220, 5%, 30%, .3)',
      stroke: 'hsla(220, 5%, 30%, .9)',
    },
  },
};
