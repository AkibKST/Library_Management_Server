export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};

/**
 * 
 *   let statusCode = 500;
  let message = "Something went wrong!";
  let error = {
    message: "Something went wrong",
    name: "",
    properties: {
      message: "",
      type: "",
      min: undefined as number | undefined,
    },
    kind: "",
    path: "",
    value: "",
  };
 * 
*/
