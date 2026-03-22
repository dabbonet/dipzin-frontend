/**
 * Custom error classes for screen actions
 * This file is separate from the server action file because
 * "use server" files can only export async functions.
 */

export class ScreenNotFoundError extends Error {
  constructor(message: string = "Screen not found") {
    super(message);
    this.name = "ScreenNotFoundError";
  }
}

export class ScreenDataError extends Error {
  constructor(message: string = "Screen data incomplete") {
    super(message);
    this.name = "ScreenDataError";
  }
}