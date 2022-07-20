import { autoCp } from "./comparators";

/** test-unit definition, it can be used to create a test pack
 * @important this is the structure of the type definition: []
 */
export type UnitParameters<T extends any> = {
  name: string;
  runner: () => T;
  expect: T;
};

/** a test-unit is made from this function */
export function unit<T>(name: string, runner: () => T, expect: T) {
  console.time(name);
  const result = runner();

  console.timeLog(
    name,
    autoCp(result, expect) ? "\x1b[32m" : "\x1b[31m",
    "→ result:",
    autoCp(result, expect) ? "👌 Passed\x1b[0m" : "❌ Fail"
  );

  if (!autoCp(result, expect)) {
    console.group();
    console.group(`↓ runner output (${name})`);
    console.groupEnd();
    console.group(result);
    console.groupEnd();
    console.group("\x1b[31m↓ was expecting\x1b[0m");
    console.groupEnd();
    console.group(expect);
    console.groupEnd();
    console.groupEnd();
    console.groupEnd();
  }
}

/** multiple test unit runner, tests to run can be filtered from the `testFilter` prop */
export function testPack(units: UnitParameters<any>[], testFilter?: string[]) {
  units.forEach((_unit) =>
    (testFilter !== undefined && testFilter.indexOf(_unit.name) !== -1) ||
    testFilter === undefined
      ? unit(_unit.name, _unit.runner, _unit.expect)
      : null
  );
}
