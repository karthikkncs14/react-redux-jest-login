import React from 'react';
import { useLocation,useHistory } from 'react-router-dom';
import Header from './Header'
import moment from 'moment';

const PostView = () => {
    const history = useHistory();
    const location = useLocation();
    const { postData } = location.state
    return (
        <div className="main-container">
            <Header>
                <span className="user-name" onClick={history.goBack}>Back</span>
                <span className="item-title">{postData.title}</span>
                <span className="drop-out" onClick={history.goBack}>Close</span>
            </Header>

            <div className={"content"}>
                        <div className="title-block">
                            <p className="title">{postData.title}</p>
                            <p className="date">{moment(postData.updated_at).format("MMMM DD, YYYY")}</p>
                        </div>
                <p className="content-block">{postData.content}</p>
            </div>
        </div>
    );
};

export default PostView;
