﻿// TODO can we just declare the keydownHandler once? using `this`?
function makeKeyDefinition(code?: number) {
  return (node, fire) => {
    function keydownHandler(event) {
      const which = event.which || event.keyCode;

      if (code && which === code) {
        event.preventDefault();

        fire({
          node,
          original: event
        });
      }
      else if (!code && [16, 17, 18, 35, 36, 13, 9, 27, 32, 37, 39, 40, 38].filter(c => c === which).length === 0) {
        fire({
          node,
          original: event
        });
      }
    }

    node.addEventListener('keydown', keydownHandler, false);

    return {
      teardown() {
        node.removeEventListener('keydown', keydownHandler, false);
      }
    };
  };
}

export const enter = makeKeyDefinition(13);
export const tab = makeKeyDefinition(9);
export const escape = makeKeyDefinition(27);
export const space = makeKeyDefinition(32);

export const leftarrow = makeKeyDefinition(37);
export const rightarrow = makeKeyDefinition(39);
export const downarrow = makeKeyDefinition(40);
export const uparrow = makeKeyDefinition(38);

export const anykey = makeKeyDefinition();