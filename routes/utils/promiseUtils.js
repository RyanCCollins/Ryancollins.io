/* Convert array into promises
 * Which are called sequentially one after another
 */
export function sequence(items, consumer) {
  const results = [];
  const runner = () => {
    const item = items.shift();
    if (item) {
      return consumer(item)
        .then((result) => {
          results.push(result);
        })
        .then(runner);
    }

    return Promise.resolve(results);
  };

  return runner();
}
