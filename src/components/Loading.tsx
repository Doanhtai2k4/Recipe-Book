const Loading = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2 text-gray-600">{message}</span>
    </div>
  );
};

export default Loading;