import React from "react";
import { Taxonomy } from "../../../__generated__/resolvers";
import TaxonomyItem from "./TaxonomyItem";
import styled from "styled-components";

const columns = [
  { label: "Select", className: "select" },
  { label: "Name", className: "name" },
  { label: "Description", className: "description" },
];

interface IProps {
  data: Taxonomy[];
  onUpdate: (item: Taxonomy) => void;
  onSelect: (id: number, checked: boolean) => void;
}
const TaxonomyList: React.FC<IProps> = ({ data, onUpdate, onSelect }) => {
  return (
    <List>
      <header>
        {columns.map((item, i) => (
          <div key={i} className={item.className}>
            {item.label}
          </div>
        ))}
      </header>
      <div className="scroller">
        {data.map(taxonomy => (
          <TaxonomyItem
            key={taxonomy.id}
            onSelect={onSelect}
            taxonomy={taxonomy}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </List>
  );
};

export default TaxonomyList;

const List = styled.div`
  header,
  article {
    display: grid;
    grid-gap: 10px;
    align-items: center;
    grid-template-columns: 50px 150px 1fr;
    font-size: 0.95rem;
    color: var(--color-text-3);
    margin-bottom: 44px;
  }
  .scroller {
    height: calc(100vh - 300px);
    overflow-y: auto;
  }
  header {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #111213 !important;
    font-size: 0.7rem !important;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 16px;
    margin-bottom: 24px;
  }
  .path {
    overflow: hidden;
  }
  @media (max-width: 767px) {
    header {
      display: none;
    }
  }
`;
