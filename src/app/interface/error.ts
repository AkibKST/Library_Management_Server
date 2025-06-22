export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};

export interface ErrorProperties {
  message: string;
  type: string;
  [key: string]: any; // For additional constraints like min, max, etc.
}

export interface FieldError {
  message: string;
  name: string;
  properties: ErrorProperties;
  kind: string;
  path: string;
  value: any;
}

export interface ErrorResponse {
  message: string;
  success: boolean;
  error: {
    name: string;
    errors: Record<string, FieldError>; // Dynamic field errors
  };
}

/**
 * {
  message: string;          // General error message
  success: boolean;         // Always false for errors
  error: {
    name: string;           // Error type/class name
    errors: {               // Field-specific errors
      [fieldName: string]: {  // Dynamic key for each field with errors
        message: string;     // Specific error message
        name: string;        // Validator type name
        properties: {        // Validation constraints
          message: string;   // Repeated message
          type: string;      // Validation type
          [key: string]: any; // Additional constraints (min, max, etc.)
        };
        kind: string;        // Similar to type
        path: string;        // Field path
        value: any;          // Invalid value
      }
    }
  }
}
*/
