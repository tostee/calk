const Button = ({onClick, children}) => {
    return <button className="bg-pink-500 text-blue-900 p-6 rounded-[100px]" onClick={onClick}>{children ?? 'Button'}</button>;
};

export default Button;

