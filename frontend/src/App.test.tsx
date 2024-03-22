import React from 'react';
import {toPascalCase} from "./common/commonUtils";

test('toPascalCase works fine', () => {
  const inputString = "привіт_світ привет_мир";
  const expectedOutput = "Привіт світ привет мир";
  const pascalCaseString = toPascalCase(inputString);
  expect(pascalCaseString).toEqual(expectedOutput);
});
