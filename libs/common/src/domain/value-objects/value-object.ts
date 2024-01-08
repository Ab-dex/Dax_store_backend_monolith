interface IValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObjects<T extends IValueObjectProps> {
  protected readonly props?: T;
  constructor(props: T) {

    // prevents accidental write to our entity
    this.props = Object.freeze(props);
  }
}
