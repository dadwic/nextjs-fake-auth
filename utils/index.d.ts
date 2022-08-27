import type { Theme } from "@mui/material";

export const theme: Theme;

export const isServer: boolean;

export function fetcher(url: string): Promise<Response>;

export function a11yProps(index: number): object;
