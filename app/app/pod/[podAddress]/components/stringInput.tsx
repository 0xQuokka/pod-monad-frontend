interface IStringInput {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	placeholder: string;
}

const StringInput = ({ value, setValue, placeholder }: IStringInput) => {
	return (
		<div className="flex-1 items-center justify-between flex w-full gap-1 border text-gray border-neutral-border p-4">
			<input
				type={`text`}
				className={`w-full flex-1 outline-none text-left text-white focus:placeholder:opacity-0 bg-neutral-black text-sm uppercase}`}
				value={value}
				spellCheck="false"
				autoComplete="off"
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default StringInput;
