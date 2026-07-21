const Spinner = () => {
  return (
    <div
      className="size-20 lg:size-24 absolute left-40 bottom-50 flex
      items-center -z-20 lg:left-195 lg:bottom-80 justify-center"
    >
      <div
        className="size-full rounded-full border-8 border-t-8
        border-zinc-200 border-t-zinc-900 animate-spin"
      ></div>
    </div>
  );
};

export default Spinner;
