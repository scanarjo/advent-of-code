import { lcm } from '../utils/math.ts';

type Node = [id: string, left: string, right: string];

type NodePredicate = (nodes: Node) => boolean;

const countStepsWithStrategy = (
  isStartNode: NodePredicate,
  isFinishNode: NodePredicate,
) =>
(path: string, nodes: Node[]): number => {
  let steps = 0;

  const nodeMap = new Map<string, Node>(nodes.map((node) => [node[0], node]));

  let currentNodes = nodes.filter(isStartNode);

  const finalSteps: number[] = [1];
  while (currentNodes.length > 0) {
    const currentStep = path[steps % path.length];
    const nextNodes = currentNodes.map(([, left, right]) =>
      currentStep === 'R' ? right : left
    );

    currentNodes = nextNodes.map((node) => nodeMap.get(node)!);
    steps++;

    const finishedNodes = currentNodes.filter(isFinishNode);

    if (finishedNodes.length > 0) {
      finalSteps.push(steps);

      currentNodes = currentNodes.filter((node) => !isFinishNode(node));
    }
  }

  return lcm(...finalSteps);
};

export const countSteps = countStepsWithStrategy(
  ([id]) => id === 'AAA',
  ([id]) => id === 'ZZZ',
);

export const countStepsWithSecondStrategy = countStepsWithStrategy(
  ([id]) => id.endsWith('A'),
  ([id]) => id.endsWith('Z'),
);

export const parseNodeData = (data: string[]): Node[] => {
  return data.map((line) => {
    const [, current, left, right] = line.match(
      /^(\w+) = \((\w+), (\w+)\)$/,
    )!;

    return [current, left, right];
  });
};
