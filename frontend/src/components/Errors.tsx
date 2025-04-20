import { ValidationError } from "@api";
import { memo } from "react";

function Errors({ error }: { error: ValidationError | string }) {
  return (
    <div className={"flex flex-col text-red-400 dark:text-red-500"}>
      {typeof error == "string" ? (
        <span>{error}</span>
      ) : (
        error.errors.map((err) => <span key={err.msg}>{err.msg}</span>)
      )}
    </div>
  );
}

export default memo(Errors);
