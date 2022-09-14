import { isReadonly, readonly } from "../reactive";

describe('reactive', () => {
    it('happy path', () => {
        const original = { foo: 1, bar: { baz: 2 } };
        const observed = readonly(original);
        expect(observed).not.toBe(original);
        expect(isReadonly(observed)).toBe(true);
        expect(observed.foo).toBe(1);
    });

    it("wran then call set", () => {
        console.warn = jest.fn();
        const user = readonly({
            age: 10
        });
        user.age = 11;
        expect(console.warn).toBeCalled()
    });
});