import * as morgan from 'morgan';
import { createWriteStream } from 'node:fs';

const accessLogStream = createWriteStream('./access.log', {
  flags: 'a',
});
export default morgan('combined', { stream: accessLogStream });
