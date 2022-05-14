import { parseCmdArgs } from './args';
import { runCommand } from './commands';

const args = parseCmdArgs();

runCommand(args.command, args.urls).then(r => {
  console.log(r);
});