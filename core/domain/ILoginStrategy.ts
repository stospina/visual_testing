/**
 * Interface that defines how to login into the app
 */
interface ILoginStrategy {
  /**
   * Executes the login
   */
  // eslint-disable-next-line
  executeLogin(user: any): void;
}

export { ILoginStrategy };
