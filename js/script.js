
// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Created by: Emre Guzel
// Created on: April 29 2025
// This file contains the JS functions for index.html

"use strict"
// Setting the functoin 
function musuemDiscountAgeCalculator() {
  // Setting the variables
  const age = parseInt(document.getElementById("age").value)
  const day = document.getElementById("day").value
  let message = ""

  // Setting the if statement
  if ((day == "Tuesday" || day == "Thursday") || (age > 12 && age < 21)){
    message = "You're eligible for student pricing";
  } else {
    message = "You must pay the regular pricing"
  }

  document.getElementById("result").innerHTML = message
}
