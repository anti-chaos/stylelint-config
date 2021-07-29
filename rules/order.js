function genTrbl(prop) {
  const rules = [];

  let prefix = "";

  if (prop) {
    rules.push(prop);
    prefix = `${prop}-`;
  }

  return [...rules, ...["top", "right", "bottom", "left"].map(dir => `${prefix}${dir}`)];
}

function genMinMax(prop) {
  return [prop, `min-${prop}`, `max-${prop}`];
}

function genBorder(dir) {
  let infix = "";

  if (dir) {
    infix = `-${dir}`;
  }

  const prop = `border${infix}`;

  return [prop, ...["width", "style", "color"].map(bp => `${prop}-${bp}`)];
}

const THIRD_PARTY_PROPS = [
  "composes", // for CSS Modules
  "all" // for reset (see: https://developer.mozilla.org/en-US/docs/Web/CSS/all)
];

const POSITIONING_PROPS = ["position", ...genTrbl(), "z-index"];

const SELF_CONTROL_FLEX_PROPS = [
  "flex",
  "flex-grow",
  "flex-shrink",
  "flex-basis",
  "place-self",
  "align-self",
  "justify-self"
];

const SELF_IN_PARENT_PROPS = [...POSITIONING_PROPS, ...SELF_CONTROL_FLEX_PROPS, "float"];

const OVERFLOW_PROPS = ["overflow", "overflow-x", "overflow-y"];

const LIST_PROPS = ["list-style", "list-style-type", "list-style-position", "list-style-image"];

const CHILDREN_CONTROL_FLEX_PROPS = [
  "flex-flow",
  "flex-direction",
  "flex-wrap",
  "place-content",
  "align-content",
  "justify-content",
  "place-items",
  "align-items",
  "justify-items",
  "order"
];

const CHILDREN_IN_SELF_PROPS = [...OVERFLOW_PROPS, "display", "vertical-align", ...LIST_PROPS, ...CHILDREN_CONTROL_FLEX_PROPS];

const BORDER_NORMAL_PROPS = [].concat(
  genBorder(),
  genBorder("top"),
  genBorder("right"),
  genBorder("bottom"),
  genBorder("left")
);

const BORDER_RADIUS_PROPS = [
  "border-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-right-radius",
  "border-bottom-left-radius"
];

const BORDER_IMAGE_PROPS = [
  "border-image",
  "border-image-source",
  "border-image-slice",
  "border-image-width",
  "border-image-outset",
  "border-image-repeat"
];

const BORDER_PROPS = [].concat(BORDER_NORMAL_PROPS, BORDER_RADIUS_PROPS, BORDER_IMAGE_PROPS);

const SELF_SPECIAL_PROPS = ["content", "quotes"];

const BOX_MODEL_PROPS = [].concat(
  "box-sizing",
  genMinMax("width"),
  genMinMax("height"),
  genTrbl("margin"),
  genTrbl("padding"),
  BORDER_PROPS
);

const FONT_PROPS = [
  "font",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "font-smoothing",
  "line-height"
];

const TEXT_PROPS = [
  "color",
  "letter-spacing",
  "text-align",
  "text-decoration",
  "text-indent",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-transform",
  "word-spacing",
  "word-break",
  "word-wrap",
  "white-space",
];

const TYPOGRAPHY_PROPS = [...FONT_PROPS, ...TEXT_PROPS];

const BACKGROUND_PROPS = [
  "background",
  "background-attachment",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-repeat",
  "background-size"
];

const VISUAL_PROPS = [...BACKGROUND_PROPS, "opacity"];

const TRANSFORMATION_PROPS = [
  "transform",
  "transform-origin",
  "transform-box",
  "transform-style",
  "perspective",
  "perspective-origin",
  "backface-visibility"
];

const ANIMATION_PROPS = [
  "animation",
  "animation-name",
  "animation-duration",
  "animation-timing-function",
  "animation-delay",
  "animation-iteration-count",
  "animation-direction",
  "animation-fill-mode",
  "animation-play-state"
];

const thirdPartyProps = { groupName: "Third-party props", properties: THIRD_PARTY_PROPS };
const selfInParentProps = { groupName: "Self in parent props", properties: SELF_IN_PARENT_PROPS };
const childrenInSelfProps = { groupName: "Children in self props", properties: CHILDREN_IN_SELF_PROPS };
const selfSpecialProps = { groupName: "Self special props", properties: SELF_SPECIAL_PROPS };
const boxModelProps = { groupName: "Box model props", properties: BOX_MODEL_PROPS };
const typographyProps = { groupName: "Typography props", properties: TYPOGRAPHY_PROPS };
const visualProps = { groupName: "Visual props", properties: VISUAL_PROPS };
const transformationrops = { groupName: "Transformation props", properties: TRANSFORMATION_PROPS };
const animationProps = { groupName: "Animation props", properties: ANIMATION_PROPS };

module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    'order/order': [
      [
        'custom-properties',
        'dollar-variables',
        {
          'type': 'at-rule',
          'name': 'extend'
        },
        {
          'type': 'at-rule',
          'name': 'include',
          'hasBlock': false
        },
        'declarations',
        {
          'type': 'at-rule',
          'name': 'include',
          'hasBlock': true
        },
        'rules'
      ]
    ],
    'order/properties-alphabetical-order': null,
    'order/properties-order': [
      [].concat(
        thirdPartyProps,
        selfInParentProps,
        childrenInSelfProps,
        selfSpecialProps,
        boxModelProps,
        typographyProps,
        visualProps,
        transformationrops,
        animationProps
      ),
      { unspecified: 'bottomAlphabetical' },
    ],
  },
};
