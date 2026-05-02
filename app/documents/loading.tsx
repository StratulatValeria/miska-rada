import { Loader } from "@/app/components/UI/Loader/Loader";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        width: "100%",
      }}
    >
      <Loader  />
    </div>
  );
}
