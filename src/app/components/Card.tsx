export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        alignItems: "center",
        backgroundSize: "100% 100%",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
