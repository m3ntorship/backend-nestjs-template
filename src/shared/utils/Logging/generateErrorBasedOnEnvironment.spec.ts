import generateErrorBasedOnCurrentEnvironment from './generateErrorBasedOnEnvironment';

const expectedErrorInNonProductionEnv = {
  statusCode: 200,
  message: 'Error Message',
  stack: 'stack trace',
};

const expectedErrorInProductionEnv = {
  statusCode: 500,
  message: 'Internal Server Error',
};

describe('test error returned based on the working environment', () => {
  it('check error returned if env not production', () => {
    expect(
      generateErrorBasedOnCurrentEnvironment(
        200,
        'Error Message',
        'stack trace',
        'development',
      ),
    ).toEqual(expectedErrorInNonProductionEnv);
  });

  it('check error returned if env is production and error from server', () => {
    expect(
      generateErrorBasedOnCurrentEnvironment(
        500,
        'Error Message',
        'stack trace',
        'production',
      ),
    ).toEqual(expectedErrorInProductionEnv);
  });

  it('check error returned if env is production and error is not from server', () => {
    expect(
      generateErrorBasedOnCurrentEnvironment(
        400,
        'Error Message',
        'stack trace',
        'production',
      ),
    ).toEqual({
      ...expectedErrorInProductionEnv,
      statusCode: 400,
      message: 'Error Message',
    });
  });
});
