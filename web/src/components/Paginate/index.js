/**
 * Created by liudonghui on 17/1/5.
 */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTopics } from '../../actions/common';
import ReactPaginate from 'react-paginate';
import './index.less';

class Paginate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            pageNum: 20,
            perPage: 20
        }
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.perPage);

        this.setState({offset: offset}, () => {
            let options = this.props.options;
            options.offset = this.state.offset;
            this.props.getTopics(options)
        });
        ReactDOM.findDOMNode(this).parentNode.scrollIntoView()
    }

    render () {
        return (
            <div className='panel-footer'>
                <ReactPaginate previousLabel={"上一页"}
                               nextLabel={"下一页"}
                               breakLabel={<a href="">...</a>}
                               breakClassName={"break-me"}
                               pageNum={this.state.pageNum}
                               marginPagesDisplayed={1}
                               pageRangeDisplayed={3}
                               clickCallback={this.handlePageClick}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"} />
            </div>
        )
    }
}

Paginate.propTypes = {

};

Paginate.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getTopics: bindActionCreators(getTopics, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);