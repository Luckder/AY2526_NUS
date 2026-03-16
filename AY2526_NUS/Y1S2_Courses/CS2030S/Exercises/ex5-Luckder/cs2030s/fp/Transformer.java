/**
 * The Transformer interface that can transform a type T
 * to type U.
 * CS2030S Exercise 4
 * AY25/26 Semester 2
 *
 * @author David Chan (14G)
 */
package cs2030s.fp;

public interface Transformer<T, U> {

  public abstract U transform(T item);
}
