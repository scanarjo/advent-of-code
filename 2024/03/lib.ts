type DoInstruction = { type: 'do' };
type MulInstruction = { type: 'mul'; x: number; y: number };
type DontInstruction = { type: 'dont' };

type Instruction = MulInstruction | DoInstruction | DontInstruction;

const makeMul = (x: string, y: string): MulInstruction => ({
  type: 'mul',
  x: parseInt(x, 10),
  y: parseInt(y, 10),
});

export const findMulInstructions = (code: string): MulInstruction[] => {
  return findInstructions(code).filter((instruction) =>
    instruction.type === 'mul'
  );
};

type State = {
  count: number;
  mulEnabled: boolean;
};

export const executeInstructions = (instructions: Instruction[]): State => {
  return instructions.reduce(({ count, mulEnabled }: State, instruction) => {
    if (instruction.type === 'mul' && mulEnabled) {
      return { count: count + instruction.x * instruction.y, mulEnabled };
    } else if (instruction.type === 'do') {
      return { count, mulEnabled: true };
    } else if (instruction.type === 'dont') {
      return { count, mulEnabled: false };
    }

    return { count, mulEnabled };
  }, { count: 0, mulEnabled: true });
};

export const findInstructions = (code: string): Instruction[] => {
  return code
    .matchAll(/(do|don't)\(\)|mul\((\d{1,3}),(\d{1,3})\)/g)
    .toArray()
    .map(([_, ...matches]) => {
      const [isDoOrDont, ...args] = matches;

      if (isDoOrDont) return { type: isDoOrDont === 'do' ? 'do' : 'dont' };

      const [x, y] = args;

      return makeMul(x, y);
    });
};
