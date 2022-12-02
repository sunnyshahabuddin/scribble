import * as yup from "yup";

import { formatToDateAndTime } from "components/Dashboard/utils";

export const FORM_INITIAL_VALUES = {
  title: "",
  category: null,
  body: "",
  status: 0,
};
export const VALIDATION_SCHEMA = categoryList =>
  yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .matches(
        /\w*[aA-zZ0-9]\w*/,
        "Title should have at least one alphabet or number and should start with it"
      )
      .max(255, "Title should not be more than 100 characters"),
    body: yup.string().required("Body is required"),
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().oneOf(categoryList.map(category => category.name)),
        value: yup.string().oneOf(categoryList.map(category => category.id)),
      })
      .required("Category is required"),
  });

export const SUBMIT_ACTIONS_WITH_UNPUBLISH_LATER = [
  { id: 0, value: "Save Draft" },
  { id: 1, value: "Publish" },
  { id: 3, value: "Unpublish later" },
];

export const SUBMIT_ACTIONS_WITH_PUBLISH_LATER = [
  { id: 0, value: "Save Draft" },
  { id: 1, value: "Publish" },
  { id: 2, value: "Publish later" },
];

export const SUBMIT_ACTIONS_WITHOUT_PUBLISH_LATER_OR_UNPUBLISH_LATER = [
  { id: 0, value: "Save Draft" },
  { id: 1, value: "Publish" },
];

export const CREATE_SUBMIT_BUTTON_ACTIONS = [
  { id: 0, value: "Save Draft" },
  { id: 1, value: "Publish" },
];

export const findStatus = status => {
  if (status === "Save Draft") {
    return 0;
  } else if (status === "Publish") {
    return 1;
  } else if (status === "Publish later") {
    return 2;
  } else if (status === "Unpublish later") {
    return 3;
  }

  return 0;
};

export const findButtonActions = articleDetails => {
  if (
    articleDetails.schedule?.publishAt &&
    articleDetails.schedule?.unpublishAt
  ) {
    return SUBMIT_ACTIONS_WITHOUT_PUBLISH_LATER_OR_UNPUBLISH_LATER;
  } else if (articleDetails.schedule?.unpublishAt) {
    return SUBMIT_ACTIONS_WITH_PUBLISH_LATER;
  } else if (articleDetails.schedule?.publishAt) {
    return SUBMIT_ACTIONS_WITH_UNPUBLISH_LATER;
  } else if (articleDetails.status === 0) {
    return SUBMIT_ACTIONS_WITH_PUBLISH_LATER;
  }

  return SUBMIT_ACTIONS_WITH_UNPUBLISH_LATER;
};

export const buildConfirmationMessage = (articleDetails, formValues) =>
  formValues.status === 1 && articleDetails.schedule?.publishAt !== null
    ? `This article is scheduled to be published at "${formatToDateAndTime(
        articleDetails.schedule.publishAt
      )}". Continuing will publish the article now. Are you sure you want to continue?`
    : `This article is scheduled to be unpublished at "${formatToDateAndTime(
        articleDetails.schedule.unpublishAt
      )}". Continuing will unpublish the article now. Are you sure you want to continue?`;
