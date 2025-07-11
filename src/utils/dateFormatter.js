export const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "long",
    month: "numeric",
    day: "numeric",
  });
};

// TODO: fix pending
