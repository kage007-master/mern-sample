const getWords = (str: string) => {
  return str.split(" ").filter((s: string) => {
    return !!s.length;
  });
};

const calcPrice = (origin: number, count: number) => {
  return origin + (count > 5 ? 25 + (count - 5) * 10 : count * 5);
};

export { calcPrice, getWords };
