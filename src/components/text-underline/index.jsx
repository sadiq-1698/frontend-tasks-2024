import "./styles.css";

const TextUnderline = () => {
  return (
    <div className="text-underline-grid-gallery">
      <a href="/">
        <span>Animation 1</span>
        <div className="animation__left-to-right" />
      </a>

      <a href="/">
        <span>Animation 2</span>
        <div className="animation__mid-to-sides" />
      </a>

      <a href="/">
        <span>Animation 3</span>
        <div className="animation__drop" />
      </a>

      <a href="/">
        <span>Animation 4</span>
        <div className="animation__gradient" />
      </a>
    </div>
  );
};

export default TextUnderline;
