interface IButtonProps {
  buttonName: "add" | "remove";
  children: string;
  onClickHandler: (
    event: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  id: string;
}

const Button = ({ buttonName, children, onClickHandler, id }: IButtonProps) => {
  const styles = {
    add: "text-xl py-3 px-2 text-white bg-emerald-600 rounded-xl",
    remove: "text-xl py-3 px-2 text-white bg-rose-600 rounded-xl",
  };
  return (
    <button
      className={styles[buttonName]}
      name={buttonName}
      onClick={(e) => onClickHandler(e, id)}
    >
      {children}
    </button>
  );
};

export default Button;
