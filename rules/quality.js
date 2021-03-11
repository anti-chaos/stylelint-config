module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern': null,
    'selector-no-qualifying-type': [true, { ignore: ['class'] }],
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-redundant-longhand-properties': true,
  },
};
