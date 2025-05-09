import React, { useEffect, useRef, useState } from "react";
import { URl } from "./constant";
import RecentSearch from "./components/RecentSearch";
import QuestionAnswer from "./components/QuestionAnswer";

const App = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState("");
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);
  const askQuestion = async () => {
    if (!question && !selectedHistory) {
      return false;
    }
    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = [question, ...history];
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }
    const payloadData = question ? question : selectedHistory;
    const payload = {
      contents: [
        {
          parts: [{ text: payloadData }],
        },
      ],
    };
    setLoader(true);
    let response = await fetch(URl, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    // console.log(dataString);
    setResult([
      ...result,
      { type: "q", text: question ? question : selectedHistory },
      { type: "a", text: dataString },
    ]);
    setQuestion("");
    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);
    setLoader(false);
  };

  const isEnter = (event) => {
    if (event.key == "Enter") {
      askQuestion();
    }
  };
  useEffect(() => {
    askQuestion();
  }, [selectedHistory]);

  const [darkMode, setDarkMode] = useState("dark");

  useEffect(() => {
    if (darkMode == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className={darkMode == "dark" ? "dark" : "light"}>
      <div className="grid grid-cols-5 h-screen text-center">
        <select
          onChange={(e) => setDarkMode(e.target.value)}
          className="fixed dark:bg-zinc-800 bg-red-100 dark:text-white text-zinc-800 bottom-0 p-5"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <RecentSearch
          recentHistory={recentHistory}
          setRecentHistory={setRecentHistory}
          setSelectedHistory={setSelectedHistory}
        />
        <div className="col-span-4 ">
          <h1 className="my-10 text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700">
            Hello User, Ask me Anything
          </h1>
          {loader ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : null}
          <div ref={scrollToAns} className="container h-[75vh] overflow-y-auto">
            <div className="dark:text-zinc-300 text-zinc-800 px-6">
              <ul>
                {result.map((item, index) => (
                  <QuestionAnswer key={index} item={item} index={index} />
                ))}
              </ul>
            </div>
          </div>
          <div className="dark:bg-zinc-800 w-[45%] bg-red-100 dark:text-white text-zinc-800 mx-auto border border-2 border-gray-500 rounded-full p-8 flex">
            <input
              onKeyDown={isEnter}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              type="text"
              placeholder="Ask me anything..."
              className="w-full h-full   outline-none text-xl"
            ></input>
            <button
              onClick={askQuestion}
              className="hover:border hover:border-2 dark:hover:border-yellow-300 hover:border-zinc-800 hover:rounded-full"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
