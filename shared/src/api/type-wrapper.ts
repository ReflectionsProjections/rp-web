import { AxiosRequestConfig, AxiosResponse } from "axios";
import { APIRoutes } from "./types";

export type GettablePaths = {
  [Path in keyof APIRoutes]: "GET" extends keyof APIRoutes[Path] ? Path : never;
}[keyof APIRoutes];

type PostablePaths = {
  [Path in keyof APIRoutes]: "POST" extends keyof APIRoutes[Path]
    ? Path
    : never;
}[keyof APIRoutes];

type PuttablePaths = {
  [Path in keyof APIRoutes]: "PUT" extends keyof APIRoutes[Path] ? Path : never;
}[keyof APIRoutes];

type PatchablePaths = {
  [Path in keyof APIRoutes]: "PATCH" extends keyof APIRoutes[Path]
    ? Path
    : never;
}[keyof APIRoutes];

type DeletablePaths = {
  [Path in keyof APIRoutes]: "DELETE" extends keyof APIRoutes[Path]
    ? Path
    : never;
}[keyof APIRoutes];

export type ApiError = Error & { response: { data: { error: string } } };

export interface TypedAxiosInstance {
  get<Path extends GettablePaths>(
    url: Path,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<APIRoutes[Path]["GET"]["response"]>>;

  post<Path extends PostablePaths>(
    url: Path,
    data: APIRoutes[Path]["POST"]["request"],
    config?: AxiosRequestConfig<APIRoutes[Path]["POST"]["request"]>
  ): Promise<AxiosResponse<APIRoutes[Path]["POST"]["response"]>>;

  put<Path extends PuttablePaths>(
    url: Path,
    data: APIRoutes[Path]["PUT"]["request"],
    config?: AxiosRequestConfig<APIRoutes[Path]["PUT"]["request"]>
  ): Promise<AxiosResponse<APIRoutes[Path]["PUT"]["response"]>>;

  patch<Path extends PatchablePaths>(
    url: Path,
    data: APIRoutes[Path]["PATCH"]["request"],
    config?: AxiosRequestConfig<APIRoutes[Path]["PATCH"]["request"]>
  ): Promise<AxiosResponse<APIRoutes[Path]["PATCH"]["response"]>>;

  delete<Path extends DeletablePaths>(
    url: Path,
    config?: AxiosRequestConfig<APIRoutes[Path]["DELETE"]["request"]>
  ): Promise<AxiosResponse<APIRoutes[Path]["DELETE"]["response"]>>;
}
