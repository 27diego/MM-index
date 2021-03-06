import React, { Component } from "react";
import "./DropZone.scss";

import Overlay from "../../Overlay/Overlay";

interface Props {
  modal: boolean;
  removeModal: () => void;
  departments: string[];
  categories: string[];
}

interface State {
  highlight: boolean;
  disabled: boolean;
  form: Form;
  style: {};
}

interface Form {
  files: any;
  title: string;
  category: string;
  department: string;
}

class DropZone extends Component<Props, State> {
  private myRef: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      highlight: false,
      disabled: false,
      form: {
        files: null,
        title: "",
        category: "",
        department: "",
      },
      style: {
        transform: "",
        transition: "all .5s ease",
        bottom: "0",
        opacity: "0",
      },
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        style: {
          ...this.state.style,
          transform: "translateY(-20rem)",
          opacity: "1",
        },
      });
    }, 500);
  }

  onFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const array = this.fileToListArray(files);
    this.setState({
      disabled: true,
      form: { ...this.state.form, files: array },
    });
  };

  onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = e.dataTransfer.files;
      const array = this.fileToListArray(files);
      this.setState({
        disabled: true,
        form: { ...this.state.form, files: array },
      });
    }
  };

  fileToListArray = (list: any) => {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  };

  uploadFiles = async () => {
    const promises: any = [];
    this.state.form.files.forEach((file: File) => {
      promises.push(this.sendRequest(file));
    });

    try {
      await Promise.all(promises);
    } catch (e) {
      console.log(e);
    }
  };

  sendRequest = (file: File) => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", this.state.form.title.replace(/ /g, "_"));
      formData.append("category", this.state.form.category);
      formData.append("department", this.state.form.department);

      req.open("POST", "http://localhost:3000/file");
      req.send(formData);
    });
  };

  render() {
    return (
      <div
        className={`modal modal--${
          this.props.modal ? "active" : "deactive"
        } documentModal `}
        style={this.state.style}
      >
        <div
          className={`dropzone dropzone--${
            this.state.highlight ? "active" : ""
          }`}
          onDragOver={(e): void => {
            this.setState({ highlight: true });
            e.preventDefault();
          }}
          onDragLeave={(): void => this.setState({ highlight: false })}
          onDrop={this.onFileDrop}
        >
          {this.state.disabled ? (
            <div className="dropzone__file">
              <span>
                {this.state.form.files !== null
                  ? this.state.form.files[0].name
                  : ""}
              </span>
              <svg
                className="dropzone__icon dropzone__icon--file"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M428,224H288a48,48,0,0,1-48-48V36a4,4,0,0,0-4-4H144A64,64,0,0,0,80,96V416a64,64,0,0,0,64,64H368a64,64,0,0,0,64-64V228A4,4,0,0,0,428,224Z" />
                <path d="M419.22,188.59,275.41,44.78A2,2,0,0,0,272,46.19V176a16,16,0,0,0,16,16H417.81A2,2,0,0,0,419.22,188.59Z" />
              </svg>
            </div>
          ) : (
            <React.Fragment>
              <svg
                className="dropzone__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="512"
                height="512"
                viewBox="0 0 512 512"
              >
                <path
                  d="M320,367.79h76c55,0,100-29.21,100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69,0-113.44,45.79-128,91.2-60,5.7-112,43.88-112,106.4s54,106.4,120,106.4h56"
                  style={{
                    fill: "none",
                    stroke: "#fff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px",
                  }}
                />
                <polyline
                  points="320 255.79 256 191.79 192 255.79"
                  style={{
                    fill: "none",
                    stroke: "#fff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px",
                  }}
                />
                <line
                  x1="256"
                  y1="448.21"
                  x2="256"
                  y2="207.79"
                  style={{
                    fill: "none",
                    stroke: "#fff",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "32px",
                  }}
                />
              </svg>
              <input
                type="file"
                ref={this.myRef}
                multiple
                style={{ display: "none" }}
                onChange={this.onFileAdd}
              />
              <div className="dropzone__prompt">
                Drag and drop your file here
              </div>
              <div className="dropzone__or">OR</div>
              <button
                onClick={(): void => this.myRef.current?.click()}
                className="dropzone__btn"
              >
                Browse Files
              </button>
            </React.Fragment>
          )}
        </div>
        <input
          value={this.state.form.title}
          onChange={(e): void =>
            this.setState({
              ...this.state,
              form: {
                ...this.state.form,
                title: e.target.value,
              },
            })
          }
          type="text"
          placeholder="title"
          className="documentModal__title"
        />

        <select
          onChange={(e): void =>
            this.setState({
              ...this.state,
              form: { ...this.state.form, category: e.target.value },
            })
          }
          className="documentModal__category"
        >
          <option value="">categories</option>
          {this.props.categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
          )}
        </select>
        <select
          onChange={(e): void =>
            this.setState({
              ...this.state,
              form: { ...this.state.form, department: e.target.value },
            })
          }
          className="documentModal__department"
        >
          <option value="">department</option>
          {this.props.departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>

        <button
          onClick={(): void => {
            this.uploadFiles();
            this.props.removeModal();
          }}
          className="documentModal__confirm"
        >
          OK
        </button>
        <button
          onClick={this.props.removeModal}
          className="documentModal__cancel"
        >
          Cancel
        </button>

        {this.props.modal ? (
          <Overlay removeModal={this.props.removeModal} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default DropZone;
