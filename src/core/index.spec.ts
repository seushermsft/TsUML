import { getDsl } from './index';
import { expect } from 'chai';
import 'mocha';

describe('getDSL', () => {

  it('should return the correct yuml DSL', async () => {
    const result = await getDsl("./tsconfig.json", "./src/demo/*.ts");
    const expected = "[Weapon{bg:palegreen}][Weapon||tryHit();],[Named{bg:palegreen}][Named|name;|],[BaseWeapon{bg:skyblue}][BaseWeapon|damage;|],[Katana{bg:skyblue}][Katana|name;|tryHit();],,[BaseWeapon]^-[Katana],[Weapon]^-[Katana],[Named]^-[Katana],[Ninja{bg:skyblue}][Ninja|_weapon;|fight();],";
    expect(result).to.equal(expected);
  });

});