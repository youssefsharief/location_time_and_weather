## Instructions

- Clone the repo
- Install ts-node globally
  - `npm i -g ts-node`
- Use it this way `ts-node src\main.ts -l Minnesota -z 55123 -l "San Francisco" -z 94016 -l "New York" -z 10001`

## Notes

In Production, api keys in config.ts should not be hard wired. Instead they should be extracted from environment variables.
