/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import handleZodError from "../error/handleZodError";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import AppError from "../error/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // console.log(err);
  //setting default values
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  // =========================
  let pathname = errorSources[0].path;
  let valueOfPath = req.body[pathname];
  // console.log(pathname, valueOfPath);
  // =========================

  //ultimate return
  res.status(statusCode).json({
    message,
    success: false,
    error: {
      name: err.name,
      errors: {
        [errorSources[0].path]: {
          message: errorSources[0].message,
          name: err.name,
          properties: {
            message: err.issues[0]?.message,
            type: err.issues[0]?.type,
            min: err.issues[0]?.minimum,
          },
          kind: err.issues[0]?.code,
          path: errorSources[0].path,
          value: valueOfPath,
        },
      },
    },
  });
};

export default globalErrorHandler;

//pattern
/*
success
message
errorSources:[
  path:'',
  message:''
]
stack
*/

// to

// pattern
/*
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
