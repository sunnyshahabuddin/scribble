import React from "react";

import { Clock } from "neetoicons";
import { Typography, Tag, Avatar, Tooltip, Checkbox } from "neetoui";
import { append, without } from "ramda";
import { Draggable } from "react-beautiful-dnd";

import {
  calculateUpdatedAtFromNow,
  formatDateToDayDateMonthYearTime,
} from "components/Dashboard/utils";

const Article = ({
  article,
  index,
  selectedArticlesIds,
  setSelectedArticlesIds,
}) => {
  const handleSelectArticle = () => {
    const updatedArticleIds = selectedArticlesIds?.includes(article.id)
      ? without([article.id], selectedArticlesIds)
      : append(article.id, selectedArticlesIds);
    setSelectedArticlesIds(updatedArticleIds);
  };

  return (
    <Draggable
      draggableId={article.id.toString()}
      index={index}
      key={article.id}
    >
      {provided => (
        <div
          className="my-4 flex items-center justify-between"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="neeto-ui-shadow-xs border w-full space-y-2 p-4">
            <Checkbox
              checked={selectedArticlesIds?.includes(article.id)}
              className="mt-3"
              id="selectedArticle"
              name="selectedArticle"
              onChange={handleSelectArticle}
            />
            <Typography style="h4">{article.title}</Typography>
            <Typography
              className="neeto-ui-text-gray-600 truncate"
              style="body2"
            >
              {article.body}
            </Typography>
            <hr />
            <div className="flex justify-end">
              <div className="flex items-center justify-between">
                <Clock color="#68737d" size="20" />
                <Tooltip
                  content={formatDateToDayDateMonthYearTime(article.updatedAt)}
                  followCursor="horizontal"
                  position="bottom"
                >
                  <Typography
                    className="neeto-ui-text-gray-600 ml-1 mr-2"
                    style="body3"
                  >
                    {`${
                      article.status === 1 ? "Published " : "Drafted "
                    }${calculateUpdatedAtFromNow(article.updatedAt)}`}
                  </Typography>
                </Tooltip>
                <Avatar
                  user={{
                    name: article.author.name,
                  }}
                />
                <Tag
                  className="neeto-ui-rounded-sm neeto-ui-bg-gray-100 ml-2 box-border h-6 px-2 py-px"
                  label={article.status === 1 ? "Published" : "Draft"}
                  style={article.status === 1 ? "success" : "warning"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Article;
