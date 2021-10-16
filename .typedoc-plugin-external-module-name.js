const packages = [
  'server/models',
  'client/components',
  'client/layouts',
  'client/commons',
  'pages',
];
const regexp = packages.map(package => new RegExp(`${package}/([^/]+)/`));

module.exports = function customMappingFunction(
  explicit,
  implicit,
  path,
  reflection,
  context,
) {
  if (explicit) {
    console.log(explicit);
    return explicit;
  }

  implicit = implicit.replaceAll('\\', '/');

  for (let i = 0; i < packages.length; i++) {
    const package = packages[i];
    const regex = regexp[i];

    if (regex.test(implicit)) {
      const name = implicit.match(regex)[1];
      return `${package}/${name}`;
    }
  }

  return implicit;
};
