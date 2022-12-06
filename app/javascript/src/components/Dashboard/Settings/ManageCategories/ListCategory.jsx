import React, { useState } from "react";

import { MenuVertical } from "neetoicons";
import { Dropdown } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { Draggable } from "react-beautiful-dnd";

import TooltipWrapper from "components/Common/TooltipWrapper";

import DeleteModal from "./DeleteModal";
import Form from "./Form";

const { Menu, MenuItem, Divider } = Dropdown;
const ListCategory = ({
  category,
  index,
  refetch,
  categoryList,
  activeCategory,
  setActiveCategory,
}) => {
  const [showPane, setShowPane] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Draggable
        draggableId={category.id.toString()}
        index={index}
        key={category.id}
      >
        {provided => (
          <div
            className="flex items-center justify-between"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="flex w-full">
              <div className="ri-drag-move-2-line fa-2x neeto-ui-text-gray-500 mt-4 mr-4" />
              <MenuBar.Item
                active={activeCategory.id === category.id}
                description={`${category.articles.length} ${
                  category.articles.length === 1 ? "article" : "articles"
                }`}
                label={
                  <div className="flex w-64 justify-between pr-8">
                    <div>{category.name}</div>
                    <Dropdown buttonStyle="text" icon={MenuVertical}>
                      <Menu>
                        <MenuItem.Button
                          onClick={() => {
                            setShowPane(true);
                          }}
                        >
                          Edit
                        </MenuItem.Button>
                        <Divider />
                        <TooltipWrapper
                          content="Cannot delete the General category"
                          followCursor="horizontal"
                          position="bottom"
                          disabled={
                            category.name === "General" &&
                            categoryList.length === 1
                          }
                        >
                          <MenuItem.Button
                            style="danger"
                            disabled={
                              category.name === "General" &&
                              categoryList.length === 1
                            }
                            onClick={() => setShowDeleteModal(true)}
                          >
                            Delete
                          </MenuItem.Button>
                        </TooltipWrapper>
                      </Menu>
                    </Dropdown>
                  </div>
                }
                onClick={() => setActiveCategory(category)}
              />
            </div>
          </div>
        )}
      </Draggable>
      {showDeleteModal && (
        <DeleteModal
          category={category}
          categoryList={categoryList}
          refetch={refetch}
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
        />
      )}
      {showPane && (
        <Form
          isEdit
          id={category.id}
          initialValues={{ name: category.name }}
          refetch={refetch}
          setShowPane={setShowPane}
          showPane={showPane}
        />
      )}
    </>
  );
};

export default ListCategory;
