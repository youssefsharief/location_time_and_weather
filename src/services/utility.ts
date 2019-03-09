export const utility = {
  areDataInCompatible(argv): boolean {
    return argv.l.length !== argv.z.length || typeof argv.l !== typeof argv.z
  },
}
