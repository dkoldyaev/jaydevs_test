export const stdout = (stringable: unknown) => {
  // console.log(stringable);
  process.stdout.write(String(stringable) + '\n');
};