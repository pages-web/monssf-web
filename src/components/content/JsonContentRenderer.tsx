"use client";

import React from "react";

interface TableCell {
  type: "tableCell";
  content: Array<{
    type: "text";
    text: string;
    styles?: any;
  }>;
  props: {
    colspan: number;
    rowspan: number;
    backgroundColor: string;
    textColor: string;
    textAlignment: string;
  };
}

interface TableRow {
  cells: TableCell[];
}

interface TableContent {
  type: "tableContent";
  columnWidths: (null | number)[];
  rows: TableRow[];
}

interface ContentBlock {
  id: string;
  type: "table" | "paragraph";
  props?: any;
  content?: TableContent;
  children?: Array<{
    type: "text";
    text: string;
    styles?: any;
  }>;
}

interface JsonContentRendererProps {
  content: string | ContentBlock[];
  className?: string;
}

const JsonContentRenderer: React.FC<JsonContentRendererProps> = ({
  content,
  className = "",
}) => {
  const renderTableCell = (cell: TableCell) => {
    const textContent = cell.content
      .map((item) => (item.type === "text" ? item.text : ""))
      .join("");

    const style: React.CSSProperties = {
      textAlign: cell.props.textAlignment as any,
      backgroundColor:
        cell.props.backgroundColor === "default"
          ? "transparent"
          : cell.props.backgroundColor,
      color:
        cell.props.textColor === "default" ? "inherit" : cell.props.textColor,
      padding: "8px 12px",
      border: "1px solid #ddd",
    };

    return (
      <td
        key={Math.random()}
        colSpan={cell.props.colspan}
        rowSpan={cell.props.rowspan}
        style={style}
      >
        {textContent}
      </td>
    );
  };

  const renderTableRow = (row: TableRow, index: number) => (
    <tr key={index}>
      {row.cells.map((cell, cellIndex) => renderTableCell(cell))}
    </tr>
  );

  const renderTable = (tableContent: TableContent) => (
    <table className="table-style-1">
      <tbody>
        {tableContent.rows.map((row, index) => renderTableRow(row, index))}
      </tbody>
    </table>
  );

  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case "table":
        return (
          <div key={block.id} className="table-wrapper">
            {block.content && renderTable(block.content)}
          </div>
        );
      case "paragraph":
        return (
          <p key={block.id} className="paragraph">
            {block.children
              ?.map((child, index) => (child.type === "text" ? child.text : ""))
              .join("") || ""}
          </p>
        );
      default:
        return null;
    }
  };

  if (typeof content === "string") {
    // Handle legacy HTML content
    const sanitizeHTML = (html: string) => {
      return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/on\w+="[^"]*"/gi, "")
        .replace(/on\w+='[^']*'/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/vbscript:/gi, "")
        .replace(/data:/gi, "");
    };

    const sanitizedContent = sanitizeHTML(content || "");

    return (
      <div
        className={`post-content ${className}`}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    );
  }

  // Handle JSON content
  return (
    <div className={`post-content ${className}`}>
      {content.map(renderContentBlock)}
    </div>
  );
};

export default JsonContentRenderer;
