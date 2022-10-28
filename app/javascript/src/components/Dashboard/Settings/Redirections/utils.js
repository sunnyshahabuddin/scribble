export const checkRedirectionCycle = (redirectionsList, fromValue, value) => {
  const toValues = redirectionsList.map(redirection => redirection.to);
  const fromValues = redirectionsList.map(redirection => redirection.from);
  const doesToExistsInFrom = fromValues.includes(value);
  const doesFromExistsInTo = toValues.includes(fromValue);

  return !doesToExistsInFrom || !doesFromExistsInTo;
};
