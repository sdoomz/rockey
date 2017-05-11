import createParser from '../lib/parse';
import createOptimizedParser from '../lib/parseOptimized';

import { stringifyRules } from '../lib/stringify';

const parse = createParser({
  getClassName: component => `c-${component}-hash`,
  getMixinClassName: component => `m-${component}-hash`,
  getAnimationName: component => `a-${component}-hash`,
});

const optimizedParse = createOptimizedParser({
  getClassName: component => `c-${component}-hash`,
  getMixinClassName: component => `m-${component}-hash`,
  getAnimationName: component => `a-${component}-hash`,
});

const raw = `
Button {
  :not([disabled]):hover {
    background-color: transparent;
  }

  :not(PrimaryButton.active):hover {
    background-color: black;
  }
}

Bar, Foo {
  font-size: 10px;

  @keyframes colorized {
    from { color: red; }
    to { color: #fc3; }
  }

  animation: colorized 10s infinity;

  WarningButton, PrimaryButton, SucceessButton {
    padding: 10px;
    margin: 10px;

    @keyframes example-first {
      0% { color: red; }
      100% { color: red; }
    }

    animation: example-first 10s infinity;

    + Icon {
      padding-right: 15px;

      @media (max-width: 199px) {
        color: purple;
      }
    }

    border: 10px;

    ~ Spinner {
      @media (max-width: 699px) {
        color: yellow;

        @keyframes example-first {
          0% { color: red; }
          40% { color: #fc3; }
          50% { color: red; }
          60% { color: black; width: 100px; }
          100% { color: red; }
        }

        animation: example-first 1s infinity;
      }
    }

    :hover, :active, :focus {
      color: red;

      @media (max-width: 100px) {
        color: green;
      }
    }

    @media (max-width: 1000px) {
      background: green;

      @keyframes example-first {
        0% { color: red; }
        50% { color: yellow; }
        100% { color: red; }
      }

      animation: example-first 1s infinity;
    }
  }
}`;

test('should be same results', () => {
  const parsed = parse(raw);
  const parsedOptimized = optimizedParse(raw);

  expect(parsed).toEqual(parsedOptimized);
  expect(stringifyRules(parsed.precss)).toEqual(
    stringifyRules(parsedOptimized.precss)
  );
});
