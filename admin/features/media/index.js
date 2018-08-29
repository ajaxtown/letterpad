import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import moment from "moment";
import styled from "styled-components";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";

import GetMedia from "../../data-connectors/GetMedia";
import DeleteMedia from "../../data-connectors/DeleteMedia";
import InsertMedia from "../../data-connectors/InsertMedia";
import UpdateMedia from "../../data-connectors/UpdateMedia";
import config from "../../../config";
import { uploadFile } from "../../util";

import StyledSection from "../../components/section";
import StyledGrid from "../../components/grid";
import StyledGridItem from "../../components/grid/GridItem";
import StyledButton from "../../components/button";

import InfoModal from "./InfoModal";

const EditMediaWrapper = styled.div`
    //take care of modal window si
    @media (max-width: 992px) {
        .open .modal-wrapper {
            height: 92vh;
        }
    }
`;

const limit = config.mediaPerPage;

class Media extends Component {
    static propTypes = {
        media: PropTypes.object,
        history: PropTypes.object,
        loading: PropTypes.bool,
        deleteMedia: PropTypes.func,
        insertMedia: PropTypes.func,
        match: PropTypes.object,
        fetchMore: PropTypes.func,
        updateMedia: PropTypes.func,
        InfoModal: PropTypes.func,
        author: PropTypes.object,
        t: PropTypes.func
    };

    static defaultProps = {
        media: {
            rows: []
        }
    };
    state = {
        page: 1,
        confirmDelete: false,
        delete_id: 0,
        deleteMedia: false,
        items: [],
        displayInfo: false,
        selectedItem: {},
        selectedIndex: 0
    };

    uploadInputRef = React.createRef();

    static getDerivedStateFromProps(nextProps, prevState) {
        const newState = {
            items: [...nextProps.media.rows]
        };
        if (
            nextProps.match.params.page &&
            nextProps.match.params.page !== prevState.page
        ) {
            newState.page = parseInt(nextProps.match.params.page);
        }
        return newState;
    }

    componentDidMount() {
        document.body.classList.add("media-page");
    }

    componentWillUnmount() {
        document.body.classList.remove("media-page");
    }

    toggleDeleteModal = (media = {}) => {
        this.setState({
            confirmDelete: !this.state.confirmDelete,
            selectedItem: media
        });
    };

    deleteMediaFinal = () => {
        this.props.deleteMedia({
            id: this.state.selectedItem.id
        });
        this.toggleDeleteModal();
        this.setState({ deleteMedia: true });
    };

    editMedia = (e, media) => {
        e.preventDefault();
        this.toggleMediaInfo(media);
    };

    toggleMediaInfo = selectedItem => {
        var a = 1;
        var b = a + 1;
        console.log(b);
        let selectedIndex = this.state.selectedIndex;
        if (selectedItem) {
            // find the index of this item.
            this.state.items.forEach((item, i) => {
                if (selectedItem.id == item.id) {
                    selectedIndex = i;
                }
            });
        }

        this.setState({
            displayInfo: !this.state.displayInfo,
            selectedItem,
            selectedIndex
        });
    };

    uploadImage = async files => {
        await uploadFile({ files, type: "post_image" });
        // if the user is in page 1, just refetch the items of page 1
        if (this.props.match.params.page == 1) {
            let items = await this.props.fetchMore({
                author_id: this.props.author.id,
                offset: 0,
                limit: config.mediaPerPage
            });
            this.setState({ items: items.data.media.rows });
        } else {
            // else navigate the user to page 1
            this.props.history.push("/admin/media/1");
        }
    };

    selectNextMedia = () => {
        const newState = {};
        if (this.state.selectedIndex === this.state.items.length - 1) {
            newState.selectedIndex = 0;
        } else {
            newState.selectedIndex = this.state.selectedIndex + 1;
        }
        newState.selectedItem = {
            ...this.state.items[newState.selectedIndex]
        };
        this.setState(newState);
    };

    selectPreviousMedia = () => {
        const newState = {};
        if (this.state.selectedIndex === 0) {
            newState.selectedIndex = this.state.items.length - 1;
        } else {
            newState.selectedIndex = this.state.selectedIndex - 1;
        }
        newState.selectedItem = {
            ...this.state.items[newState.selectedIndex]
        };
        this.setState(newState);
    };

    render() {
        const { t } = this.props;
        return (
            <StyledSection
                md
                title={t("media.title")}
                subtitle={t("media.tagline")}
            >
                <div>
                    <StyledButton
                        success
                        onClick={() => {
                            this.uploadInputRef.current.click();
                        }}
                        sm
                    >
                        Add Media
                    </StyledButton>
                    <input
                        ref={this.uploadInputRef}
                        onChange={input => this.uploadImage(input.target.files)}
                        type="file"
                        className="hide"
                        name="uploads[]"
                        multiple="multiple"
                    />
                    <br />
                    <br />
                    <StyledGrid columns="repeat(auto-fit,minmax(200px,1fr))">
                        {this.state.items.map(media => {
                            return (
                                <StyledGridItem
                                    key={media.id}
                                    image={config.baseName + media.url}
                                    title={media.name}
                                    href="#"
                                    line2={moment(
                                        new Date(media.created_at)
                                    ).format("MMM Do YYYY")}
                                    onClick={e => this.editMedia(e, media)}
                                />
                            );
                        })}
                    </StyledGrid>
                    <Paginate
                        count={this.props.media.count}
                        page={this.state.page}
                    />

                    {this.state.confirmDelete && (
                        <ConfirmDeleteModal
                            title="Confirm Delete"
                            text="Are you sure you want to delete this media ?"
                            onYes={this.deleteMediaFinal}
                            onClose={this.toggleDeleteModal}
                            media={this.state.selectedItem}
                            isOpen={this.state.confirmDelete}
                        />
                    )}
                    {this.state.displayInfo && (
                        <EditMediaWrapper>
                            <InfoModal
                                media={this.state.selectedItem}
                                onClose={this.toggleMediaInfo}
                                isOpen={this.state.displayInfo}
                                updateMedia={this.props.updateMedia}
                                next={this.selectNextMedia}
                                previous={this.selectPreviousMedia}
                            />
                        </EditMediaWrapper>
                    )}
                </div>
            </StyledSection>
        );
    }
}

export default translate("translations")(
    GetMedia(DeleteMedia(InsertMedia(UpdateMedia(Media))))
);

const Paginate = ({ count, page }) => {
    count = count || 0;

    if (count <= limit) return <span />;
    const pages = Array.from(Array(Math.ceil(count / limit)));
    return (
        <ul className="pagination">
            {pages.map((_, i) => {
                const num = i + 1;
                return (
                    <li key={num} className={page == num ? "active" : ""}>
                        <Link to={"/admin/media/" + num}>{num}</Link>
                    </li>
                );
            })}
        </ul>
    );
};

Paginate.propTypes = {
    count: PropTypes.number,
    page: PropTypes.number
};
