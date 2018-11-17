export enum Colors {
  Their = 'blue',
  Our = 'red',
}

export const DrawColors = {
  [Colors.Our]: {
    fill: 'hsla(340, 50%, 30%, .3)',
    stroke: 'hsla(340, 50%, 30%, .9)',
  },
  [Colors.Their]: {
    fill: 'hsla(220, 50%, 30%, .3)',
    stroke: 'hsla(220, 50%, 30%, .9)',
  },
};
