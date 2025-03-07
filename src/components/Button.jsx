const STYLES = [""];

const Button = ({ className, onClick, type, path, children }) => {
  // className === "" ? className = ""
  return (
    <button
      className={`btn ${className ? className : ""}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
