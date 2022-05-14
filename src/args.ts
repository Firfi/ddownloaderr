import { program } from 'commander';
import { URL } from 'url';
import { Command } from './commands';

export const parseCmdArgs = (): CmdArgs => {
  program
    .option('--meta')
    .argument('<urls...>');
  program.parse();
  const options = program.opts();
  const meta = !!options.meta;
  const urls = program.args.map(s => new URL(s));
  return { command: meta ? "meta" : "download", urls };
}

export interface CmdArgs {
  command: Command,
  urls: URL[],
}