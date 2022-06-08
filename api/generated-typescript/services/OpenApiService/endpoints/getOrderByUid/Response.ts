import * as model from "../../../../model";
import { ErrorBody } from "./ErrorBody";

export type Response = SuccessResponse | ErrorResponse;

export interface SuccessResponse {
  ok: true;
  statusCode: number;
  body: model.OrderDto;
}

export interface ErrorResponse {
  ok: false;
  statusCode: number;
  error: ErrorBody;
}
