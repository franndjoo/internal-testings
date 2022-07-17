/** a test-unit is made from this function */
export function unit(name, runner, expect) {
    console.time(name);
    const result = runner();
    console.timeLog(name, "-> result: ", result === expect ? "👌 Passed" : "❌ Fail");
}
/** multiple test unit runner, tests to run can be filtered from the `testFilter` prop */
export function testPack(units, testFilter) {
    units.forEach((_unit) => (testFilter !== undefined && testFilter.indexOf(_unit.name) !== -1) ||
        testFilter === undefined
        ? unit(_unit.name, _unit.runner, _unit.expect)
        : null);
}
