import { useEffect, useState } from "react";

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  // useEffect is ran once because of the empty dependency array. But setInterval
  // continues to run
  // But now forwards is now added so it needs to be added as a dependency as best
  // practice. It will now run only when it detects a change in forwards variable.
  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => {
      // clear interval is actually never ran. It's there because it's good practice.
      // It prevents memory leaks
      clearInterval(interval);
    };
  }, [forwards]);

  return counter;
};

export default useCounter;
