import React from "react";
import Answers from "./Answers";

const QuestionAnswer = ({ item, index }) => {
  return (
    <>
      <div
        key={index + Math.random()}
        className={item.type == "q" ? "flex justify-end" : ""}
      >
        {item.type == "q" ? (
          <li
            key={index + Math.random()}
            className="text-right text-xl p- border border-8 dark:bg-zinc-700 dark:border-zinc-700 bg-red-100 border-red-100 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl  w-fit px-2"
          >
            <Answers
              ans={item.text}
              index={index}
              totalLength={1}
              type={item.type}
            />
          </li>
        ) : (
          item.text.map((ansItem, ansIndex) => (
            <li
              key={ansIndex + Math.random()}
              className="text-left pl-2 text-lg"
            >
              <Answers
                ans={ansItem}
                index={ansIndex}
                totalLength={item.length}
                type={item.type}
              />
            </li>
          ))
        )}
      </div>
    </>
  );
};

export default QuestionAnswer;
