/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
// import { TErrorSources } from "../interface/error";
import handleZodError from "../error/handleZodError";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import AppError from "../error/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Default error response structure
  let statusCode = 500;
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

  // Handle different error types
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = {
      message: simplifiedError?.message,
      name: "ZodError",
      properties: {
        message: simplifiedError?.errorSources[0]?.message || "",
        type: "validation",
        min: undefined,
      },
      kind: "validation",
      path:
        simplifiedError?.errorSources[0]?.path !== undefined
          ? String(simplifiedError?.errorSources[0]?.path)
          : "",
      value: "",
    };
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = {
      message: simplifiedError?.message,
      name: "ValidationError",
      properties: {
        message: err.message,
        type: err.kind || "validation",
        min: err.properties?.min,
      },
      kind: err.kind || "validation",
      path: err.path || "",
      value: err.value || "",
    };
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = {
      message: simplifiedError?.message,
      name: "CastError",
      properties: {
        message: err.message,
        type: err.kind || "cast",
        min: undefined,
      },
      kind: err.kind || "cast",
      path: err.path || "",
      value: err.value || "",
    };
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = {
      message: simplifiedError?.message,
      name: "DuplicateKeyError",
      properties: {
        message: `Duplicate value for ${Object.keys(err.keyValue)[0]}`,
        type: "duplicate",
        min: undefined,
      },
      kind: "duplicate",
      path: Object.keys(err.keyValue)[0] || "",
      value:
        Object.values(err.keyValue)[0] !== undefined
          ? String(Object.values(err.keyValue)[0])
          : "",
    };
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    error = {
      message: err.message,
      name: "AppError",
      properties: {
        message: err.message,
        type: "application",
        min: undefined,
      },
      kind: "application",
      path: "",
      value: "",
    };
  } else if (err instanceof Error) {
    message = err.message;
    error = {
      message: err.message,
      name: err.name || "Error",
      properties: {
        message: err.message,
        type: "unknown",
        min: undefined,
      },
      kind: "unknown",
      path: "",
      value: "",
    };
  }

  // Final response with the new pattern
  res.status(statusCode).json({
    success: false,
    message,
    error: {
      ...error,
      stack: process.env.NODE_ENV === "development" ? err?.stack : undefined,
    },
  });
};

export default globalErrorHandler;

//pattern
/*
// message;
// success;
// error: {
//   copies: {
//     message;
//     name;
//     properties: {
//       message;
//       type;
//       min;
//     };
//   };
//   kind;
//   path;
//   value;
// }
*/
