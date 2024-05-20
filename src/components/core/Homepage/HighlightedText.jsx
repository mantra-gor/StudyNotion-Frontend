function HighlightedText({ text }) {
  return (
    <span
      style={{
        background:
          "linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {text}{" "}
    </span>
  );
}

export default HighlightedText;
