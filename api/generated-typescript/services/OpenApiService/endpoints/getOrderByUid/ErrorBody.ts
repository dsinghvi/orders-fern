import * as errors from "../../../../errors";

export type ErrorBody = ErrorBody.Unauthorized | ErrorBody.Forbidden;

export declare namespace ErrorBody {
  interface Unauthorized extends errors.Unauthorized {
    _type: "unauthorized";
  }

  interface Forbidden extends errors.Forbidden {
    _type: "forbidden";
  }

  export interface _Visitor<Result> {
    unauthorized: (value: errors.Unauthorized) => Result;
    forbidden: (value: errors.Forbidden) => Result;
    _unknown: () => Result;
  }
}

export const ErrorBody = {
  unauthorized: (value: errors.Unauthorized): ErrorBody.Unauthorized => ({
    ...value,
    _type: "unauthorized",
  }),

  forbidden: (value: errors.Forbidden): ErrorBody.Forbidden => ({
    ...value,
    _type: "forbidden",
  }),

  _visit: <Result>(
    value: ErrorBody,
    visitor: ErrorBody._Visitor<Result>
  ): Result => {
    switch (value._type) {
      case "unauthorized":
        return visitor.unauthorized(value);
      case "forbidden":
        return visitor.forbidden(value);
      default:
        return visitor._unknown();
    }
  },

  _types: (): ErrorBody["_type"][] => ["unauthorized", "forbidden"],
} as const;
