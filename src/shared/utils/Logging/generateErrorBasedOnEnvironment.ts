export default function generateErrorBasedOnCurrentEnvironment(
  status: number,
  message: string,
  stack,
  currentEnvironment: string,
) {
  let expectedErrorToBeReturned = {};

  if (currentEnvironment != 'production') {
    expectedErrorToBeReturned = {
      statusCode: status,
      message: message,
      stack,
    };
  } else {
    if (status >= 500) {
      message = 'Internal Server Error';
    }

    expectedErrorToBeReturned = {
      statusCode: status,
      message,
    };
  }

  return expectedErrorToBeReturned;
}
