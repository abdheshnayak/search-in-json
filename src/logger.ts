export const newLogger = (debug: boolean = false) => {
  if (debug) {
    return {
      log: console.log,
      time: console.time,
      timeEnd: console.timeEnd,
    };
  }

  return {
    log: () => {},
    time: () => {},
    timeEnd: () => {},
  };
};
