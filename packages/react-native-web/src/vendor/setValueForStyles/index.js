/* eslint-disable */

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * From React 16.0.0
 */

import dangerousStyleValue from '../dangerousStyleValue';
import hyphenateStyleName from 'hyphenate-style-name';
import warnValidStyle from '../warnValidStyle';

/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} node
 * @param {object} styles
 */
function setValueForStyles(node, styles, getStack) {
  const style = node.style;
  for (let styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    const isCustomProperty = styleName.indexOf('--') === 0;
    const isImportant =
      typeof styles[styleName] === 'string' && styles[styleName].indexOf('!important') > -1;
    if (process.env.NODE_ENV !== 'production') {
      if (!isCustomProperty) {
        warnValidStyle(styleName, styles[styleName], getStack);
      }
    }
    const styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);
    if (styleName === 'float') {
      styleName = 'cssFloat';
    }
    if (isCustomProperty || isImportant) {
      if (isImportant) {
        const [value, priority] = styleValue.split('!');
        style.setProperty(hyphenateStyleName(styleName), value, priority);
      } else {
        style.setProperty(styleName, styleValue);
      }
    } else {
      style[styleName] = styleValue;
    }
  }
}

export default setValueForStyles;
