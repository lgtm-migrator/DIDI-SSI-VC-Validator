import * as schemas from './schemas';

export function getTypes(): string[] {
  let types: string[] = [];
  Object.values(schemas).forEach((category: object) => {
    types = [...types, ...Object.keys(category)];
  });
  return types;
}

export function getCategories(): string[] {
  const categories: string[] = Object.keys(schemas);
  return categories;
}

export function getVersions(category: string, type: string): string[] {
  // @ts-ignore
  if (!schemas[category] || !schemas[category][type]) {
    throw new Error('#vcValidator-getVersions-categoryAndTypeNotFound');
  }

  // @ts-ignore
  const versions: string[] = Object.keys(schemas[category][type]);
  return versions;
}
