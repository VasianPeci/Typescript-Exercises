interface Character {
    kind: "Mage" | "Warrior",
    name: string,
    level: number,
    health: number,
}

interface Mage extends Character {
    kind: "Mage",
    mana: number,
    spell: string,
    castSpell: () => string
}

interface Warrior extends Character {
    kind: "Warrior",
    weapon: string,
    attack: () => string
}

type characterType = Mage | Warrior;

function describeCharacter(character: characterType): string {
    if (character.kind === "Mage") {
        return `Mage ${character.name} is level ${character.level} with ${character.health} health and casts ${character.spell}.`;
    } else if (character.kind === "Warrior") {
        return `Warrior ${character.name} is level ${character.level} with ${character.health} and fights with ${character.weapon}`;
    }
    const noCharacter: never = character;
    return "never";
}