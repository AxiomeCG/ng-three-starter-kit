/**
 * Represents an operation that accepts a single input argument and returns no result.
 * @param t the input argument
 */
export type Consumer<T> = (t: T) => void;
