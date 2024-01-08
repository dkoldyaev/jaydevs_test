export const stderr = (stringable: unknown) => {
  // console.error(stringable);
  process.stderr.write(String(stringable) + '\n');
};