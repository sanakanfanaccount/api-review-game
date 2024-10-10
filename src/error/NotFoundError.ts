export function notFound(name: string): never {
  const error = new Error(name + "Aie... impossible de trouver ce que vous cherchez");
  (error as any).status = 404;
  throw error;
}
