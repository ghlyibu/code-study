import { sum } from "..";

it("init",()=>{
    expect(true).toBe(true)
})

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});