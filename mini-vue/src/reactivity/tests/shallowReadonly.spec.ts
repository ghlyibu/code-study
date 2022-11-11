import { isReadonly, shallowReadonly } from "../reactive";

describe('shallowReadonly', () => {
    it('should not make no-reatcive properties reactive', () => {
        const props = shallowReadonly({ foo: 1, bar: { baz: 2 } });
        expect(isReadonly(props)).toBe(true)
        expect(isReadonly(props.bar)).toBe(false)
    });

    it("should call console.warn wran when set", () => {
        console.warn = jest.fn();
        const user = shallowReadonly({
            age: 10
        });
        user.age = 11;
        expect(console.warn).toBeCalled()
    });
});