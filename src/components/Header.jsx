const Header = () => {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "60px",
        backgroundColor: "#222",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: "600",
        letterSpacing: "1px",
        zIndex: 1000,
      }}
    >
      Draw a Square
    </header>
  );
};

export default Header;
