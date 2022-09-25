import "./Spinner.css";

interface SpinnerProps {
  visible?: boolean;
}
export function Spinner({ visible = true }: SpinnerProps) {
  return (
    <>
      {visible && (
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      )}
    </>
  );
}
