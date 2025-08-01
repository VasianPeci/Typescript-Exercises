"use strict";
function describeCharacter(character) {
    if (character.kind === "Mage") {
        return `Mage ${character.name} is level ${character.level} with ${character.health} health and casts ${character.spell}.`;
    }
    else if (character.kind === "Warrior") {
        return `Warrior ${character.name} is level ${character.level} with ${character.health} and fights with ${character.weapon}`;
    }
    const noCharacter = character;
    return "never";
}
