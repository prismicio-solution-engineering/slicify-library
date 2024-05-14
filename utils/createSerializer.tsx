import { ElementType, ReactNode, createElement } from "react";

export function createSerializer(tag: ElementType, className: string) {
  return ({ children }: { children: ReactNode[] }) =>
    createElement(tag, { className }, ...children);
}

export function createSerializerP(className: string) {
  return createSerializer("p", className);
}

export function createSerializerH1(className: string) {
  return createSerializer("h1", className);
}

export function createSerializerH2(className: string) {
  return createSerializer("h2", className);
}
