import { DynamicMessage } from 'src/common/helpers/errors.config';

export type KeywordErrorCodes = 'KEYWORD_NOT_FOUND';

export default (): { [key in KeywordErrorCodes]: string | DynamicMessage } => ({
  KEYWORD_NOT_FOUND: (id) => `Keyword with id #${id}`,
});
