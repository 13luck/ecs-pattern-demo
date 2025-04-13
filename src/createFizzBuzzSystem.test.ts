import { expect, test } from 'vitest'
import { createWorld, addEntity, addComponent } from 'bitecs'
import { createFizzBuzzSystem, bumpEvent } from './createFizzBuzzSystem.ts'


test('createFizzBuzzSystem', () => {
    const results: string[] = []
    const renderResult = (result: string) => results.push(result)

    const world = createWorld()
    const fizzBuzzSystem = createFizzBuzzSystem(renderResult)

    const click = () => {
        const bumpEntity = addEntity(world)
        addComponent(world, bumpEvent, bumpEntity)
        fizzBuzzSystem(world)
    }

    Array.from({ length: 15 }).forEach(click)

    /** executes the system without user clicks to demonstrate its core logic and ensure correct calculations */
    fizzBuzzSystem(world)
    fizzBuzzSystem(world)
    fizzBuzzSystem(world)

    expect(results).toEqual([
        "1",
        "2",
        "3 fizz",
        "4",
        "5 buzz",
        "6 fizz",
        "7",
        "8",
        "9 fizz",
        "10 buzz",
        "11",
        "12 fizz",
        "13 lucky! 🍀",
        "14",
        "15 fizz buzz",
    ])
})
