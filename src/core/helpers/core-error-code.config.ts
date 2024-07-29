import { DynamicMessage } from 'src/common/helpers/errors.config';

export type CoreErrorCodes = 'KEYWORD_NOT_FOUND' | 'CATEGORY_NOT_FOUND';

export default (): { [key in CoreErrorCodes]: string | DynamicMessage } => ({
  KEYWORD_NOT_FOUND: (id) => `Keyword with id #${id} does not exist`,
  CATEGORY_NOT_FOUND: (id) => `Category with id #${id} does not exist`,
});
