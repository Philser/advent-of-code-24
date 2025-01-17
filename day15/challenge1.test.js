import { expect } from 'chai';
import { calculateGPSSums } from './challenge1.js';

describe('Day 15 Challenge 1', () => {
  it('can solve small test input', () => {
    let input =
      '########\n' +
      '#..O.O.#\n' +
      '##@.O..#\n' +
      '#...O..#\n' +
      '#.#.O..#\n' +
      '#...O..#\n' +
      '#......#\n' +
      '########\n' +
      '\n' +
      '<^^>>>vv<v>>v<<';

    expect(calculateGPSSums(input)).to.eq(2028);
  });

  it('can solve larger test input', () => {
    let input =
      '##########\n' +
      '#..O..O.O#\n' +
      '#......O.#\n' +
      '#.OO..O.O#\n' +
      '#..O@..O.#\n' +
      '#O#..O...#\n' +
      '#O..O..O.#\n' +
      '#.OO.O.OO#\n' +
      '#....O...#\n' +
      '##########\n' +
      '\n' +
      '<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^\n' +
      'vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v\n' +
      '><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<\n' +
      '<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^\n' +
      '^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><\n' +
      '^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^\n' +
      '>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^\n' +
      '<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>\n' +
      '^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>\n' +
      'v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^';

    expect(calculateGPSSums(input)).to.eq(10092);
  });
});
