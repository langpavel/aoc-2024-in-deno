// My input
let a = 35200350;
let b = 0;
let c = 0;
const program = [2, 4, 1, 2, 7, 5, 4, 7, 1, 3, 5, 5, 0, 3, 3, 0];

// Test input
// let a = 729;
// let b = 0;
// let c = 0;
// const program = [0, 1, 5, 4, 3, 0];

const getComboOperand = (operand: number) => {
  switch (operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      return operand;
    case 4:
      return a;
    case 5:
      return b;
    case 6:
      return c;
    default:
      throw new Error("Invalid operand");
  }
};

let ip = 0;
const output: number[] = [];

/**
 * The adv instruction (opcode 0) performs division.
 * The numerator is the value in the A register.
 * The denominator is found by raising 2 to the power of the instruction's combo operand.
 * (So, an operand of 2 would divide A by 4 (2^2); an operand of 5 would divide A by 2^B.)
 * The result of the division operation is truncated to an integer and then written to the A register.
 */
const adv = (n: number) => {
  a >>= getComboOperand(n);
  ip += 2;
};

/**
 * The bxl instruction (opcode 1) calculates the bitwise XOR of register B and the instruction's literal operand,
 * then stores the result in register B.
 */
const bxl = (n: number) => {
  b ^= n;
  ip += 2;
};

/**
 * The bst instruction (opcode 2) calculates the value of its combo operand modulo 8
 * (thereby keeping only its lowest 3 bits), then writes that value to the B register.
 */
const bst = (n: number) => {
  b = getComboOperand(n) & 0b111;
  ip += 2;
};

/**
 * The jnz instruction (opcode 3) does nothing if the A register is 0.
 * However, if the A register is not zero, it jumps by setting the instruction pointer
 * to the value of its literal operand;
 * if this instruction jumps, the instruction pointer is not increased by 2 after this instruction.
 */
const jnz = (n: number) => {
  if (a !== 0) {
    ip = n;
  } else {
    ip += 2;
  }
};

/**
 * The bxc instruction (opcode 4) calculates the bitwise XOR of register B and register C,
 * then stores the result in register B.
 * (For legacy reasons, this instruction reads an operand but ignores it.)
 */
const bxc = (_: number) => {
  b ^= c;
  ip += 2;
};

/**
 * The out instruction (opcode 5) calculates the value of its combo operand modulo 8,
 * then outputs that value.
 * (If a program outputs multiple values, they are separated by commas.)
 */
const out = (n: number) => {
  output.push(getComboOperand(n) & 0b111);
  ip += 2;
};

/**
 * The bdv instruction (opcode 6) works exactly like the adv instruction except
 * that the result is stored in the B register.
 * (The numerator is still read from the A register.)
 */
const bdv = (n: number) => {
  b = a >> getComboOperand(n);
  ip += 2;
};

/**
 * The cdv instruction (opcode 7) works exactly like the adv instruction
 * except that the result is stored in the C register.
 * (The numerator is still read from the A register.)
 */
const cdv = (n: number) => {
  c = a >> getComboOperand(n);
  ip += 2;
};

const instructions = [
  adv,
  bxl,
  bst,
  jnz,
  bxc,
  out,
  bdv,
  cdv,
];

const lastOpcodeIndex = program.length - 2;
while (ip >= 0 && ip <= lastOpcodeIndex) {
  const opcode = program[ip];
  const operand = program[ip + 1];
  const instruction = instructions[opcode];
  instruction(operand);
}

console.log(output.join(","));
