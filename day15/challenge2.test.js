import { expect } from 'chai';
import { calculateGPSSumsWide } from './challenge2.js';

describe('Day 15 Challenge 2', () => {
  it('can solve custom input 1', () => {
    let input =
      '##########\n' +
      '#........#\n' +
      '#...O....#\n' +
      '#....OO..#\n' +
      '#......@.#\n' +
      '##########\n\n' +
      '^<v<<<^';

    expect(calculateGPSSumsWide(input)).to.eq(524);
  });

  it('can solve custom input 2', () => {
    let input =
      '##########\n' +
      '#........#\n' +
      '#..@OOO..#\n' +
      '#........#\n' +
      '#........#\n' +
      '##########\n\n' +
      '>>>>>>>>>>>>';

    expect(calculateGPSSumsWide(input)).to.eq(612);
  });

  it('can solve custom input 3', () => {
    let input =
      '##########\n' +
      '#........#\n' +
      '#.@OO....#\n' +
      '#....O...#\n' +
      '#........#\n' +
      '##########\n\n' +
      '>>^>>>vv';

    expect(calculateGPSSumsWide(input)).to.eq(612);
  });

  it('can solve custom input 3', () => {
    let input =
      '##########\n' +
      '#..@.....#\n' +
      '#..O.....#\n' +
      '#..O.....#\n' +
      '#........#\n' +
      '##########\n\n' +
      'vv';

    expect(calculateGPSSumsWide(input)).to.eq(612);
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

    expect(calculateGPSSumsWide(input)).to.eq(9021);
  });
});
