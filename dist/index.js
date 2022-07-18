"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPack = exports.unit = void 0;
/** a test-unit is made from this function */
function unit(name, runner, expect) {
    console.time(name);
    const result = runner();
    console.timeLog(name, "-> result:", result === expect ? "👌 Passed" : "❌ Fail");
    if (result !== expect)
        console.log("& runner output: " + result);
}
exports.unit = unit;
/** multiple test unit runner, tests to run can be filtered from the `testFilter` prop */
function testPack(units, testFilter) {
    units.forEach((_unit) => (testFilter !== undefined && testFilter.indexOf(_unit.name) !== -1) ||
        testFilter === undefined
        ? unit(_unit.name, _unit.runner, _unit.expect)
        : null);
}
exports.testPack = testPack;
