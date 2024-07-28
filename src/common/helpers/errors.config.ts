import commonErrorCodes, { AuthErrorCodes } from 'src/auth/helpers/auth-error-codes.config';
import userErrorCodes, { UserErrorCodes } from 'src/users/helpers/user-error-codes.config';
import authErrorCodes, { CommonErrorCodes } from './common-error-codes.config';
import keywordErrorCodes, { KeywordErrorCodes } from 'src/core/helpers/keyword-error-code.config';

export type ErrorCode = UserErrorCodes | AuthErrorCodes | CommonErrorCodes | KeywordErrorCodes;
export type DynamicMessage = (...args: any) => string;

export default () => ({
  ...userErrorCodes(),
  ...authErrorCodes(),
  ...commonErrorCodes(),
  ...keywordErrorCodes(),
});
