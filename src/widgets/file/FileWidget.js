// @flow
import React, { Component } from 'react';
import { shouldRender } from 'react-jsonschema-form/lib/utils';
import FilesInfo from './FilesInfo';
import { extractFileInfo, processFiles } from './utils';

// From RJSF lib until their next release includes 'accept' prop
// https://github.com/mozilla-services/react-jsonschema-form/pull/1246

type FileInfo = {
  name :string,
  size :number,
  type :string
};

type Props = {
  autofocus ? :boolean;
  disabled :boolean;
  id :string;
  multiple :boolean;
  onChange :(value :any) => void;
  options :any;
  readonly :boolean;
  value :any;
}

type State = {
  values :string | string[];
  filesInfo :FileInfo[];
}

class FileWidget extends Component<Props, State> {

  static defaultProps = {
    autofocus: false,
  };

  constructor(props :Props) {
    super(props);
    const { value } = props;
    const values = Array.isArray(value) ? value : [value];
    // eslint-disable-next-line react/no-unused-state
    this.state = { values, filesInfo: extractFileInfo(values) };
  }

  inputRef = React.createRef<HTMLInputElement>();

  shouldComponentUpdate(nextProps :Props, nextState :State) {
    return shouldRender(this, nextProps, nextState);
  }

  onChange = (event :SyntheticInputEvent<HTMLInputElement>) => {
    const { multiple, onChange } = this.props;
    const { files } = event.target;

    processFiles(files).then((filesInfo) => {
      const state = {
        values: filesInfo.map((fileInfo) => fileInfo.dataURL),
        filesInfo,
      };
      this.setState(state, () => {
        if (multiple) {
          onChange(state.values);
        }
        else {
          onChange(state.values[0]);
        }
      });
    });
  };

  render() {
    const {
      multiple,
      id,
      readonly,
      disabled,
      autofocus,
      options
    } = this.props;
    const { filesInfo } = this.state;
    return (
      <div>
        <p>
          <input
              ref={this.inputRef}
              id={id}
              type="file"
              disabled={readonly || disabled}
              onChange={this.onChange}
              defaultValue=""
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={autofocus}
              multiple={multiple}
              accept={options.accept} />
        </p>
        <FilesInfo filesInfo={filesInfo} />
      </div>
    );
  }
}

export default FileWidget;
