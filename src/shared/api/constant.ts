export const PORT_SERVER = 3222;
export const ADDRESS_SERVER = "localhost";

export const getPathAPI = (path: string) => {
  return `http://${ADDRESS_SERVER}:${PORT_SERVER}${path}`;
};
