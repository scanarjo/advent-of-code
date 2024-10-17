type Node = [id: string, left: string, right: string];

export const countSteps = (path: string, nodes: Node[]): number => {
  let steps = 0;

  let currentNode = nodes.find(([current]) => current === 'AAA')!;

  while (currentNode[0] !== 'ZZZ') {
    const currentStep = path[steps % path.length];
    const nextNode = currentNode[currentStep === 'R' ? 2 : 1];

    currentNode = nodes.find(([id]) => id === nextNode)!;

    steps++;
  }

  return steps;
};

export const parseNodeData = (data: string[]): Node[] => {
  return data.map((line) => {
    const [, current, left, right] = line.match(
      /^(\w+) = \((\w+), (\w+)\)$/,
    )!;

    return [current, left, right];
  });
};
