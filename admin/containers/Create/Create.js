import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { plural } from "../../../shared/util";
import {
    ArticleCreate,
    PostPublish,
    PostActions,
    PostActionDrawer
} from "../../components/Post";
import { Link } from "react-router-dom";
import CreatePost from "../../data-connectors/CreatePost";
import FileExplorerModal from "../../components/Modals/FileExplorerModal";

const qs = handle => document.querySelector(handle);

class Create extends Component {
    constructor(props) {
        super(props);
        this.addScrollTimer = this.addScrollTimer.bind(this);
        this.handlePostChanges = this.handlePostChanges.bind(this);
        this.toggleActionDrawer = this.toggleActionDrawer.bind(this);
        this.toggleZenView = this.toggleZenView.bind(this);
        this.state = {
            loading: true,
            post: {},
            fileExplorerProps: {},
            actionDrawerOpen: false
        };
    }

    componentWillMount() {
        const { type } = this.props;
        window.addEventListener("onPostChange", this.handlePostChanges);
        window.addEventListener("onPostSave", this.handlePostSave);

        const title = "Draft - " + moment().format("L LT");
        this.props.createPost({ type, title }).then(result => {
            PostActions.setData(result.data.createPost.post);
            this.setState({
                loading: false,
                post: result.data.createPost.post,
                preview: ""
            });
        });
    }
    componentDidMount() {
        document.body.classList.add("create-" + this.props.type + "-page");
    }
    componentWillUnmount() {
        document.body.classList.remove("create-" + this.props.type + "-page");
        window.removeEventListener("onPostChange", this.handlePostChanges);
        window.removeEventListener("onPostSave", this.handlePostSave);
    }

    handlePostChanges(e) {
        if (PostActions.data.mode == "markdown") {
            this.addScrollTimer();
            if ("mdPreview" in e.detail) {
                this.setState({ preview: e.detail.mdPreview });
            }
        } else if ("body" in e.detail) {
            this.setState({
                preview: "Preview is only available for markdown editor"
            });
        }
    }
    addScrollTimer() {
        setTimeout(() => {
            var $divs = [
                qs(".article-holder .CodeFlask__textarea"),
                qs(".preview .post-content")
            ];
            document.addEventListener(
                "scroll",
                e => {
                    $divs.forEach(div => {
                        if (e.target === div) {
                            this.adjustScroll(e);
                        }
                    });
                },
                true
            );
        }, 1000);
    }
    handlePostSave(e) {
        const post = e.detail;
        if (post.status == "trash") {
            this.props.history.push(`/admin/${plural[post.type]}`);
        } else {
            this.props.history.push(`/admin/${plural[post.type]}/${post.id}`);
        }
    }

    toggleActionDrawer(e) {
        e.preventDefault();
        this.setState({ actionDrawerOpen: !this.state.actionDrawerOpen });
    }

    toggleZenView(e) {
        e.preventDefault();
        document.body.classList.toggle("distract-free");
    }

    render() {
        if (this.state.loading) {
            return <div />;
        }
        return (
            <section className="module-xs create-post">
                <div className="row">
                    <Link
                        to="#"
                        className="toggle-zenview"
                        onClick={this.toggleZenView}
                    >
                        <i className="fa fa-eye" />
                    </Link>
                    <div className="col-lg-12 distractor">
                        <PostPublish
                            create
                            post={this.state.post}
                            toggleActionDrawer={this.toggleActionDrawer}
                        />
                    </div>
                    <div className="col-lg-6 column article-holder">
                        <ArticleCreate post={this.state.post} />
                    </div>
                    <div className="col-lg-6 column preview distractor">
                        {PostActions.data.mode == "markdown" && (
                            <h2>{PostActions.data.title}</h2>
                        )}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: this.state.preview
                            }}
                        />
                    </div>
                </div>
                <PostActionDrawer
                    post={this.state.post}
                    isOpen={this.state.actionDrawerOpen}
                    toggleActionDrawer={this.toggleActionDrawer}
                    toggleFileExplorerModal={this.toggleFileExplorerModal}
                />
                {this.state.fileExplorerProps.display && (
                    <FileExplorerModal {...this.state.fileExplorerProps} />
                )}
            </section>
        );
    }
}

Create.propTypes = {
    history: PropTypes.object,
    createPost: PropTypes.func,
    type: PropTypes.string
};

export default CreatePost(Create);
