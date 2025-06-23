export const PORT_SERVER = 3222;
export const ADDRESS_SERVER = "89.111.169.232";

export const getPathAPI = (path: string) => {
  return `http://${ADDRESS_SERVER}:${PORT_SERVER}${path}`;
};
