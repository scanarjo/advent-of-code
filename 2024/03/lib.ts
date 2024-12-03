export type Instruction = { instruction: 'mul'; x: number; y: number };

export const findMulInstructions = (code: string): Instruction[] =>
  code.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g).toArray().map(
    ([_, x, y]) => {
      return { instruction: 'mul', x: parseInt(x, 10), y: parseInt(y, 10) };
    },
  );

export const executeInstruction = ({ x, y }: Instruction) => x * y;
