import { useEffect, useState } from "react";

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  // useEffect is ran once because of the empty dependency array. But setInterval
  // continues to run
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
  }, []);

  return counter;
};

export default useCounter;
