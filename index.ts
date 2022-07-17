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
    "-> result: ",
    result === expect ? "👌 Passed" : "❌ Fail"
  );
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
