function genTrbl(prop) {
  const rules = [];

  let prefix = '';

  if (prop) {
    rules.push(prop);
    prefix = `${prop}-`;
  }

  return [...rules, ...['top', 'right', 'bottom', 'left'].map(dir => `${prefix}${dir}`)];
}

function genMinMax(prop) {
  return [prop, `min-${prop}`, `max-${prop}`];
}

function genBorder(dir) {
  let infix = '';

  if (dir) {
    infix = `-${dir}`;
  }

  const prop = `border${infix}`;

  return [prop, ...['width', 'style', 'color'].map(bp => `${prop}-${bp}`)];
}

const cssModules = 'composes';
const reset = 'all';

const elementSpecific = {
  groupName: 'elementSpecific',
  properties: [
    'content',
    'quotes',
    'list-style',
    'list-style-type',
    'list-style-position',
    'list-style-image',
  ],
};

const positioning = {
  groupName: 'positioning',
  properties: ['position', ...genTrbl(), 'z-index'],
};

const boxModel = {
  groupName: 'boxModel',
  properties: [].concat(
    'box-sizing',
    'display',
    'float',
    'flex',
    'flex-grow',
    'flex-shrink',
    'flex-basic',
    'flex-direction',
    'flex-flow',
    'flex-wrap',
    'align-content',
    'align-items',
    'align-self',
    'justify-content',
    'justify-items',
    'justify-self',
    'order',
    genMinMax('width'),
    genMinMax('height'),
    genTrbl('margin'),
    genTrbl('padding'),
    genBorder(),
    genBorder('top'),
    genBorder('right'),
    genBorder('bottom'),
    genBorder('left'),
    'overflow',
    'overflow-x',
    'overflow-y',
    'vertical-align',
  ),
};

const typography = {
  groupName: 'typography',
  properties: [
    'font',
    'font-family',
    'font-size',
    'font-weight',
    'font-style',
    'font-smoothing',
    'line-height',
    'color',
    'letter-spacing',
    'text-align',
    'text-decoration',
    'text-indent',
    'text-overflow',
    'text-rendering',
    'text-shadow',
    'text-transform',
    'word-spacing',
    'word-break',
    'word-wrap',
    'white-space',
  ],
};

const visual = {
  groupName: 'visual',
  properties: [
    'background',
    'background-color',
    'background-image',
    'background-position',
    'background-repeat',
    'background-size',
    'opacity',
  ],
};

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  plugins: ['stylelint-order', 'stylelint-scss', 'stylelint-selector-bem-pattern'],
  rules: {
    'selector-class-pattern': null,
    'selector-no-qualifying-type': [true, { ignore: ['class'] }],
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'order/properties-alphabetical-order': null,
    'order/properties-order': [
      [cssModules, reset, elementSpecific, positioning, boxModel, typography, visual],
      { unspecified: 'bottomAlphabetical' },
    ],
    'plugin/selector-bem-pattern': {
      preset: 'suit',
    },
  },
};
