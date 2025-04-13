import { createWorld, addEntity, addComponent } from 'bitecs'
import { createFizzBuzzSystem, bumpEvent } from './createFizzBuzzSystem.ts'


const button = document.querySelector<HTMLButtonElement>('#bump')!
const list = document.querySelector<HTMLUListElement>('#history')!

const renderResult = (result: string) => {
    const item = document.createElement('li')
    item.textContent = result
    list.appendChild(item)
}

const world = createWorld()
const fizzBuzzSystem = createFizzBuzzSystem(renderResult)

const tickUpdate = function() {
    fizzBuzzSystem(world)
    // other systems...
}

const handleClick = () => {
    const bumpEntity = addEntity(world)
    addComponent(world, bumpEvent, bumpEntity)
    tickUpdate()
}


button.addEventListener('click', handleClick)
