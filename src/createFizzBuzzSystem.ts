import {
    defineSystem,
    enterQuery,
    defineQuery,
    removeEntity,
    defineComponent,
    addEntity,
    addComponent
} from 'bitecs'


export const bumpEvent = defineComponent()

const fizz = defineComponent()
const buzz = defineComponent()
const lucky = defineComponent()
const twenty = defineComponent()
const thirty = defineComponent()

const bumpEntities = defineQuery([bumpEvent])
const userClickEntities = enterQuery(defineQuery([bumpEvent]))
const enterBumpEntities = enterQuery(defineQuery([bumpEvent]))

const fizzEntities = defineQuery([fizz])
const buzzEntities = defineQuery([buzz])
const luckyEntities = defineQuery([lucky])
const twentyEntities = defineQuery([twenty])
const thirtyEntities = defineQuery([thirty])


export function createFizzBuzzSystem(
    renderResult: (result: string) => void
) {
    let count = 0

    return defineSystem(function(world) {
        /** Marker entity, accum system result */
        const signsEntity = addEntity(world)

        let result = ''

        /** increment count while user clicking bump */
        for (const _ of userClickEntities(world)) {
            count += 1
            result = `${count}`
        }

        /** adding criteria: just flat conditions without nesting, easy to extend */
        if (count % 3 === 0) addComponent(world, fizz, signsEntity)
        if (count % 5 === 0) addComponent(world, buzz, signsEntity)
        if (count === 13) addComponent(world, lucky, signsEntity)
        if (count === 20) addComponent(world, twenty, signsEntity)
        if (count === 30) addComponent(world, thirty, signsEntity)

        /** resolving conditions, firing once when match  */
        for (const _ of fizzEntities(world)) result += ' fizz'
        for (const _ of buzzEntities(world)) result += ' buzz'
        for (const _ of luckyEntities(world)) result += ' lucky! 🍀'
        for (const _ of twentyEntities(world)) result += ' twenty 2️⃣0️⃣'
        for (const _ of thirtyEntities(world)) result += ' thirty 3️⃣0️⃣'


        for (const _ of enterBumpEntities(world)) renderResult(result)

        /** cleanup to avoid running the reaction next run again */
        for (const entityId of bumpEntities(world)) removeEntity(world, entityId)

        removeEntity(world, signsEntity)


        return world
    })
}
