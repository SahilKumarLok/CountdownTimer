#! /usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";

const promptUser = async () => {
  const { userInput } = await inquirer.prompt([
    {
      name: "userInput",
      type: "input",
      message: "Please enter the amount of seconds: ",
      validate: (input) => {
        if (isNaN(input)) {
          return "Please enter a valid number";
        } else if (input > 60) {
          return "Please enter a number less than 60";
        } else {
          return true;
        }
      },
    },
  ]);

  if (isNaN(userInput) || userInput > 60) {
    console.error("Invalid input. Please enter a number between 1 and 60.");
    process.exit(1);
  }

  return parseInt(userInput, 10);
};

const startTime = (val: number) => {
  const endTime = new Date(Date.now() + val * 1000);
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeDiff = differenceInSeconds(endTime, currentTime);
    if (timeDiff <= 0) {
      console.log("Timer has expired");
      clearInterval(intervalId);
      process.exit();
    }
    const minutes = Math.floor(timeDiff / 60);
    const seconds = timeDiff % 60;
    console.log(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
  }, 1000);
};

promptUser().then((input) => startTime(input));