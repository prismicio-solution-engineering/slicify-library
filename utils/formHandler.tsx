import { FormEvent } from "react";

// Handles the submit event on form submit.
export async function handleSubmitNewsletter(event: FormEvent) {
  // Stop the form from submitting and refreshing the page.
  event.preventDefault();

  // Cast the event target to an html form
  const form = event.target as HTMLFormElement;

  // Get data from the form.
  const data = {
    email: form.email.value as string,
  };

  // Send the data to the server in JSON format.
  const JSONdata = JSON.stringify(data);

  // API endpoint where we send form data.
  const endpoint = "/api/form";

  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: "POST",
    // Tell the server we're sending JSON.
    headers: {
      "Content-Type": "application/json",
    },
    // Body of the request is the JSON data we created above.
    body: JSONdata,
  };

  // Send the form data to our forms API on Vercel and get a response.
  const response = await fetch(endpoint, options);

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.
  const result = await response.json();

  if (response.status === 400) {
    alert(`Could not subscribe, please check your email: ${result.data}`);
  } else {
    alert(`You subscribed with this email address: ${result.data}`);
  }
}
