/**
 * CS2030S Exercise 5
 * AY25/26 Semester 2
 *
 * @author David Chan (14G)
 */
package cs2030s.fp;

import java.util.NoSuchElementException;

public abstract class Maybe<T> {

  private static class None extends Maybe<Object> {

    private None() {} // Constructor for None

    @Override
    public String toString() {
      return "[]";
    }

    @Override
    protected Object get() {
      throw new NoSuchElementException();
    }

    @Override
    public Maybe<Object> filter(BooleanCondition<? super Object> thing) {
      return none;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <U> Maybe<U> map(Transformer<? super Object, ? extends U> thing) {
      return (Maybe<U>) none;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <U> Maybe<U> flatMap(Transformer<? super Object, ? extends Maybe<? extends U>> thing) {
      return (Maybe<U>) none;
    }

    @Override
    public <S extends Object> S orElse(S defaultValue) {
      return defaultValue;
    }

    @Override
    public <S extends Object> S orElseGet(Producer<S> p) {
      return p.produce();
    }

    @Override
    public void ifPresent(Consumer<? super Object> c) {
      return;
    }
  }

  private static final class Some<T> extends Maybe<T> {

    private final T t;

    private Some(T t) {

      this.t = t;
    } // Constructor for Some<T>

    @Override
    public String toString() {
      return String.format("[%s]", this.t);
    }

    @Override
    protected T get() {
      return this.t;
    }

    @Override
    @SuppressWarnings("unchecked")
    public Maybe<T> filter(BooleanCondition<? super T> thing) {
      if (this.t == null) {
        return this;
      } else if (thing.test(this.t)) {
        return this;
      } else {
        return (Maybe<T>) none;
      }
    }

    @Override
    public <U> Maybe<U> map(Transformer<? super T, ? extends U> thing) {
      if (this.t == null) {
        throw new NullPointerException();
        // The linter of submit.sh suggests not throwing NullPointerException
        // yet the task.md did mention to throw the error, I am unsure
      } else {
        U u = thing.transform(this.t);
        return new Some<U>(u);
      }
    }

    @Override
    @SuppressWarnings("unchecked")
    public <U> Maybe<U> flatMap(Transformer<? super T, ? extends Maybe<? extends U>> thing) {
      if (this.t == null) {
        throw new NullPointerException();
        // The linter of submit.sh suggests not throwing NullPointerException
        // yet the task.md did mention to throw the error, I am unsure
      } else {
        Maybe<?> u = thing.transform(this.t);
        return (Maybe<U>) u;
      }
    }

    @Override
    @SuppressWarnings("unchecked")
    public <S extends T> S orElse(S defaultValue) {
      return (S) this.t;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <S extends T> S orElseGet(Producer<S> p) {
      return (S) this.t;
    }

    @Override
    public void ifPresent(Consumer<? super T> c) {
      c.consume(this.t);
      return;
    }
  }

  private static final None none = new None(); // One instance to be returned always

  @SuppressWarnings("unchecked")
  public static <T> Maybe<T> none() {
    return (Maybe<T>) none;
  }

  public static <T> Maybe<T> some(T t) {
    return new Some<>(t);
  }

  @SuppressWarnings("unchecked")
  public static <T> Maybe<T> of(T t) {
    if (t == null) {
      return (Maybe<T>) none();
    } else {
      return some(t);
    }
  }

  @Override
  public boolean equals(Object obj) { // I am unsure if this violates OOP principles
    if (obj instanceof None && this instanceof None) {
      return true;
    } else if (obj instanceof Some<?> && this instanceof Some<?>) {
      Some<?> this2 = (Some<?>) this;
      Some<?> other = (Some<?>) obj;
      if (this2.get() == null) {
        return other.get() == null;
      } else {
        return this2.get().equals(other.get());
      }
    } else {
      return false;
    }
  }

  protected abstract T get();

  public abstract Maybe<T> filter(BooleanCondition<? super T> thing);

  public abstract <U> Maybe<U> map(Transformer<? super T, ? extends U> thing);

  public abstract <U> Maybe<U> flatMap(Transformer<? super T, ? extends Maybe<? extends U>> thing);

  public abstract <S extends T> S orElse(S defaultValue);

  public abstract <S extends T> S orElseGet(Producer<S> p);

  // Wanted to use Producer<? extends T> but then the return type would be T
  // which is not want the task.md stated as return type

  public abstract void ifPresent(Consumer<? super T> c);
}
