import {
  defaultFetcher,
  Fetcher,
  isResponseOk,
  joinPaths,
  Service,
} from "@fern-typescript/service-utils";
import * as model from "../../model";
import * as endpoints from "./endpoints";

export interface Client {
  getOrderByUid(
    request: endpoints.getOrderByUid.Request
  ): Promise<endpoints.getOrderByUid.Response>;
  getOrders(
    request: endpoints.getOrders.Request
  ): Promise<endpoints.getOrders.Response>;
}

export class Client implements Client {
  private baseUrl: string;
  private fetcher: Fetcher;
  private token: Service.Init["token"];

  constructor(args: Service.Init) {
    this.fetcher = args.fetcher ?? defaultFetcher;
    this.baseUrl = args.serverUrl;
    this.token = args.token;
  }

  public async getOrderByUid(
    request: endpoints.getOrderByUid.Request
  ): Promise<endpoints.getOrderByUid.Response> {
    const encodedResponse = await this.fetcher({
      url: joinPaths(this.baseUrl, `/api/Orders/${request.uid}`),
      method: "GET",
      headers: {},
      token: this.token,
    });

    if (isResponseOk(encodedResponse)) {
      const response = JSON.parse(
        new TextDecoder().decode(encodedResponse.body)
      );
      return {
        ok: true,
        statusCode: encodedResponse.statusCode,
        body: response as model.OrderDto,
      };
    } else {
      const error = JSON.parse(new TextDecoder().decode(encodedResponse.body));
      return {
        ok: false,
        statusCode: encodedResponse.statusCode,
        error: error as endpoints.getOrderByUid.ErrorBody,
      };
    }
  }

  public async getOrders(
    request: endpoints.getOrders.Request
  ): Promise<endpoints.getOrders.Response> {
    const queryParameters = new URLSearchParams();
    if (request.PageIndex != null) {
      queryParameters.append("PageIndex", request.PageIndex.toString());
    }
    if (request.PageSize != null) {
      queryParameters.append("PageSize", request.PageSize.toString());
    }

    const encodedResponse = await this.fetcher({
      url: joinPaths(this.baseUrl, "/api/Orders"),
      method: "GET",
      headers: {},
      token: this.token,
      queryParameters,
    });

    if (isResponseOk(encodedResponse)) {
      const response = JSON.parse(
        new TextDecoder().decode(encodedResponse.body)
      );
      return {
        ok: true,
        statusCode: encodedResponse.statusCode,
        body: response as model.OrderDtoPagedListResultDto,
      };
    } else {
      const error = JSON.parse(new TextDecoder().decode(encodedResponse.body));
      return {
        ok: false,
        statusCode: encodedResponse.statusCode,
        error: error as endpoints.getOrders.ErrorBody,
      };
    }
  }
}
