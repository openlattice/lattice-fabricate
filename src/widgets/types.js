// @flow

declare type WidgetProps = {|
  ampm :boolean;
  autofocus :boolean;
  disabled :boolean;
  format :string;
  formContext :Object;
  id :string;
  mask :string;
  name :string;
  onBlur :(id :string, value :any) => void;
  onChange :(value :any) => void;
  onFocus :(id :string, value :any) => void;
  options :Object;
  placeholder ? :string;
  rawErrors :string[];
  readonly :boolean;
  registry :Object;
  required :boolean;
  schema :Object;
  type :string;
  value :any;
|};

export type {
  // eslint-disable-next-line import/prefer-default-export
  WidgetProps
};
