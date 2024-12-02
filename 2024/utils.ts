export const readLinesFromFileBuffer = (buffer: Uint8Array) => {
  const decoder = new TextDecoder('utf-8');

  const text = decoder.decode(buffer);

  return text.split(/[\r\n]+/).filter((line) => line !== '');
};
