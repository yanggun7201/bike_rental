// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any) => {
  const errorMessageObject = error?.data?.message;

  if (typeof (errorMessageObject) === "object") {
    const errorMessages = [];

    for (const messageKey in errorMessageObject) {
      errorMessages.push(errorMessageObject[messageKey][0]);
    }
    return errorMessages.join("\n");
  }

  return error?.data?.message || error?.message || error?.statusText || "Unknown Error";
}
