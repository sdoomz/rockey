import when from 'rockey/when';
import insert from 'rockey/insert';
import condition from 'rockey/condition';

import { getRockeyHoc } from './RockeyHoc';
import assignShortcuts from './assignShortcuts';
import look from './look';
import handler from './handler';

const RockeyHoc = getRockeyHoc();

const RootRockeyHoc = (...args) => {
  let displayName = null;
  let BaseComponent = null;
  let css = null;

  // TODO: check types
  if (args.length === 1) {
    BaseComponent = args[0];

    // if (!isString(BaseComponent)) {
    displayName = BaseComponent.name || BaseComponent.displayName;
    // }

    css = args[1];
  } else {
    displayName = args[0];
    BaseComponent = args[1];
    css = args[2];
  }

  return RockeyHoc(BaseComponent, {
    displayName,
    css,
  });
};

RootRockeyHoc.look = look;
RootRockeyHoc.when = when;
RootRockeyHoc.condition = condition;
RootRockeyHoc.insert = insert;
RootRockeyHoc.handler = handler;

assignShortcuts(RootRockeyHoc);

export default RootRockeyHoc;
export { when };
