import { useState, useEffect } from "react";

type JobOpening = {
  id: string;
  position: string;
  team: string;
  location: string;
};

export const fetchJobOpenings = async () => {
  const jobOpenings = await (fetch("https://api.github.com/gists/5bb154469b98fa0d39bc8e03fd6f500a")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((gistData) => {
      return JSON.parse(
        gistData.files["slicify-jobs.json"].content
      );
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return [];
    }))

  return jobOpenings;
};