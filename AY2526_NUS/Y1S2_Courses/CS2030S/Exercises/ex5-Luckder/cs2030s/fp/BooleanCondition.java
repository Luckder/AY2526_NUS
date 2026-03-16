/**
 * A conditional statement that returns either true of false.
 * CS2030S Exercise 4
 * AY25/26 Semester 2
 *
 * @author David Chan (14G)
 */
package cs2030s.fp;

public interface BooleanCondition<T> {

  public abstract boolean test(T item);
}
