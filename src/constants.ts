export const ERROR_MESSAGE = {
  TASK_NOT_FOUND: (id: string) => `Task with id: ${id} not found`,
  PASSWORD_IS_WEAK: 'Password is too weak',
  USER_EXISTS: (username: string) =>
    `User with username: ${username} already exists`,
  USER_NOT_FOUND: (username: string) =>
    `User with username: ${username} not found`,
  INVALID_CREDENTIALS: 'Invalid credentials',
  UNAUTHORIZED: 'Unauthorized to perform this action',
};
