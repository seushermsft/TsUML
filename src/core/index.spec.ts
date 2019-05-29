import { getDsl } from './index';
import { expect } from 'chai';
import 'mocha';
import { YumlEmitter } from './emitters/yumlemitter';
import { PlantUmlEmitter } from './emitters/plantumlemitter';
import { EmitterFactory } from './emitters/emitterfactory';

describe('getDSL', () => {

  it('should return the correct yuml DSL', async () => {
    const result = await getDsl("./tsconfig.json", "./src/demo/*.ts", EmitterFactory.getEmitter("yuml"));
    const expected = "[Weapon{bg:palegreen}][Weapon||tryHit();],[Named{bg:palegreen}][Named|name;|],[BaseWeapon{bg:skyblue}][BaseWeapon|damage;|],[Katana{bg:skyblue}][Katana|name;|tryHit();],[BaseWeapon]^-[Katana],[Weapon]^-[Katana],[Named]^-[Katana],[Ninja{bg:skyblue}][Ninja|_weapon;|fight();]";

    expect(result).to.equal(expected);
  });

  it('should return the correct plantUML DSL', async () => {
    const result = await getDsl("./tsconfig.json", "./src/demo/*.ts", EmitterFactory.getEmitter("plantuml"));

    // This is a very bad way to validate the DSL, expecially with how picky PlantUML is.
    const expected = `interface Weapon

interface Named

class BaseWeapon {
damage;

} 

class Katana {
name;
tryHit();
} 

BaseWeapon <|-- Katana 

Weapon <|-- Katana 

Named <|-- Katana 

class Ninja {
_weapon;
fight();
} 
`;

    expect(result).to.equal(expected);
  });

});