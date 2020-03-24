import React, { Component } from "react";
import "./ListPannel.scss";

//Redux imports
import { connect } from "react-redux";
import { getDocuments, selectMenu } from "../../../Redux/actions/index";
import { AppActions } from "../../../types/Actions";
import { AppState } from "../../../Redux/Store/configureStore";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { Document } from "../../../types/Document";
import NewItem from "../../../Portals/newModal/NewItem";
import SOPCard from "./SOPCard/SOPCard";

interface ListPannelProps {
  department: string;
  setDocument: (item: string) => void;
}
interface ListPannelState {
  search: string;
  modal: boolean;
}

type Props = ListPannelProps & LinkStateProps & LinkDispatchProps;

class ListPannel extends Component<Props, ListPannelState> {
  state = {
    search: "",
    modal: false
  };

  componentDidMount() {
    this.props.getDocuments();
    this.props.selectMenu("Document");
  }

  removeModal = () => {
    this.setState({ modal: false });
  };

  render() {
    return (
      <div className="Container--ListPannel ListPannel">
        <div className="ListPannel__header">
          <div>SOP Index</div>
          <div
            onClick={(): void => this.setState({ modal: true })}
            className="logo--container"
          >
            <div className="addButton__logo">&nbsp;</div>
          </div>
        </div>
        <input
          className="ListPannel__search"
          type="text"
          value={this.state.search}
          onChange={(e): void => this.setState({ search: e.target.value })}
          placeholder="search"
        />

        <div className="ListPannel__list">
          {this.props.Documents.map(item => (
            <SOPCard
              key={item.title}
              title={item.title}
              category={item.category}
              department={item.department}
              setDocument={this.props.setDocument}
            />
          ))}
        </div>
        {this.state.modal ? (
          <NewItem removeModal={this.removeModal} modal={this.state.modal} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

interface LinkStateProps {
  Documents: Document[];
}
interface LinkDispatchProps {
  getDocuments: () => void;
  selectMenu: (item: string) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: ListPannelProps
): LinkStateProps => ({
  Documents: state.DocumentReducer
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: ListPannelProps
): LinkDispatchProps => ({
  getDocuments: bindActionCreators(getDocuments, dispatch),
  selectMenu: bindActionCreators(selectMenu, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPannel);
