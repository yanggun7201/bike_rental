import React from "react";
import { SimpleUL } from "../components/SimpleUL";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any) => {
  const errorMessageObject = error?.data?.message;

  if (typeof (errorMessageObject) === "object") {
    const errorMessages = [];

    for (const messageKey in errorMessageObject) {
      const errorMessageDetails = errorMessageObject[messageKey][0];
      errorMessages.push(<li key={errorMessageDetails}>{errorMessageDetails}</li>);
    }
    return <SimpleUL>{errorMessages}</SimpleUL>;
  }

  return error?.data?.message || error?.message || error?.statusText || "Unknown Error";
}
