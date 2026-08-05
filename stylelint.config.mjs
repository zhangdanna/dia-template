/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-vue', 'stylelint-config-recess-order'],
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'declaration-property-value-no-unknown': null,
  },
}
