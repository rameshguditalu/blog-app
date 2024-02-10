import { useEffect } from "react";

const NoDataMessage = ({ message }: { message: string }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-center w-full p-4 rounded-full bg-grey/50 mt-4">
      {message}
    </div>
  );
};

export default NoDataMessage;
