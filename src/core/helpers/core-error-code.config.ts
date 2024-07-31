import { DynamicMessage } from 'src/common/helpers/errors.config';

export type CoreErrorCodes = 'KEYWORD_NOT_FOUND' | 'CATEGORY_NOT_FOUND' | 'NOTE_NOT_FOUND' | 'FORBIDDEN_EDIT_NOTE';

export default (): { [key in CoreErrorCodes]: string | DynamicMessage } => ({
  KEYWORD_NOT_FOUND: (id) => `Keyword with id #${id} does not exist`,
  CATEGORY_NOT_FOUND: (id) => `Category with id #${id} does not exist`,
  NOTE_NOT_FOUND: (id) => `Note with id #${id} does not exist`,
  FORBIDDEN_EDIT_NOTE: "You haven't rights to edit this note",
});
