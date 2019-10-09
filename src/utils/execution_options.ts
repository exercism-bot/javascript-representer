import yargs from 'yargs'

export class ExecutionOptionsImpl implements ExecutionOptions {
  public debug!: boolean
  public console!: boolean
  public output!: string
  public inputDir!: string
  public outputDir!: string
  public exercise!: string
  public dry!: boolean
  public noTemplates!: boolean
  public pretty!: boolean

  constructor(options: ExecutionOptions) {
    Object.assign(this, options);
  }

  public static create(): ExecutionOptions {
    const args = yargs
      .usage('Usage: $0 <exercise> <input-directory> [<output-directory>] [options]')
      .example('$0 two-fer ~/javascript/two-fer/128/', 'Represent the two-fer solution from the input directory "128"')
      .alias('d', 'debug')
      .alias('c', 'console')
      .alias('o', 'output')
      .alias('p', 'pretty')
      .describe('d', 'Unless given, only outputs warnings and errors')
      .describe('c', 'If given, outputs to the console')
      .describe('o', 'Path relative to the input dir where the analyzis results are stored')
      .describe('noTemplates', 'Unless given, exports templates instead of messages (feature flag)')
      .describe('p', 'If given, formats the JSON output using 2 space indentation')
      .describe('dry', 'If given, does not output anything to disk')
      .boolean(['d', 'c', 'p', 'dry', 'noTemplates'])
      .string('o')
      .default('d', process.env.NODE_ENV === 'development')
      .default('c', process.env.NODE_ENV === 'development')
      .default('noTemplates', false)
      .default('p', false)
      .default('o', './representation.txt')
      .default('dry', false)
      .help('h')
      .alias('h', 'help')
      .argv

    const { d, c, o, dry, p, noTemplates, _ } = args
    return new ExecutionOptionsImpl({
      debug: d,
      console: c,
      output: o,
      pretty: p,
      dry,
      noTemplates,
      exercise: _[0],
      inputDir: _[1],
      outputDir: _[2] || _[1],
    })
  }
}
